import React, { useState, useEffect } from "react";
import "../../Dashboard/dashboard.css";
import { Patient } from "@/libs/types";
import "./resource.css";

interface ResourceSheetProps {
  patients: Patient[];
  pdfFiles: {
    contentType: string;
    url: string;
    title: string;
    creation: string;
  }[];
}

const ResourceSheet: React.FC<ResourceSheetProps> = ({
  patients,
  pdfFiles,
}) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState("list");

  useEffect(() => {
    if (patients.length > 0 && !selectedPatient) {
      setSelectedPatient(patients[0]);
    }
  }, [patients, selectedPatient]);

  const selectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setActiveTab("resource");
  };

  const patientName = selectedPatient?.name?.[0]
    ? `${selectedPatient.name[0].given[0]} ${selectedPatient.name[0].family}`
    : "";

  return (
    <div className="box resourcesSheet">
      <div className="tabs">
        <button
          onClick={() => setActiveTab("list")}
          className={activeTab === "list" ? "active" : ""}
        >
          Patient List
        </button>
        <button
          onClick={() => setActiveTab("resource")}
          className={activeTab === "resource" ? "active" : ""}
        >
          Patient Resources
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "list" && (
          <div className="patient-list">
            <ul>
              {patients.map((patient, index) => (
                <li key={index} onClick={() => selectPatient(patient)}>
                  {patient.name[0].given[0]} {patient.name[0].family}
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === "resource" && selectedPatient && (
          <div>
            <h3>
              Patient: {selectedPatient.name[0].given}{" "}
              {selectedPatient.name[0].family}
            </h3>
            <div className="resourcesColumns">
              <div className="column">
                <h4>PDFs</h4>
                <ul>
                  {pdfFiles.map((file, index) => (
                    <li key={index}>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.title}
                      </a>
                    </li>
                  ))}
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
                  <li>Coming Soon!</li>
                  <li>Coming Soon!</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceSheet;
