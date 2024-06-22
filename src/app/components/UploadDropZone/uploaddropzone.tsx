import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Cloud, File, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import * as Toast from "@radix-ui/react-toast";
import * as Progress from "@radix-ui/react-progress";
import "./uploaddropzone.css";

const UploadDropZone = () => {
  return (
    <Toast.Provider swipeDirection="right">
      <div className="dropzone-container">
        <div className="dropzone-inner">
          <div className="dropzone-content">
            <Cloud className="dropzone-icon" />
            <p className="dropzone-text">
              <span className="dz-text-bold">Click to upload</span> or drag and
              drop patient related files
            </p>
            <p className="dz-subtext">(Up to 4MB)</p>
          </div>
        </div>
      </div>
    </Toast.Provider>
  );
};

export default UploadDropZone;
