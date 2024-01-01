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


  function onMediaSuccess(stream) {
    console.log("onMediaSuccess");
    const mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.mimeType = 'audio/webm'; // audio/webm or audio/ogg or audio/wav
    mediaRecorder.ondataavailable = function (blob) {
        // POST/PUT "Blob" using FormData/XHR2
        const blobURL = URL.createObjectURL(blob);
        document.write('<a href="' + blobURL + '">' + blobURL + '</a>');
    };
    mediaRecorder.start(3000);
}

  const startRecording = async () => {
    setRecordingStatus('recording');
    const media = new MediaRecorder(stream as MediaStream);
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    const localAudioChunks: Blob[] = [];

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
         // resolve(sendAudioToAPI(audioChunks));
         resolve(onMediaSuccess(audioChunks));
         
        };
      }
    });
  };

  // const sendAudioToAPI = async (audioBlob: any) => {
  //   try {
	//  const blob = new Blob(audioBlob, {type: "data:audio/wav"});
  //     const formData = new FormData();
  //     formData.append('file', blob, 'test.wav');
  //    	const response = await uploadVoiceToGetTransscribe(formData);
	// 	if (response) {
	// 		console.log(response)
	// 	}
  //   } catch (error) {
  //     console.error('Error sending audio to the API:', error);
  //   }
  // };

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
