import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";
import { medplum } from "@/libs/medplumClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { message: "Authorization code not provided." },
      { status: 400 }
    );
  } else {
    console.log("Auth code is: ", code);
  }

  const tokenUrl = "https://api.medplum.com/oauth2/token";
  const clientId = process.env.MEDPLUM_CLIENT_ID!;
  const clientSecret = process.env.MEDPLUM_CLIENT_SECRET!;
  const redirectUri = "http://localhost:3000/api/auth/callback";

  console.log("Received code:", code);
  console.log("Using client ID:", clientId);
  console.log("Using redirect URI:", redirectUri);

  // Construct the Basic Authorization header
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );
  const authorizationHeader = `Basic ${basicAuth}`;

  console.log(authorizationHeader);

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authorizationHeader,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    const responseText = await tokenResponse.text();
    if (!tokenResponse.ok) {
      console.error("Error during token exchange:", responseText);
      return NextResponse.json(
        { message: "Error during token exchange.", error: responseText },
        { status: tokenResponse.status }
      );
    }

    const tokenData = JSON.parse(responseText);
    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;

    if (!accessToken || !refreshToken) {
      throw new Error("Access token or Refresh Token is missing");
    }

    await medplum.setAccessToken(accessToken);
    const profile = medplum.getProfile();
    const project = medplum.getProject();

    if (!profile || !project) {
      throw new Error("Profile or project is missing");
    }

    await medplum.setActiveLogin({
      accessToken,
      refreshToken,
      profile,
      project,
    });

    const userInfoResponse = await fetch(
      "https://api.medplum.com/oauth2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      const userInfoText = await userInfoResponse.text();
      console.error("Error fetching user info:", userInfoText);
      return NextResponse.json(
        { message: "Error fetching user info.", error: userInfoText },
        { status: userInfoResponse.status }
      );
    }

    const userInfo = await userInfoResponse.json();

    const cookieOptions = {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
    };

    const response = NextResponse.redirect(`/Dashboard`);
    response.cookies.set("medplumAccessToken", accessToken, cookieOptions);
    response.cookies.set("medplumRefreshToken", refreshToken, cookieOptions);
    response.cookies.set(
      "medplumUserInfo",
      JSON.stringify(userInfo),
      cookieOptions
    );

    return response;
  } catch (error) {
    console.error("Error during OAuth callback:", error);
    return NextResponse.json(
      { message: "Error during OAuth callback.", error },
      { status: 500 }
    );
  }
}
