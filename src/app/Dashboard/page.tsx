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


const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [pdfFiles, setPdfFiles] = useState<any[]>([]);

  useEffect(() => {
    const cookies = parseClientCookies();
    const accessToken = cookies.medplumAccessToken;

    if (accessToken) {
      console.log(accessToken);
      medplum.setAccessToken(accessToken);
    }
  }, []);

  const assignNewPatient = (patient: Patient) => {
    setSelectedPatient(patient)
  }

  const handleUploadComplete = (attachment: any) => {
    setPdfFiles([...pdfFiles, attachment])
  }

  return (
    <>
      <Header />
      <div className="dashboard">
        <PatientForm onCreatePatient={assignNewPatient} />
        <div className="box pdfLoader">
          <UploadDropZone patients={patients} selectedPatient={selectedPatient} onUploadComplete={handleUploadComplete} />
        </div>
        <ResourceSheet patients={patients} pdfFiles={pdfFiles} />
        <VoiceRecorder />
      </div>
    </>
  );
};

export default Dashboard;
