import { uploadHologramVideo } from "@/actions/get-holograms";
import React, { useCallback, useRef, useState } from "react";
import Webcam, { WebcamProps } from "react-webcam";

const videoConstraints: WebcamProps["videoConstraints"] = {
  width: 500,
  height: 500,
  facingMode: "user",
};

const WebcamVideo = () => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDataAvailable = useCallback(({ data }: { data: BlobPart }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data as Blob));
    }
  }, [setRecordedChunks]);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    if (webcamRef.current?.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, [mediaRecorderRef, setCapturing]);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) =>  {
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, { type: 'video/mp4' });
        const formData = new FormData();
        formData.append('file', blob, 'sample_01.mp4');
        try {
          const response = await uploadHologramVideo(formData);
          if (response) {
            setUploadedFile(blob as File);
            console.log('File uploaded successfully');
          } else {
            console.error('File upload failed');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    }, [recordedChunks]);

  return (
    <div>
      <Webcam
        height={400}
        width={400}
        audio={false}
        mirrored={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
      {capturing ? (
        <button onClick={handleStopCaptureClick}>توقف ضبط</button>
      ) : (
        <button onClick={handleStartCaptureClick}>شروع ضبط</button>
      )}
      <div className="bg-red-500">
      {recordedChunks.length > 0 && (
        <>
          <button onClick={handleFileUpload}>Upload</button>
          {uploadedFile && <p>File selected: {uploadedFile.name}</p>}
        </>
      )}
      </div>

    </div>
  );
};

export default WebcamVideo;
