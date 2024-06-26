import React, { useState, useEffect } from "react";
import "../../Dashboard/dashboard.css";
import { Patient } from "@/libs/types";
import "./resource.css";
import { medplum } from "@/libs/medplumClient";

interface ResourceSheetProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient) => void;
  resources: {
    documentReferences: any[];
    observations: any[];
  }[];
}

const fetchPatientResources = async (patientId: string) => {
  const documentReferences = await medplum.search("DocumentReference", {
    subject: `Patient/${patientId}`,
  });
  const observations = await medplum.search("Observation", {
    subject: `Patient/${patientId}`,
  });

  return {
    documentReferences: [],
    observations: [],
  };
};

const ResourceSheet: React.FC<ResourceSheetProps> = ({
  patients,
  selectedPatient,
  setSelectedPatient,
  resources,
}) => {
  const [activeTab, setActiveTab] = useState("list");

  const selectPatient = (patient: Patient) => {
    setActiveTab("resource");
    fetchPatientResources(patient.id!);
    setSelectedPatient(patient);
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
                  <span className="patient-name">
                    {patient.name[0].given[0]} {patient.name[0].family}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === "resource" && selectedPatient && (
          <div>
            <h3>Patient: {patientName}</h3>
            <div className="resourcesColumns">
              <div className="column">
                <h4>PDFs</h4>
                <ul>
                  {resources[0].documentReferences.map(
                    (file: any, index: number) => (
                      <li key={index}>
                        <a
                          href={file.content[0].attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.content[0].attachment.title}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="column">
                <h4>Voice Notes</h4>
                <ul>
                  {resources[0].observations.map((note: any, index: number) => (
                    <li key={index}>
                      <a
                        href={note.valueAttachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {note.valueAttachment.title}
                      </a>
                      <p>
                        Recorded on: {new Date(note.issued).toLocaleString()}
                      </p>
                    </li>
                  ))}
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
