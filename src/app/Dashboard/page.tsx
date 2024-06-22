"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header/header";
import { medplum } from "@/libs/medplumClient";
import { parseClientCookies } from "@/libs/cookies";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import "./dashboard.css";
import UploadDropZone from "../components/UploadDropZone/uploaddropzone";
import PatientForm from "../components/PatientForm/patientform";
import ResourceSheet from "../components/ResourceSheet/resourcesheet";
import VoiceRecorder from "../components/VoiceRecorder/voicerecorder";

const DynamicHeader = dynamic(() => import("../components/Header/header"), {
  ssr: false,
});

const Dashboard = () => {
  // const [name, setName] = useState<string>('')
  //  const searchParams = useSearchParams()


  //  useEffect(() => {
  //   const email = searchParams.get('email')
  //   if(email){
  //     const decodedEmail = decodeURIComponent(email)
  //     fetchName(decodedEmail);
  //   }
  //  }, [searchParams])

  //  async function fetchName(email: string){
  //   try{
  //     const response = await medplum.search('Practitioner', `telecom.value=${email}`)
  //     console.log(response)

  //   }catch(err){
  //     console.error('Error Message: ', err)
  //   }
  //  }

  return (
    <>
      <DynamicHeader />
      <div className="dashboard">
        <PatientForm />
        <div className="box pdfLoader">
          <UploadDropZone />
        </div>
        <ResourceSheet />
        <VoiceRecorder />
      </div>
    </>
  );
};

export default Dashboard;
