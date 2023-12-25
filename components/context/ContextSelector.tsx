"use client";

import  { useCallback, useEffect, useState } from "react";
import ContextVideoCard from "./ContextVideoCard";
import ContextFaqCard from "./ContextFaqCard";
import { getAllFaqs } from "@/actions/get-faqs";
import { FaqItem, HologramItem, ProfileItem, ContextValues } from "@/types";
import getAllProfiles from "@/actions/get-profiles";
import ContextProfileCard from "./ContextProfileCard";
import { getAllHolograms } from "@/actions/get-holograms";
import { findElementName } from "@/lib/utils";

interface ContextSelectorProps {
   contextValues: ContextValues,
   setContextValues: any;
}

const ContextSelector = ({contextValues, setContextValues}: ContextSelectorProps) => {
 const [faqLoading, setFaqLoading] = useState(false);
 const [profileLoading, setProfileLoading] = useState(false);
 const [hologramLoading, setHologramLoading] = useState(false);

const changeHandler = useCallback(
  (e: any) => {
    const { id, value } = e.target;
    const name = findElementName(id.toString());
     setContextValues((prevValues: ContextValues) => ({
      ...prevValues,
      [name]: value
    }));
  }, [setContextValues]);


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

  if (faqLoading || profileLoading || hologramLoading) return <p>Loaidng...</p>;
  return (
    <div className="flex w-full flex-col gap-5 pt-5">
      <div className="light-border flex flex-col items-center justify-center rounded-lg p-5">
        <h3 className="text-dark400_light900 py-2 text-sm">
          :نوع ویدثوی درخواستی خود را انتخاب نمایید
        </h3>
       {holograms.length && <ContextVideoCard items={holograms} />}
      </div>
      
      <div className="flex justify-start gap-5">
          {faqs.length && <ContextFaqCard 
                id="faq"
                title="سوالات متداول"
                messages={faqs}
                changeHandler={changeHandler}
          />
          }

          {profiles.length && <ContextProfileCard 
              id="profile"
              title="سوالات شخصی"
              messages={profiles}
              changeHandler={changeHandler}
          />
        }
      </div>
    </div>
  );
};

export default ContextSelector;
