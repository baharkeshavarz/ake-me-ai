import ModalInfo from "@/components/chats/ModalInfo";
import ModalInfoProfile from "@/components/chats/ModalInfoProfile";
import { userRoles } from "@/constants";
import { useMessageContext } from "@/hooks/useMessageContext";
import { useSetting } from "@/hooks/useSetting";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineLogout, HiOutlineViewList } from "react-icons/hi";

interface UserProfileProps {
  setShowMenu: any;
}

const UserProfile = ({ setShowMenu }: UserProfileProps) => {
  const router = useRouter();
  const { onRemove } = useMessageContext();
  const { projectInfo } = useSetting();

  const hanleLogout = () => {
    onRemove();
    router.push("/login");
  };

  return (
    <>
    <div
      className="z-20 w-full rounded-lg shadow-md outline-none mb-1
                bottom-24 absolute bg-dark-400 border 
                border-[#646566] overflow-hidden
                data-[state=open]:animate-in
                data-[state=closed]:animate-out
                data-[state=closed]:fade-out-0
                data-[state=open]:fade-in-0
                data-[state=closed]:zoom-out-95
                data-[state=open]:zoom-in-95
                data-[side=top]:slide-in-from-bottom-2"
    >
      <nav className="flex-center flex-col text-[0.8rem]">
        <div className="flex-center gap-x-1 p-3 hover:bg-dark-300 w-full cursor-pointer">
          <p className="text-white w-16 flex-end">
            <Link href="/setting" onClick={() => setShowMenu(false)}>
              تنظیمات
            </Link>
          </p>
          <p className="w-6 flex-center">
            <HiOutlineViewList color="white" size="20" />
          </p>
        </div>

        {projectInfo.user.role === userRoles.LOGGEDIN && (
            <>
                <div className="flex-center gap-x-1 py-3 hover:bg-dark-300 w-full cursor-pointer">
                      <p className="text-white w-16">
                        <Link href="?modal-info=true">پروفایل من</Link>
                      </p>
                      <p className="w-6 flex-center">
                        <HiOutlineViewList color="white" size="20" />
                      </p>
                    </div>
            </>
            )}
        <div
          className="flex-center gap-x-1 p-3 hover:bg-dark-300 w-full cursor-pointer"
          onClick={hanleLogout}
        >
          <p className="text-white w-16 flex-end">خروج</p>
          <p className="w-6 flex-center">
             <HiOutlineLogout color="white" size="20" />
          </p>
        </div>
      </nav>
    </div>
   
    <ModalInfoProfile
        id={projectInfo.user.id}
        title={projectInfo.user.name}
        description={projectInfo.user.profileContent}
        type="profile"
        setListUpdated={() => {}}
        setLoading={() => {}}
      />
    </>
  );
};

export default UserProfile;
