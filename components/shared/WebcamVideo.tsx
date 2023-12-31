import { uploadHologramVideo } from "@/actions/get-holograms";
import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import Webcam, { WebcamProps } from "react-webcam";
import SpinningLoading from "./loader/SpinningLoading";
import { HologramItem } from "@/types";
import { roles } from "@/constants";
import toast from "react-hot-toast";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { randomNumberInRange } from "@/lib/utils";


const videoConstraints: WebcamProps["videoConstraints"] = {
  facingMode: "user",
};

type WebcamVideoProps = {
  holograms: HologramItem[];
  setIsCapturing: Dispatch<SetStateAction<boolean>>;
  setHolograms: Dispatch<SetStateAction<HologramItem[]>>;
}

const WebcamVideo = ({ holograms, setIsCapturing, setHolograms }: WebcamVideoProps) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");

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
      let textNotification = "";
      if (fileName === "") {
         toast.error("!اسم فایلت رو انتخاب کن");
      } else if (recordedChunks.length) {
        setIsUploading(true);
        textNotification = toast.loading("!در حال آپلود فایل هستم");
        const blob = new Blob(recordedChunks, { type: 'video/mp4' });
        const formData = new FormData();
        const uniqueId = `${fileName}_${randomNumberInRange(1, 10)}.mp4`;
        formData.append('file', blob, uniqueId);
        try {
          const response = await uploadHologramVideo(formData);
          if (response) {
            setUploadedFile(blob as File);
            setIsCapturing(false);
            setFileName("");
            console.log('File uploaded successfully');
            const newHologram: HologramItem = {
              id: randomNumberInRange(100, 1000), // generate random number
              unique_id: uniqueId,
              name: fileName,
              role: roles.USER,
            }
            setHolograms([...holograms, newHologram]);
            setIsUploading(false);
            toast.success("فایل ویدثو آپلود شد", {
              id: textNotification,
            });
          } else {
            console.error('File upload failed');
            toast.error("توی آپلود ویدثو مشکلی پیش اومده. دوباره تلاش کن", {
              id: textNotification,
            });
            setIsUploading(false);
            setFileName("");
          } 
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    }, [recordedChunks]);


  const handleCancelCaptureClick = () => {
    setUploadedFile(null);
    setIsCapturing(false);
    setIsUploading(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    const isValidInput = /^[A-Za-z]+$/.test(userInput);
    if (isValidInput || userInput === '') {
      setFileName(userInput);
    }
  };

  return (
    <div className="flex-center flex-col">
      <Webcam
        width="600"
        height="300"
        audio={false}
        mirrored={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
      <div className="flex-center p-3 gap-x-2 w-full">
            <HoverCard>
              <HoverCardTrigger className="text-[0.75rem] hover:cursor-pointer">
              <input
                type="text"
                 placeholder="اسم فایلت رو انتخاب کن"
                 value={fileName}
                 onChange={handleInputChange}
                 className="rounded-md border text-center bg-white px-4 py-2 text-gray-700 focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
               />
              </HoverCardTrigger>
                <HoverCardContent className="background-dark400_light900 text-light700_dark500 text-sm w-fit text-center">
                   .نام فایل شما باید انگلیسی و به صورت تک کلمه ای باشد 
                  <br/>
                  .از خط فاصله استفاده نکنید
                </HoverCardContent>
            </HoverCard>
          
            <button
               onClick={handleCancelCaptureClick}
               className="background-strop_upload rounded-lg py-2.5 px-4"
            >
             !منصرف شدم
           </button>
          {capturing ? (
            <button
               onClick={handleStopCaptureClick}
               className="background-strop_upload rounded-lg py-2.5 px-4"
            >
            توقف ضبط
           </button>
          ) : (
            <button 
               onClick={handleStartCaptureClick}
               className="background-upload rounded-lg py-2 px-4"
            >
            شروع ضبط
           </button>
          )}

          {recordedChunks.length > 0 && (
            <button 
                onClick={handleFileUpload}
                className="background-send_upload rounded-lg py-2 px-4 flex-center gap-x-2 min-w-fit"
                >
               {isUploading && <SpinningLoading width="6" height="6" />}
                ارسال فایل
            </button>
           )} 
      </div>
    </div>
  );
};

export default WebcamVideo;
