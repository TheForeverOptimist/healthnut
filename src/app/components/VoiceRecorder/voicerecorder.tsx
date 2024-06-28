import React, { useState, useEffect, useRef } from "react";
import "../../Dashboard/dashboard.css";
import { Patient } from "@/libs/types";
import { medplum } from "@/libs/medplumClient";
import "./voicerecorder.css";

interface VoiceRecorderProps {
  selectedPatient: Patient | null;
  onRecordingComplete: () => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  selectedPatient,
  onRecordingComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = timerInterval.current;
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.start(10);
      setIsRecording(true);
      startTimer();
    } catch (err) {
      console.error("Error accessing mic:", err);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.pause();
      setIsPaused(true);
      stopTimer();
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder.current && isPaused) {
      mediaRecorder.current.resume();
      setIsPaused(false);
      startTimer();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      stopTimer();

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, {
          type: "audio/webm",
        });
        await saveRecording(audioBlob);
        audioChunks.current = [];
      };
    }
  };

  const saveRecording = async (audioBlob: Blob) => {
    if (selectedPatient) {
      try {
        const binary = await medplum.createBinary(
          audioBlob,
          "postvisit.webm",
          "audio/webm"
        );

 await medplum.createResource({
   resourceType: "DocumentReference",
   status: "current",
   type: {
     coding: [
       {
         system: "healthnut",
         code: "voice-recording",
         display: "Voice Recording",
       },
     ],
   },
   subject: { reference: `Patient/${selectedPatient.id}` },
   content: [
     {
       attachment: {
         contentType: "audio/webm",
         url: `Binary/${binary.id}`,
         title: `Voice Recording - ${new Date().toISOString()}`,
       },
     },
   ],
   date: new Date().toISOString(),
 });
        onRecordingComplete();
      } catch (err) {
        console.error("Error saving voice note:", err);
      }
    }
  };

  const startTimer = () => {
    timerInterval.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="box voiceRecorder">
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
