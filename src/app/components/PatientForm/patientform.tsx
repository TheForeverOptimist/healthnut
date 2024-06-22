import React, { useState } from "react";
import "../../Dashboard/dashboard.css";

const PatientForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleCreatePatient = () => {
    console.log("create patient");
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
