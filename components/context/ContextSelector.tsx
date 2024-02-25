"use client";

import { useCallback, useEffect, useState } from "react";
import ContextFaqCard from "./ContextFaqCard";
import { getAllFaqs } from "@/actions/get-faqs";
import { FaqItem, HologramItem, ProfileItem } from "@/types";
import { getAllProfiles } from "@/actions/get-profiles";
import { getAllHolograms } from "@/actions/get-holograms";
import { contexts, roles, userRoles } from "@/constants";
import SpinningLoading from "../shared/loader/SpinningLoading";
import { useMessageContext } from "@/hooks/useMessageContext";
import ContextVideoList from "./ContextVideoList";
import toast from "react-hot-toast";
import { useSetting } from "@/hooks/useSetting";
import { getTheQuestionType, getTheQuestionValue } from "@/lib/utils";

const ContextSelector = () => {
  const [faqLoading, setFaqLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [hologramLoading, setHologramLoading] = useState(false);
  const { onChangeContext, contextValues } = useMessageContext();
  const { projectInfo } = useSetting();

  const changeHandler = useCallback(
    (e: any) => {
      let selectedProfileId = 0;
      let selectedFaqId = "";
      const { value } = e.target;
      const cardType = e.target.getAttribute("data-card");

      // check the profile radios
      const selectedProfileRadioButton = document.querySelector(
        'input[name="context-type-profile"]:checked'
      ) as any;
      if (selectedProfileRadioButton) {
        selectedProfileId = selectedProfileRadioButton!.value;
      }

      // check the faq radios
      const selectedFaqRadioButton = document.querySelector(
        'input[name="context-type-faq"]:checked'
      ) as any;
      if (selectedFaqRadioButton) {
        selectedFaqId = selectedFaqRadioButton!.value;
      }
      const contextIdentity = getTheQuestionType(
        cardType,
        selectedFaqId,
        selectedProfileId
      );

      onChangeContext({
        ...contextValues,
        contextType: contextIdentity,
        contextId: getTheQuestionValue(
          contextIdentity,
          selectedFaqId,
          selectedProfileId,
          value
        ),
        // selectedProfile:
        //   cardType === "faq" || cardType === "profile" ? selectedProfileId : 0,
      });

      // if(cardType === "faq" && projectInfo.user.role === userRoles.LOGGEDIN && !selectedProfileId) {
      //   toast.error("حالا که داری از پرسش های متدوال می پرسی، پروفایلت رو هم انتخاب کن");
      // } else {
      toast.success("زمینه سوالت انتخاب شد");
      // }
    },
    [onChangeContext]
  );

  const changeHandlerHologram = useCallback(
    (e: any) => {
      const { value } = e.target;
      onChangeContext({
        ...contextValues,
        hologram: value,
      });
      toast.success("هولوگرام انتخاب شد");
    },

    [onChangeContext, contextValues]
  );

  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [profiles, setProfiles] = useState<ProfileItem[]>([]);
  const [holograms, setHolograms] = useState<HologramItem[]>([]);
  const [listUpdated, setListUpdated] = useState(false);

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
        const modifiedHologrms = response.map((hologram) => ({
          ...hologram,
          role: roles.SYSTEM,
        }));
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
    setListUpdated(false);
  }, [listUpdated]);

  if (faqLoading || profileLoading || hologramLoading)
    return <SpinningLoading />;

  return (
    <div className="flex w-full flex-col gap-5 pt-5">
      <ContextVideoList
        holograms={holograms}
        setHolograms={setHolograms}
        changeHandler={changeHandlerHologram}
        card="hologram"
      />
      {/* <div className="flex justify-center gap-5 w-full">
        {faqs.length ? (
          <ContextFaqCard
            id={contexts.faq}
            title="سوالات متداول"
            messages={faqs}
            changeHandler={changeHandler}
            card="faq"
            setListUpdated={setListUpdated}
          />
        ) : (
          <SpinningLoading />
        )} */}

        {/* {projectInfo.user.role === userRoles.LOGGEDIN &&
          profiles.length > 0 && (
            <ContextProfileCard
              id={contexts.profile}
              title="سوالات پروفایل"
              messages={profiles}
              changeHandler={changeHandler}
              card="profile"
              setListUpdated={setListUpdated}
            />
          )} */}
{/* 
        {projectInfo.user.role === userRoles.LOGGEDIN && !profiles && (
          <SpinningLoading />
        )} 
      </div>*/}
    </div>
  );
};

export default ContextSelector;
