import { NextResponse } from "next/server";
import { medplum } from "@/libs/medplumClient";

export async function POST(req: Request){
  try {
    const { firstName, lastName, email } = await req.json()

    const clientId = process.env.MEDPLUM_CLIENT_ID;
    if(!clientId){
      console.error('Client ID is not defined. Check your environment variables');
      return NextResponse.json({message: 'Client ID is not defined'}, {status: 500})
    }
    const redirectUri = encodeURIComponent(
      "http://localhost:3000/api/auth/callback"
    );
    const state = encodeURIComponent(
      JSON.stringify({ firstName, lastName, email })
    );

    const authUrl = `https://api.medplum.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid profile email&state=${state}`;

    return NextResponse.json({authUrl});
  } catch(error){
    console.error('Error inviting user:', error);
    return NextResponse.json({message: 'Error inviting user.', error}, {status: 500})
  }
}