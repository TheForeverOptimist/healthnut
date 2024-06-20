import { NextResponse } from "next/server";
import { MedplumClient } from "@medplum/core";

export const medplum = new MedplumClient({
  baseUrl: "https://api.medplum.com/",
  clientId: process.env.MEDPLUM_CLIENT_ID,
  clientSecret: process.env.MEDPLUM_CLIENT_SECRET,
});

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
    const accessToken = tokenData.access_token;

    if(!accessToken){
      throw new Error("Access token is missing")
    }

    // Extract user data from state
    const { firstName, lastName, email } = JSON.parse(
      decodeURIComponent(state!)
    );

    const payload = {
      resourceType: "Practitioner",
      name: [{ given: [firstName], family: lastName }],
      email,
      sendEmail: false,
    };

    const response = await medplum.createResource(payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });


    return NextResponse.json({message: "Practitioner created!"})
  } catch (error) {
    console.error("Error inviting user:", error);
    return NextResponse.json(
      { message: "Error inviting user.", error },
      { status: 500 }
    );
  }
}
