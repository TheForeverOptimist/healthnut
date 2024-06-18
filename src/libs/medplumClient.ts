import { MedplumClient } from "@medplum/core";

export const medplum = new MedplumClient({
    baseUrl: 'https://api.medplum.com/',
    clientId: process.env.MEDPLUM_CLIENT_ID
})