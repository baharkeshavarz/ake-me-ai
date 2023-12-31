import { uploadVoiceToGetTransscribe } from '@/actions/get-voice';
import React, { useState, useRef } from 'react';

const mimeType = "data:audio/wav";

const AudioRecorder: React.FC = () => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const getMicrophonePermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setPermission(true);
      setStream(mediaStream);
    } catch (err) {
    }
  };

  const startRecording = async () => {
    setRecordingStatus('recording');
    const media = new MediaRecorder(stream as MediaStream);
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = async () => {
    setRecordingStatus('inactive');
    mediaRecorder.current?.stop();

    await new Promise<void>((resolve) => {
      if (mediaRecorder.current) {
        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: mimeType });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudio(audioUrl);
          setAudioChunks([]);
          resolve(sendAudioToAPI(audioChunks));
        };
      }
    });
  };

  const convertBlobToBase64 = (blob:any) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

const convertBase64ToWav = (base64Data: string) => {
  // Extract base64 data (excluding the data URI prefix)
  const binaryData = atob(base64Data.split(',')[1]);

  // Create a Uint8Array from the binary data
  const uint8Array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // Create a Blob from the Uint8Array
  const blob = new Blob([uint8Array], { type: 'audio/wav' });

  // Create a File object from the Blob
  return new File([blob], 'converted_audio.wav', { type: 'audio/wav' });
};



  const sendAudioToAPI = async (audioBlob: any) => {
    try {
      const blob = new Blob(audioBlob);
      const base64Data = await convertBlobToBase64(blob);
      console.log(base64Data)
     const formData = new FormData();
     const wavFile = convertBase64ToWav(base64Data as string);
     console.log("wavFile:", wavFile)
     formData.append('file', wavFile);
     
     	const response = await uploadVoiceToGetTransscribe(formData);
		if (response) {
			console.log(response)
		}
    } catch (error) {
      console.error('Error sending audio to the API:', error);
    }
  };

  return (
    <div>
      <main>
        <div className="audio-controls">
          {!permission ? (
            <button onClick={getMicrophonePermission} type="button">
              Get Microphone
            </button>
          ) : null}
          {permission && recordingStatus === 'inactive' ? (
            <button onClick={startRecording} type="button">
              Start Recording
            </button>
          ) : null}
          {recordingStatus === 'recording' ? (
            <button onClick={stopRecording} type="button">
              Stop Recording
            </button>
          ) : null}
        </div>
        {audio ? (
          <div className="audio-player">
            <audio src={audio} controls></audio>
            <a download href={audio}>
              Download Recording
            </a>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default AudioRecorder;
