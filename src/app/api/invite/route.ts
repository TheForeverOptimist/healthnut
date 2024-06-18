import { NextApiRequest, NextApiResponse } from "next";
import { medplum } from "@/libs/medplumClient";

export async function POST(req: NextApiRequest, res: NextApiResponse){


    if(req.method === 'POST'){
        const {firstName, lastName, email} = req.body

        const payload = {
            resourceType: 'Patient',
            name:[{given: [firstName], family: lastName}],
            email,
            sendEmail: false,
        }
            try {
              await medplum.createResource(payload);
              res.status(200).json({ message: "Invitation complete!" });
            } catch (err) {
              console.error("Error inviting user:", err);
              res.status(500).json({ message: "Error inviting user" });
            }
    }else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}