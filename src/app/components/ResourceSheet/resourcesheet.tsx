import React, { useState, useEffect } from "react";
import "../../Dashboard/dashboard.css";
import { Patient } from "@/libs/types";
import "./resource.css";
import { medplum } from "@/libs/medplumClient";

interface ResourceSheetProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  triggerRefetch: boolean;
  switchToResourceTab: boolean;
}

const ResourceSheet: React.FC<ResourceSheetProps> = ({
  patients,
  selectedPatient,
  setSelectedPatient,
  triggerRefetch,
  switchToResourceTab = false,
}) => {
  const [activeTab, setActiveTab] = useState<"list" | "resource">("list");
  const [resources, setResources] = useState<{
    documentReferences: any[];
    voiceRecordings: any[];
  }>({ documentReferences: [], voiceRecordings: [] });

useEffect(() => {
  if (switchToResourceTab && selectedPatient) {
    setActiveTab("resource");
  } else if (patients.length === 1) {
    setSelectedPatient(patients[0]);
    setActiveTab("resource");
  } else if (patients.length === 0) {
    setSelectedPatient(null);
    setActiveTab("list");
  }
}, [patients, setSelectedPatient, switchToResourceTab, selectedPatient]);

  useEffect(() => {
    const fetchResources = async () => {
      if (selectedPatient) {
        const patientResources = await fetchPatientResources(
          selectedPatient.id!
        );
        setResources(patientResources);
      }
    };

    fetchResources();
  }, [selectedPatient, triggerRefetch]);

const fetchPatientResources = async (patientId: string) => {
  try {
    // Fetch all DocumentReferences for the patient
    const allDocumentReferencesResult = await medplum.search(
      "DocumentReference",
      {
        subject: `Patient/${patientId}`,
      }
    );

    const allDocumentReferences = allDocumentReferencesResult.entry
      ? allDocumentReferencesResult.entry.map((entry: any) => entry.resource)
      : [];

    //@ts-ignore
    const documentReferences = allDocumentReferences.filter((doc) =>
      doc.type?.coding?.some((coding: any) => coding.code === "pdf")
    );
    //@ts-ignore
    const voiceRecordings = allDocumentReferences.filter((doc) =>
      doc.type?.coding?.some((coding: any) => coding.code === "voice-recording")
    );

    return {
      documentReferences,
      voiceRecordings,
    };
  } catch (error) {
    console.error("Error fetching patient resources:", error);
    return { documentReferences: [], voiceRecordings: [] };
  }
};

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
          disabled={!selectedPatient}
        >
          Patient Resources
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "list" && (
          <div
            className={`patient-list ${patients.length === 0 ? "empty" : ""}`}
          >
            {patients.length > 0 ? (
              <ul>
                {patients.map((patient) => (
                  <li
                    key={patient.id}
                    onClick={() => selectPatient(patient)}
                    className={
                      selectedPatient?.id === patient.id ? "active" : ""
                    }
                  >
                    <span className="patient-name">
                      {patient.name[0].given[0]} {patient.name[0].family}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No patients found</p>
            )}
          </div>
        )}
        {activeTab === "resource" && selectedPatient && (
          <div>
            <h3 className="resource_ptname">Patient: {patientName}</h3>
            <div className="resourcesColumns">
              <div className="column pdf-column">
                <h4>PDFs</h4>
                <ul>
                  {resources.documentReferences.map(
                    (file: any, index: number) => (
                      <li key={index}>
                        <a
                          href={file.content[0].attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={
                            file.content[0].attachment.title ||
                            `File ${index + 1}`
                          }
                        >
                          {file.content[0].attachment.title ||
                            `File ${index + 1}`}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="column audio-column">
                <h4>Voice Recordings</h4>
                <ul>
                  {resources.voiceRecordings.map((file: any, index: number) => (
                    <li key={index}>
                      <audio controls>
                        <source
                          src={file.content[0].attachment.url}
                          type="audio/webm"
                        />
                        {file.content[0].attachment.title ||
                          `Recording ${index + 1}`}
                      </audio>
                    </li>
                  ))}
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
