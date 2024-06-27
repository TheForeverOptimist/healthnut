import React, { useCallback } from "react";
import { Cloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import * as Toast from "@radix-ui/react-toast";
import "./uploaddropzone.css";
import { medplum } from "@/libs/medplumClient";
import { Patient } from "@/libs/types";

interface UploadProps {
  selectedPatient: Patient | null;
  onUploadSuccess: () => void
}

const UploadDropZone = ({ selectedPatient, onUploadSuccess }: UploadProps) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!selectedPatient) {
        console.error("No patient selected");
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        try {
          const binary = await medplum.createBinary(file, file.name, file.type);
          console.log(binary);

          await medplum.createResource({
            resourceType: "DocumentReference",
            status: "current",
            type: {
              coding: [
                {
                  system: "http://loinc.org",
                  code: "34108-1",
                  display: "Outpatient Note",
                },
              ],
              text: "PDF Document",
            },
            subject: { reference: `Patient/${selectedPatient.id}` },
            content: [
              {
                attachment: {
                  contentType: file.type,
                  url: `Binary/${binary.id}`,
                  title: file.name,
                  creation: new Date().toISOString(),
                },
              },
            ],
            description: "Patient PDF Document",
          });

          console.log("File uploaded successfully");
          onUploadSuccess()
        } catch (error) {
          console.error("Error uploading file:", error);
          // You can add a toast notification here to inform the user of the error
        }
      }
    },
    [selectedPatient, onUploadSuccess]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 4 * 1024 * 1024,
  });

  return (
    <Toast.Provider swipeDirection="right">
      <div className="dropzone-container" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="dropzone-inner">
          <div className="dropzone-content">
            <Cloud className="dropzone-icon" />
            <p className="dropzone-text">
              <span className="dz-text-bold">Click to upload</span> or drag and
              drop patient related PDFs
            </p>
            <p className="dz-subtext">(Up to 4MB)</p>
          </div>
        </div>
      </div>
    </Toast.Provider>
  );
};

export default UploadDropZone;
