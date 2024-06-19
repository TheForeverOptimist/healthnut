'use client'

import React, {useState} from 'react'

interface DashboardProps {
    patientData: any;
}

const Dashboard: React.FC<DashboardProps> = ({patientData}) => {
      const [doctorNotes, setDoctorNotes] = useState("");
      const [aiSuggestions, setAiSuggestions] = useState("");

      const handleNotesSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const aiResponse = await fetch("/api/ai-suggestions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patientData, notes: doctorNotes }),
        });
        const aiData = await aiResponse.json();
        setAiSuggestions(aiData.suggestions);
      };
    
    return (
      <div className="dashboard">
        <div className="left-panel">
          <div className="patient-profile">
            <h2>Patient Profile</h2>
            <p>
              Name: {patientData.name[0].given[0]} {patientData.name[0].family}
            </p>
            <p>Gender: {patientData.gender}</p>
            <p>Birth Date: {patientData.birthDate}</p>
            {/* Add more patient info as needed */}
            <div className="diagnostic-reports">
              <h3>Diagnostic Reports</h3>
              {/* Display diagnostic reports if available */}
            </div>
            <div className="notes-section">
              <h3>Doctor&aposs Notes</h3>
              <p>{doctorNotes}</p>
              <h3>AI Suggestions</h3>
              <p>{aiSuggestions}</p>
            </div>
          </div>
        </div>
        <div className="right-panel">
          <form onSubmit={handleNotesSubmit}>
            <label>
              Doctor&aposs Notes:
              <textarea
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                required
              />
            </label>
            <button type="submit">Submit Notes</button>
          </form>
        </div>
      </div>
    );
}

export default Dashboard