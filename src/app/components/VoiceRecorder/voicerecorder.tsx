import React, {useState, useEffect, useRef} from "react";
import "../../Dashboard/dashboard.css";
import { Patient } from "@/libs/types";

interface VoiceRecorderProps {
  selectedPatient: Patient | null;
  onRecordingComplete: () => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({selectedPatient, onRecordingComplete}) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused]= useState(false);
    const [recordingTime, setRecordingTime] = useState(0)

    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);
    const timerInterval = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
      const interval = timerInterval.current;
      return () => {
        if(interval){
          clearInterval(interval)
        }
      }
    }, [])

    const startRecording = () => {

    }

    const pauseRecording = () => {

    }

    const resumeRecording = () => {

    }

    const stopRecording = () => {

    }

    const saveRecording = () => {

    }




    return (
      <div className="voice-recorder">
        <div className="timer">{formatTime(recordingTime)}</div>
        {!isRecording && (
          <button onClick={startRecording} disabled={!selectedPatient}>
            Start Recording
          </button>
        )}
        {isRecording && !isPaused && (
          <button onClick={pauseRecording}>Pause</button>
        )}
        {isRecording && isPaused && (
          <button onClick={resumeRecording}>Resume</button>
        )}
        {isRecording && <button onClick={stopRecording}>Stop</button>}
      </div>
    );
};

export default VoiceRecorder;
