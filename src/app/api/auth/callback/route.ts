import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";
import { medplum } from "@/libs/medplumClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  // const code = searchParams.get("code");

  // if (!code) {
  //   return NextResponse.json(
  //     { message: "Authorization code not provided." },
  //     { status: 400 }
  //   );
  // } else {
  //   console.log("Auth code is: ", code);
  // }

  const tokenUrl = "https://api.medplum.com/oauth2/token";
  const clientId = process.env.MEDPLUM_CLIENT_ID;
  const clientSecret = process.env.MEDPLUM_CLIENT_SECRET;
  const redirectUri = "http://localhost:3000/api/auth/callback";

  // console.log("Received code:", code);
  console.log("Using client ID:", clientId);
  console.log("Using client Secret:", clientSecret);
  // console.log("Using redirect URI:", redirectUri);

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { message: "Client ID or Secret not provided." },
      { status: 500 }
    );
  }

  // Construct the Basic Authorization header
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );
  const authorizationHeader = `Basic ${basicAuth}`;

  console.log(authorizationHeader);

  const formData = new URLSearchParams();
  formData.append("grant_type", "client_credentials");
  formData.append("scope", "openid");

  console.log("Form Data:", formData.toString());

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authorizationHeader,
      },
      body: formData,
    });

    const responseText = await tokenResponse.text();
    console.log(responseText);
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

    if (!accessToken) {
      throw new Error("Access token or Refresh Token is missing");
    }

    await medplum.setAccessToken(accessToken);

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
    console.log("User Info before cookie set: ", userInfo);

    const cookieOptions = {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
    };

    const response = NextResponse.redirect(
      `${process.env.DEV_BASE_URL}/Dashboard`
    );
    response.cookies.set("medplumAccessToken", accessToken, cookieOptions);
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
