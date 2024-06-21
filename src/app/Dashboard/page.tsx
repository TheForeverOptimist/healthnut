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
        <div className="left-side">
          <label>Enter Patient Name</label>
          <form className="patientForm" onSubmit={handleCreatePatient}>
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
        <div className="right-side">
          
         
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
