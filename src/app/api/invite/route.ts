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

    // the below commented out string continues to return a Client Not Found error, have tried everything, will ask Rahul
    // for now will just redirect to dashboard

    // const authUrl = new URL("https://api.medplum.com/oauth2/authorize");
    // authUrl.searchParams.append("response_type", "code");
    // authUrl.searchParams.append("client_id", process.env.MEDPLUM_CLIENT_ID!);
    // authUrl.searchParams.append(
    //   "redirect_uri",
    //   "http://localhost:3000/api/auth/callback"
    // );
    // authUrl.searchParams.append(
    //   "state",
    //   encodeURIComponent(
    //     JSON.stringify({ firstName, lastName, email, password })
    //   )
    // );
    // authUrl.searchParams.append("scope", "openid profile email");

    // console.log(authUrl.toString());
    
    // return NextResponse.redirect(authUrl.toString());


    return NextResponse.json({message: "Practitioner created!"})
  } catch (error) {
    console.error("Error inviting user:", error);
    return NextResponse.json(
      { message: "Error inviting user.", error },
      { status: 500 }
    );
  }
}
