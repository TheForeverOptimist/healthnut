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
import { Patient } from "@/libs/types";

const DynamicHeader = dynamic(() => import("../components/Header/header"), {
  ssr: false,
});

const Dashboard = () => {
  const [patientName, setPatientName] = useState("");
  const [patient, setPatient] = useState<Patient | null>(null)

  useEffect(() => {
    const cookies = parseClientCookies();
    const accessToken = cookies.medplumAccessToken;

    if (accessToken) {
      console.log(accessToken);
      medplum.setAccessToken(accessToken);
    }
  }, []);

  const handleCreatePatient = (patient: Patient) => {
    setPatient(patient)
  }

  return (
    <>
      <DynamicHeader />
      <div className="dashboard">
        <PatientForm onCreatePatient={handleCreatePatient} />
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
