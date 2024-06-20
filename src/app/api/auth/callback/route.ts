import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { message: "Authorization code not provided." },
      { status: 400 }
    );
  }

  const tokenUrl = "https://api.medplum.com/oauth2/token";
  const clientId = process.env.MEDPLUM_CLIENT_ID!;
  const clientSecret = process.env.MEDPLUM_CLIENT_SECRET!;
  const redirectUri = "http://localhost:3000/api/auth/callback";

  // Construct the Basic Authorization header
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );
  const authorizationHeader = `Basic${basicAuth}`;

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: authorizationHeader,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    // Log the raw response text for debugging
    const responseText = await tokenResponse.text();
    console.log("Token Exchange Response:", responseText);

    if (!tokenResponse.ok) {
      // Log the response text for debugging
      console.error("Error during token exchange:", responseText);
      return NextResponse.json(
        { message: "Error during token exchange.", error: responseText },
        { status: tokenResponse.status }
      );
    }

    const tokenData = JSON.parse(responseText);
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    // Redirect to the dashboard or send a response to the frontend to set the page to 'dashboard'
    return NextResponse.json({ message: "Practitioner created!" });
  } catch (error) {
    console.error("Error during OAuth callback:", error);
    return NextResponse.json(
      { message: "Error during OAuth callback.", error },
      { status: 500 }
    );
  }
}