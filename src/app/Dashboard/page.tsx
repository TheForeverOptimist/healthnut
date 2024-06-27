"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header/header";
import { medplum } from "@/libs/medplumClient";
import { parseClientCookies } from "@/libs/cookies";
import "./dashboard.css";
import UploadDropZone from "../components/UploadDropZone/uploaddropzone";
import PatientForm from "../components/PatientForm/patientform";
import ResourceSheet from "../components/ResourceSheet/resourcesheet";
import VoiceRecorder from "../components/VoiceRecorder/voicerecorder";
import { Patient } from "@/libs/types";

const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const cookies = parseClientCookies();
    const accessToken = cookies.medplumAccessToken;

    if (accessToken) {
      console.log(accessToken);
      medplum.setAccessToken(accessToken);
    }
  }, []);

  const handleCreatePatient = (patient: Patient) => {
    setPatients((prevPatients) => [...prevPatients, patient]);
    setSelectedPatient(patient);
  };

  return (
    <>
      <Header />
      <div className="dashboard">
        <PatientForm onCreatePatient={handleCreatePatient} />
        <div className="box pdfLoader">
          <UploadDropZone selectedPatient={selectedPatient} />
        </div>
        <ResourceSheet
          patients={patients}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
        />
        <VoiceRecorder />
      </div>
    </>
  );
};

export default Dashboard;
