import React, { useState } from "react";

interface FindProps {
  setPage: (page: string) => void;
}

const FindPatient = ({ setPage }: FindProps) : JSX.Element => {
  const [patientId, setPatientId] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (patientId) {
      const response = await fetch(`/api/patient/${patientId}`);
      const data = await response.json();
      console.log(data);
        setPage('dashboard')
      // Handle the response data (e.g., display it on the page)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Patient ID:
        <input
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FindPatient;
