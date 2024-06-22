"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header/header";
import { medplum } from "@/libs/medplumClient";
import { parseClientCookies } from "@/libs/cookies";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import "./dashboard.css";

const DynamicHeader = dynamic(() => import("../components/Header/header"), {
  ssr: false,
});

const Dashboard = () => {
  // const [name, setName] = useState<string>('')
  //  const searchParams = useSearchParams()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleCreatePatient = () => {
    console.log("create patient");
  };

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
    <main suppressHydrationWarning>
      <DynamicHeader />
      <div className="dashboard">
        <div className="box patientForm">
          <form onSubmit={handleCreatePatient}>
            <label htmlFor="patientForm" className="patientLabel">
              Enter Patient Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <button type="submit">Create Patient</button>
          </form>
        </div>
        <div className="box pdfLoader"></div>
          <div className="box resourcesSheet">
      <h3>Patient Resources</h3>
      <p>John Doe</p>
      <div className="resourcesColumns">
        <div className="column">
          <h4>PDFs</h4>
          <ul>
            <li>PDF 1</li>
            <li>PDF 2</li>
          </ul>
        </div>
        <div className="column">
          <h4>Voice Notes</h4>
          <ul>
            <li>Voice Note 1</li>
            <li>Voice Note 2</li>
           
          </ul>
        </div>
        <div className="column">
          <h4>AI Suggestions</h4>
          <ul>
            <li>Suggestion 1</li>
            <li>Suggestion 2</li>
            
          </ul>
        </div>
      </div>
    </div>
        <div className="box voiceRecorder"></div>
      </div>
    </main>
  );
};

export default Dashboard;
