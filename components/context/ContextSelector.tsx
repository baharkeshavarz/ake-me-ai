"use client";

import { useCallback, useEffect, useState } from "react";
import ContextFaqCard from "./ContextFaqCard";
import { getAllFaqs } from "@/actions/get-faqs";
import { FaqItem, HologramItem, ProfileItem } from "@/types";
import getAllProfiles from "@/actions/get-profiles";
import ContextProfileCard from "./ContextProfileCard";
import { getAllHolograms } from "@/actions/get-holograms";
import { findElementName } from "@/lib/utils";
import { contexts, roles } from "@/constants";
import SpinningLoading from "../shared/loader/SpinningLoading";
import { useMessageContext } from "@/hooks/useMessageContext";
import ContextVideoList from "./ContextVideoList";

const ContextSelector = () => {
  const [faqLoading, setFaqLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [hologramLoading, setHologramLoading] = useState(false);
  const { onChange: onChangeContext } = useMessageContext();

  const changeHandler = useCallback(
    (e: any) => {
      const { id, value } = e.target;
      const name = findElementName(id.toString());
      onChangeContext({
        contextType: name,
        contextId: value,
        hologram: name === "hologram" ? value : "",
      });
    },
    [onChangeContext]
  );

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
        const modifiedHologrms = response.map(hologram => ({...hologram, role: roles.SYSTEM}));
        setHolograms(modifiedHologrms);
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

  if (faqLoading || profileLoading || hologramLoading)
    return <SpinningLoading />;
  return (
    <div className="flex w-full flex-col gap-5 pt-5">
      <ContextVideoList
          holograms={holograms}
          setHolograms={setHolograms}
          changeHandler={changeHandler}
      />
      <div className="flex justify-start gap-5">
        {faqs.length ? (
          <ContextFaqCard
            id={contexts.faq}
            title="سوالات متداول"
            messages={faqs}
            changeHandler={changeHandler}
          />
        ) : (
          <SpinningLoading />
        )}

        {profiles.length ? (
          <ContextProfileCard
            id={contexts.profile}
            title="سوالات پروفایل"
            messages={profiles}
            changeHandler={changeHandler}
          />
        ) : (
          <SpinningLoading />
        )}
      </div>
    </div>
  );
};

export default ContextSelector;
