import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Cloud, File, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import * as Toast from "@radix-ui/react-toast";
import * as Progress from "@radix-ui/react-progress";
import "./uploaddropzone.css";
import { medplum } from "@/libs/medplumClient";
import { Patient } from "@/libs/types";

interface UploadProps{
  patient: Patient | null,
  onUploadComplete: (attachment: any) => void
}

const UploadDropZone = ({patient, onUploadComplete}: UploadProps) => {

 const onDrop = useCallback(
   async (acceptedFiles: File[]) => {
     if (!patient) {
       console.error("No patient selected");
       return;
     }

     if (acceptedFiles.length > 0) {
       const file = acceptedFiles[0];
       try {
         const binary = await medplum.createBinary(file, file.name, file.type);
         console.log(binary)

         const documentReference = await medplum.createResource({
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
             text: "PDF Document"
           },
           subject: { reference: `Patient/${patient.id}` },
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
           description: "Patient PDF Document"
         });
         



         onUploadComplete(documentReference.content[0].attachment);
       } catch (error) {
         console.error("Error uploading file:", error);
       }
     }
   },
   [patient, onUploadComplete]
 );

 const {getRootProps, getInputProps} = useDropzone({onDrop, maxSize: 4 * 1024 * 1024})


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
