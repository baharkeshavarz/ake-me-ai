"use client";

import  { useEffect, useState } from "react";
import {contextVideoPatterns } from "@/constants";
import ContextVideoCard from "./ContextVideoCard";
import ContextFaqCard from "./ContextFaqCard";
import { getAllFaqs } from "@/actions/get-faqs";
import { FaqItem, HologramItem, ProfileItem } from "@/types";
import getAllProfiles from "@/actions/get-profiles";
import ContextProfileCard from "./ContextProfileCard";
import getAllHolograms from "@/actions/get-holograms";

const ContextSelector = () => {
 const [faqLoading, setFaqLoading] = useState(false);
 const [profileLoading, setProfileLoading] = useState(false);
 const [hologramLoading, setHologramLoading] = useState(false);

 const [faqs, setFaqs] = useState<FaqItem[]>([]);
 const [profiles, setProfiles] = useState<ProfileItem[]>([]);
 const [holograms, setHolograms] = useState<HologramItem[]>([]);

 useEffect(() => {
  const getFaqs = async () => {
    try {
     setFaqLoading(true);
     const response = await getAllFaqs();
     setFaqs(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setFaqLoading(false);
    }
  };

  const getProfiles = async () => {
    try {
     setProfileLoading(true);
     const response = await getAllProfiles();
     setProfiles(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setProfileLoading(false);
    }
  };

  const getHolograms = async () => {
    try {
     setHologramLoading(true);
     const response = await getAllHolograms();
     setHolograms(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setHologramLoading(false);
    }
  };

  getFaqs();
  getProfiles();
  getHolograms();
}, []);

 if (faqLoading || profileLoading || hologramLoading) return <p>Loaidng....</p>;

  return (
    <div className="flex w-full flex-col gap-5 pt-5">
      <div className="light-border flex flex-col items-center justify-center rounded-lg p-5">
        <h3 className="text-dark400_light900 py-2">
          نوع ویدثوی درخواستی خود را انتخاب نمایید
        </h3>
       {holograms.length && <ContextVideoCard items={holograms} />}
      </div>
      
      <div className="flex justify-start gap-5">
        {faqs.length && <ContextFaqCard 
                    id="faq"
                    title="سوالات متداول"
                    messages={faqs}
            />
        }

        {profiles.length && <ContextProfileCard 
              id="profile"
              title="سوالات شخصی"
              messages={profiles}
        />
        }
      </div>
    </div>
  );
};

export default ContextSelector;
