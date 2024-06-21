import { NextRequest, NextResponse } from "next/server";
import { medplum } from "@/libs/medplumClient";
import { setCookie } from "@/libs/cookies";


export async function POST(req: NextRequest) {
    const res = NextResponse.next()
  try {
    const { email, password } = await req.json();

    const loginResponse = await medplum.startLogin({
      email,
      password,
    });
    console.log('Login Response: ', loginResponse)

    const memberships = loginResponse.memberships;

    if(!memberships || memberships.length === 0){
        throw new Error('No project memberships found.')
    }

    const primaryMembership = memberships[0];

    const serializedCookie = setCookie("medplumMembership", JSON.stringify(primaryMembership), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.headers.set("Set-Cookie", serializedCookie);
    const response = NextResponse.json({ message: "Login successful" });
    
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }
}
