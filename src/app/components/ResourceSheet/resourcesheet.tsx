import React from "react";
import "../../Dashboard/dashboard.css";

interface ResourceSheetProps {
  patientName: string;
}

const ResourceSheet: React.FC<ResourceSheetProps> = ({patientName}) => {
  return (
    <div className="box resourcesSheet">
      <h3>Patient Resources</h3>
      {patientName && <p>Patient Name: {patientName}</p>}
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
  );
};

export default ResourceSheet;
