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
  const [userName, setUserName] = useState('');
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
      const cookies = parseClientCookies();
      const userInfo = cookies.medplumuserInfo ? JSON.parse(decodeURIComponent(cookies.medplumUserInfo)): null;
      setUserName(`${userInfo.name}`)
    
  }, [userName])

  const namePatient = (firstName: string, lastName: string) => {
    setPatientName(`${firstName} ${lastName}`)
  }


  return (
    <>
      <DynamicHeader />
      <h2 style={{marginLeft: '20px'}}>Welcome, Dr. {userName}</h2>
      <div className="dashboard">
        <PatientForm onCreatePatient={namePatient} />
        <div className="box pdfLoader">
          <UploadDropZone />
        </div>
        <ResourceSheet patientName={patientName} />
        <VoiceRecorder />
      </div>
    </>
  );
};

export default Dashboard;
