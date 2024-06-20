import { NextRequest, NextResponse } from "next/server";
import { medplum } from "@/libs/medplumClient";


export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await req.json();
    const projectId = process.env.MEDPLUM_PROJECT_ID;

    const response = await medplum.post(`admin/projects/${projectId}/invite`, {
      resourceType: "Practitioner",
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      sendEmail: false,
    });

    console.log(response);

    const loginParams = {
      authorizeUrl: "https://api.medplum.com/oauth2/authorize",
      clientId: process.env.MEDPLUM_CLIENT_ID!,
      redirectUri: "http://localhost:3000/api/auth/callback",
      responseType: "code",
      scope: "openid profile email",
      state: encodeURIComponent(
        JSON.stringify({ firstName, lastName, email, password })
      ),
    };

    // Initiate sign-in with redirect
    await medplum.signInWithRedirect(loginParams);


  } catch (error) {
    console.error("Error inviting user:", error);
    return NextResponse.json(
      { message: "Error inviting user.", error },
      { status: 500 }
    );
  }
}
