import { NextResponse } from "next/server";
import { medplum } from "@/libs/medplumClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const redirectUri = "http://localhost:3000/api/auth/callback";
  const clientId = process.env.MEDPLUM_CLIENT_ID;
  const clientSecret = process.env.MEDPLUM_CLIENT_SECRET;

  const tokenUrl = "https://api.medplum.com/oauth2/token";

  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code!,
        redirect_uri: redirectUri,
        client_id: clientId!,
        client_secret: clientSecret!,
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = await tokenData.access_token;

    // Extract user data from state
    const { firstName, lastName, email } = JSON.parse(
      decodeURIComponent(state!)
    );

    const payload = {
      resourceType: "Patient",
      name: [{ given: [firstName], family: lastName }],
      email,
      sendEmail: false,
    };

    const response = await medplum.createResource(payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json({ message: "Invitation sent!", response });
  } catch (error) {
    console.error("Error inviting user:", error);
    return NextResponse.json(
      { message: "Error inviting user.", error },
      { status: 500 }
    );
  }
}
