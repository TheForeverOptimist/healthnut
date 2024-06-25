import React from "react";
import "../../Dashboard/dashboard.css";
import { Patient } from "@/libs/types";

interface ResourceSheetProps {
  patient: Patient | null;
  pdfFiles: {
    contentType: string;
    url: string;
    title: string;
    creation: string;
  }[];
}

const ResourceSheet : React.FC<ResourceSheetProps> = ({patient, pdfFiles}) => {
  const patientName = patient?.name?.[0]
    ? `${patient.name[0].given[0]} ${patient.name[0].family}`
    : "";

  return (
    <div className="box resourcesSheet">
      <h3>Patient Resources</h3>
      {patientName && <p>Patient Name: {patientName}</p>}
      <div className="resourcesColumns">
        <div className="column">
          <h4>PDFs</h4>
          <ul>
            {pdfFiles.map((file, index) => (
              <li key={index}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">{file.title}</a>
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
            <li>Suggestion 1</li>
            <li>Suggestion 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResourceSheet;
