import { NextRequest, NextResponse } from "next/server";
import { MedplumClient } from "@medplum/core";

export const medplum = new MedplumClient({
  baseUrl: "https://api.medplum.com/",
  clientId: process.env.MEDPLUM_CLIENT_ID!,
  clientSecret: process.env.MEDPLUM_CLIENT_SECRET!,
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const patient = await medplum.readResource("Patient", id);

    return NextResponse.json({ patient });
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return NextResponse.json(
      { message: "Error fetching patient data.", error },
      { status: 500 }
    );
  }
}
