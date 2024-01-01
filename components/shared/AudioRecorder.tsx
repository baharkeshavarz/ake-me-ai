import { getVoiceByQuestion, uploadVoiceToGetTransscribe } from '@/actions/get-voice';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import micSVG from "../../public/assets/icons/mic.svg";
import pauseSVG from "../../public/assets/icons/pause.svg";
import resumeSVG from "../../public/assets/icons/play.svg";
import saveSVG from "../../public/assets/icons/save.svg";
import closeSVG from "../../public/assets/icons/close.svg";
import toast from 'react-hot-toast';
import { configInfo, contexts, messageTypes } from '@/constants';
import { useRouter } from 'next/navigation';
import SpinningLoading from './loader/SpinningLoading';
import { useMessageContext } from '@/hooks/useMessageContext';
import { getChatByFaq, getChatByProfile } from '@/actions/get-chat';
import { randomNumberInRange } from '@/lib/utils';

interface AudioRecorderProps {
  list: any,
  setList: any,
}

const AudioRecorder = ({list, setList}: AudioRecorderProps) => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [showMic, setShowMic] = useState(false);
  const [loading, setLoading] = useState(false);
  const { contextValues } = useMessageContext();

  const router = useRouter();
  let timerInterval: any = null;
  let systemResponse: any = null;
  let response: any = null;
  let voiceResponse: any = null;
  const mimeType = "audio/wav";
  let randId = 0;


  const updateObjectInList = (updatedObject: any, index: number) => {
    setList((prevList: any) =>
      prevList.map((obj: any) => {
        if (obj.id === index) {
          return { ...obj, ...updatedObject };
        }
        return obj;
      })
    );
  };


  const getMicrophonePermission = async () => {
    if(!contextValues.contextType) {
      toast.error("!اول زمینه ی سوالت را انتخاب کن");
      return;
    }
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setPermission(true);
      setStream(mediaStream);
      setShowMic(false);
    } catch (err) {
    }
  };

  const startRecording = async () => {
    setRecordingStatus('recording');
    setShowTimer(true);

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

    // Handle Timer
    const startTime = Date.now() - elapsedTime; // Adjust the start time based on the current elapsed time
    timerInterval = setInterval(() => {
    const currentTime = Date.now();
    setElapsedTime(currentTime - startTime);
    }, 1000);
  };

  const stopRecording = async () => {
    setRecordingStatus('inactive');
    mediaRecorder.current?.stop();
    // Handle Timer
    setShowTimer(false); 
    if (timerInterval) {
      clearInterval(timerInterval);
    }

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

  const sendAudioToAPI = async (audioBlob: any) => {
    randId = randomNumberInRange(100, 1000);
    setLoading(true);
    try {
      const blob = new Blob(audioBlob);
      const formData = new FormData();
      formData.append('file', blob, "transcribe.wav");
     	response = await uploadVoiceToGetTransscribe(formData);

		if (response.ok) {
      // Add user's message to list
      setList((prevList: any) => [...prevList, {
        id: "",
        type: messageTypes.text,
        message: response.transcript,
        creator: configInfo.userLabel,
      }]);

      // Call API
      try {
        setList((prevList: any) => [...prevList, {
          id: randId,
          type: messageTypes.text,
          message: "",
          creator: configInfo.systemLabel,
        }]);

        if (contextValues.contextType === contexts.faq) {
          systemResponse = await getChatByFaq(
            Number(contextValues.contextId),
            response.transcript
          );
        } else {
          systemResponse = await getChatByProfile(
            Number(contextValues.contextId),
            response.transcript
          );
        }

        if (systemResponse?.data) {
          updateObjectInList({
            id: systemResponse.data.response_id,
            type: messageTypes.text,
            message: systemResponse.data.msg,
            creator: configInfo.systemLabel,
          }, randId);
         
        //  toast.success(systemChatSuccess.message, {
        //       id: textNotification,
        //   });
       //   }
        }
      } catch (error) {
      } finally {
        // todo
      }
      setLoading(false);
      handleCancelRecordingClick();
      router.push("/chat/1");
      // call api for getting the voice
      voiceResponse = await getVoiceByQuestion(systemResponse.data.msg);
      if (voiceResponse?.url) {
        setList((prevList: any) => [...prevList, {
          id: voiceResponse!.unique_id,
          type: messageTypes.voice,
          message: "voice",
          creator: configInfo.systemLabel,
        }]);

        setList((prevList: any) => [...prevList, {
          id: voiceResponse!.unique_id,
          type: messageTypes.video,
          message: "video",
          creator: configInfo.systemLabel,
        }]);
      }

		} else {
      toast.error(response.transcript);
      handleCancelRecordingClick();
    }
    } catch (error) {
       toast.error(response.transcript);
       handleCancelRecordingClick();
    }
  };

  const handleCancelRecordingClick = () => {
    setShowTimer(false);
    setElapsedTime(0);
    setRecordingStatus("inactive");
    setAudio(null);
    setAudioChunks([]);
    setShowMic(true);
    setLoading(false);
  }

  // Reset elapsed time when the recording status changes
  useEffect(() => {
    setElapsedTime(0);
  }, [recordingStatus]);

  if (loading) return <div className="flex-center h-full"><SpinningLoading /></div>;
  return (
        <>
          {!permission || showMic ? (
            <Image
                src={recordingStatus === "inactive" ? micSVG : saveSVG}
                className="mt-4 cursor-pointer pt-0.5"
                width={20}
                height={20}
                onClick={recordingStatus ? () => getMicrophonePermission() : startRecording}
                alt="دسترسی به میکروفن"
            />
          ) : null}

          {permission && recordingStatus === 'inactive' && !showMic ? (
           <div className="flex-center gap-x-1">
              <div className="rounded-full bg-primary-500 p-4 shadow-md shadow-slate-400">
                <Image
                    src={resumeSVG}
                    width={20}
                    height={20}
                    onClick={startRecording}
                    className="shadow-sm"
                    alt="َشروع ضبظ"
                  />
              </div>
             <Image
                src={closeSVG}
                className="cursor-pointer hover:opacity-75 hover:bg-slate-400 hover:rounded-sm"
                width={20}
                height={20}
                onClick={handleCancelRecordingClick}
                alt="انصراف"
            /> 
           </div>
          ) : null}

         <div className="flex items-center">
             {recordingStatus === 'recording' ? (
                <div className="flashing-icon rounded-full bg-primary-500 p-4 shadow-md shadow-slate-400">
                    <Image
                      src={pauseSVG}
                      width={20}
                      height={20}
                      onClick={stopRecording}
                      alt="توقف ضبظ"
                  />
               </div>
               ) : null}

          {showTimer && (
            <div className="flex-center">
              <div className="flex-center gap-x-2 px-2">
                  <div className="animate-blink h-3 w-3 rounded-full bg-red-500"></div>
                  {formatTime(elapsedTime)}
              </div>
                <Image
                    src={closeSVG}
                    className="cursor-pointer hover:opacity-75 hover:bg-slate-400 hover:rounded-sm"
                    width={20}
                    height={20}
                    onClick={handleCancelRecordingClick}
                    alt="انصراف"
                /> 
            </div>
          )}
        </div>
      </>
  );
};

// Function to format time in seconds to MM:SS format
const formatTime = (timeInSeconds: number): string => {
  const seconds = Math.floor((timeInSeconds / 1000) % 60);
  const minutes = (Math.floor((timeInSeconds / 1000 / 60) % 60));
  return `${minutes}: ${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default AudioRecorder;
