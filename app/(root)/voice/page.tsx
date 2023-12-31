"use client"
import { uploadVoiceToGetTransscribe } from '@/actions/get-voice';
import React, { useState } from 'react'
import { ReactMic } from 'react-mic';

const page = () => {
    const [record, setRecord] = useState(false);
    const startRecording = () => {
        setRecord(true);
      }
    const  stopRecording = () => {
        setRecord(false);
      }
     
      const onData = (recordedBlob) => {
        console.log('chunk of real-time data is: ', recordedBlob);
      }
     
      const  onStop = async(recordedBlob) => {
       const base64Data = recordedBlob.blobURL;
       console.log('recordedBlob is: ', base64Data);
       const blob = new Blob([base64Data], {type: "audio/wav"});
       const formData = new FormData();
       formData.append('file', blob, 'test.wav');
       const response = await uploadVoiceToGetTransscribe(formData);
       console.log(response);

      }

  return (
    <div>
    <ReactMic
      record={record}
      className="sound-wave"
      onStop={onStop}
      onData={onData}
      strokeColor="#000000"
      mimeType="audio/wav"  
      backgroundColor="#FF4081" />
    <button onClick={startRecording} type="button">Start</button>
    <button onClick={stopRecording} type="button">Stop</button>
  </div>
  )
}

export default page
