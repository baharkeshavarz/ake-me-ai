import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Modal from "../shared/modal/Modal";
import { updateOrInsertFaq } from "@/actions/get-faqs";
import { updateOrInsertProfile } from "@/actions/get-profiles";
import { contexts } from "@/constants";
import SpinningLoading from "../shared/loader/SpinningLoading";
import toast from "react-hot-toast";
import { systemError } from "@/constants/general";
import { useSetting } from "@/hooks/useSetting";

type ModalInfoProps = {
  id: string;
  title: string;
  description: string;
  type: string;
  setLoading: any;
  setListUpdated: any;
  open: boolean;
  setModalOpen: any;
};

const ModalInfo = ({
  id,
  title,
  description,
  type,
  setLoading,
  setListUpdated,
  open,
  setModalOpen
}: ModalInfoProps) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { projectInfo, onSet } = useSetting();
  const [isOpen, setIsOpen] = useState(open);
  useEffect(()  => {
    setIsOpen(open);
  }, [open])


  const handleSubmitUpdate = async (e: any) => {
    e.preventDefault();
    let response: any = null;
    setLoading(true);
    try {
      setIsSending(true);
      if (type === contexts.profile) {
        response = await updateOrInsertProfile(Number(id), name, desc);
      } else {
        response = await updateOrInsertFaq(Number(id), name, desc);
      }
      if (response && response.ok) {
        if (type === contexts.profile) {
            // set user data
            onSet({
              ...projectInfo,
              user: {
                ...projectInfo.user,
                name: name,
                profileContent: desc,
              },
            });
         }
        setName("");
        setDesc("");
        setIsSending(false);
        setIsOpen(false);
        setModalOpen(false);
        setListUpdated(true);
        toast.success(`عملیات با موفقیت انجام شد`);
        //router.push(pathname);
      }
    } catch (error) {
      toast.error(systemError.message);
    } finally {
      setName("");
      setDesc("");
      setLoading(false);
      setIsSending(false);
    }
  };

  useEffect(() => {
    setName(title);
    setDesc(description);
    return () => {
      setName("");
      setDesc("");
    };
  }, [title, description, type]);

  return (
    isOpen && <Modal open={open} setModalOpen={setModalOpen} onCloseFunc={setListUpdated}>
      <form onSubmit={handleSubmitUpdate} className="w-full">
        <div className="flex-center gap-4 w-full py-2">
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-right"
          />
          <Label htmlFor="name" className="text-right w-9">
            عنوان
          </Label>
        </div>
        <div className="flex-center w-full gap-4 py-2">
          <Textarea
            id="desc"
            value={desc}
            className="w-full min-h-[150px] text-right"
            onChange={(e) => setDesc(e.target.value)}
          />
          <Label htmlFor="desc" className="text-right w-9">
            توضیحات
          </Label>
        </div>
        <div className="flex-center w-full gap-4 py-2">
          <Button type="submit" className="bg-black text-white">
            {isSending ? (
              <>
                <SpinningLoading width="4" height="4" />
                ثبت
              </>
            ) : (
              "ثبت"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalInfo;
