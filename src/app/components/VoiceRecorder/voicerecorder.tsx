import React from "react";
import "../../Dashboard/dashboard.css";

const VoiceRecorder = () => {
    return (
      <div className="box voiceRecorder">
        <label>Record Patient Note</label>
        <button>Start Recording</button>
        <div className="sound-wave">Sound wave visualization here</div>
      </div>
    );
};

export default VoiceRecorder;
