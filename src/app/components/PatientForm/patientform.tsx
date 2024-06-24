import React, { useState } from "react";
import "../../Dashboard/dashboard.css";
import { medplum } from "@/libs/medplumClient";
import { parseClientCookies } from "@/libs/cookies";

interface PatientFormProps {
  onCreatePatient: (firstName: string, lastName: string) => void;
}

const PatientForm = ({ onCreatePatient }: PatientFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const patientResource = {
        resourceType: "Patient",
        name: [
          {
            given: [firstName],
            family: lastName,
          },
        ],
      };

      await medplum.createResource(patientResource);
      onCreatePatient(firstName, lastName);
    } catch (err) {
      console.error("Error creating patient: ", err);
    }
  };

  return (
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
  );
};

export default PatientForm;
