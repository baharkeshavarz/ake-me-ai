"use client";

import useThemeStore from "@/store/useThemeStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useSetting } from "@/hooks/useSetting";
import { useEffect, useState } from "react";
import { gettSettingLogo } from "@/actions/get-setting";
import Select from "react-select";
import { configInfo, messageTypes, userRoles } from "@/constants";
import { getAllProfileHistory, getAllProfiles } from "@/actions/get-profiles";
import { useMessageContext } from "@/hooks/useMessageContext";
import { ChatMessageResponse, UserItem } from "@/types";
import { systemError } from "@/constants/general";
import SpinningLoading from "@/components/shared/loader/SpinningLoading";

export default function Login() {
  const theme = useThemeStore((state: any) => state.theme);
  const router = useRouter();
  const { projectInfo, onSet } = useSetting();
  const [logo, setLogo] = useState("");
  const [loginModel, setLoginModel] = useState("login");
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState<UserItem[]>([]);
  const [selectProfile, setSelectProfile] = useState<UserItem>();
  const { contextValues, onChangeContext } = useMessageContext();

  // Find the logo
  useEffect(() => {
    const getSettingLogo = async () => {
      try {
        const response = await gettSettingLogo(projectInfo.id);
        const data = await response.blob();
        const logoUrl = URL.createObjectURL(data);
        setLogo(logoUrl);
      } catch (error) {
        console.log("error", error);
      }
    };
    getSettingLogo();
  }, [projectInfo]);

  useEffect(() => {
    const getAllProfileFunc = async () => {
      try {
        setLoading(true);
        const response = await getAllProfiles();
        if (response.length) {
          const users: UserItem[] = response.map((resp) => ({
            value: resp.id,
            label: resp.name,
            content: resp.profile,
          }));
          setProfiles(users);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    getAllProfileFunc();
  }, [projectInfo]);

  const handleChange = (selectedOption: any) => {
    setSelectProfile(selectedOption);
  };

  const loginSchema = z.object({
    username: z.string(),
    password: z.string().min(6, "پسورد حداقل باید 6 کاراکتر باشد"),
  });

  const guestSchema = z.object({
    name: z.string().nonempty("نام را وارد کنید"),
  });

  type LoginFormData = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  type GuestFormData = z.infer<typeof guestSchema>;
  const {
    register: guestRegister,
    handleSubmit: guestHandleSubmit,
    formState: { errors: guestErrors },
    reset: guestReset,
  } = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setLoading(true);
    const profileData = profiles.find(
      (profile) => profile.value === selectProfile!.value
    );

    // Fetch the history
    const response = await getAllProfileHistory(Number(profileData?.value));

    if (response) {
      // Prepare the list
      let userHisrotyList: ChatMessageResponse[] = [];

      response.data!.forEach(
        (history: { content: { value: any }[]; role: string }) => {
          if (history.role !== "user") {
            history.content.map((result) => {
              userHisrotyList.push({
                id: "",
                type: messageTypes.text,
                message: result.value,
                creator: history.role === "user" ? "" : configInfo.systemLabel,
                isHistory: true,
              });
            });
          } else {
            userHisrotyList.push({
              id: "",
              type: messageTypes.text,
              message: history.content[0].value,
              creator: history.role === "user" ? "" : configInfo.systemLabel,
              isHistory: true,
            });
          }
        }
      );

      onSet({
        ...projectInfo,
        user: {
          id: selectProfile!.value.toString(),
          name: selectProfile!.label,
          role: userRoles.LOGGEDIN,
          firstProfile: Number(selectProfile!.label),
          profileContent: profileData?.content || "",
          historyList: userHisrotyList.length ? userHisrotyList.reverse() : [],
        },
      });

      // Set context
      onChangeContext({
        ...contextValues,
        contextType: "profile",
        contextId: selectProfile!.value,
        selectedProfile: selectProfile!.value,
      });

      setLoading(false);
      toast.success(`کاربر گرامی، ${selectProfile!.label} خوش آمدید`);
      router.push("/chat/1");
    } else {
      toast.error(systemError.message);
    }
  };

  const onSubmitGuest: SubmitHandler<GuestFormData> = (data) => {
    onSet({
      ...projectInfo,
      user: {
        id: "",
        name: data.name,
        role: userRoles.GUEST,
        profileContent: "",
        historyList: [],
      },
    });
    // Set context
    onChangeContext({
      ...contextValues,
      contextType: "faq",
    });

    toast.success(`کاربر گرامی، ${data.name} خوش آمدید`);
    router.push("/chat/1");
  };
  return (
    <>
      {loading && <SpinningLoading fullHeight={true} width="16" height="16" />}
      {!loading && (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
          <div
            className={`w-full rounded-md p-6 shadow-xl lg:max-w-md ${
              theme === "dark" ? "bg-dark-400" : "bg-light-700/5"
            }`}
          >
            <div className="flex-center">
              <Image
                src={logo}
                width={100}
                height={100}
                alt={projectInfo.name}
              />
            </div>
            <div className="flex justify-around w-full h-20">
              <div className="flex-center gap-x-2">
                <label
                  htmlFor="guestLogin"
                  className="ms-2 flex-1 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                >
                  ورود کاربر میهمان
                </label>
                <input
                  id="guestLogin"
                  type="radio"
                  value="guest"
                  name="guest-radio"
                  checked={loginModel === "guest"}
                  onChange={() => {
                    guestReset();
                    setLoginModel("guest");
                  }}
                  className="w-4 h-4 cursor-pointer text-primary-500 bg-gray-100 border-gray-300 focus:ring-primary-500
                      dark:focus:ring-primary-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="flex-center gap-x-2">
                <label
                  htmlFor="userLogin"
                  className="ms-2 flex-1 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                >
                  ورود کاربر
                </label>
                <input
                  id="userLogin"
                  type="radio"
                  value="login"
                  name="login-radio"
                  checked={loginModel === "login"}
                  onChange={() => {
                    reset();
                    setLoginModel("login");
                  }}
                  className="w-4 h-4 cursor-pointer text-primary-500 bg-gray-100 border-gray-300 focus:ring-primary-500
                      dark:focus:ring-primary-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            {loginModel === "login" && (
              <div id="login">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className={`block text-right text-sm font-semibold ${
                        theme === "dark" ? "text-light-900" : "text-dark-400"
                      }`}
                    >
                      نام کاربری
                    </label>
                    <div className="mt-5 w-50 text-right text-[0.8rem]">
                      <Select
                        options={profiles || []}
                        onChange={handleChange}
                        autoFocus={true}
                        placeholder="انتخاب کاربر"
                      />
                    </div>

                    {errors.username && (
                      <p className="flex items-center justify-end py-2 text-[0.7rem] text-red-500">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="password"
                      className={`block text-right text-sm font-semibold ${
                        theme === "dark" ? "text-light-900" : "text-dark-400"
                      }`}
                    >
                      رمزعبور
                    </label>
                    <input
                      type="password"
                      {...register("password")}
                      className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                    />
                    {errors.password && (
                      <p className="flex items-center justify-end py-2 text-[0.7rem] text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <Link
                    href="/forget"
                    className="flex-center py-3 text-xs text-primary-500 hover:underline"
                  >
                    رمزعبور خود را فراموش کرده اید؟
                  </Link>
                  <div className="mt-2">
                    <button
                      name="user-login"
                      type="submit"
                      className="w-full cursor-pointer rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
                    >
                      ورود
                    </button>
                  </div>
                </form>

                <div className="relative mt-6 flex w-full items-center justify-center border">
                  <div className="absolute bg-white px-5">یا</div>
                </div>
                <div className="mt-4 flex gap-x-2">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-gray-600 p-2 focus:ring-2 focus:ring-violet-600 focus:ring-offset-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      color={`${theme === "dark" ? "white" : "black"}`}
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                  </button>
                  <button className="flex w-full items-center justify-center rounded-md border border-gray-600 p-2 focus:ring-2 focus:ring-violet-600 focus:ring-offset-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      color={`${theme === "dark" ? "white" : "black"}`}
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                    </svg>
                  </button>
                  <button className="flex w-full items-center justify-center rounded-md border border-gray-600 p-2 focus:ring-2 focus:ring-violet-600 focus:ring-offset-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      color={`${theme === "dark" ? "white" : "black"}`}
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                    </svg>
                  </button>
                </div>
                <p
                  className={`flex-center mt-4 gap-3 text-center text-sm ${
                    theme === "dark" ? "text-light-900" : "text-dark-400"
                  }`}
                >
                  <Link
                    href="/signup"
                    className="font-medium text-primary-500 hover:underline"
                  >
                    ثبت نام کنید
                  </Link>
                  قبلا ثبت نام نکرده اید؟
                </p>
              </div>
            )}
            {loginModel === "guest" && (
              <div id="guest">
                <form onSubmit={guestHandleSubmit(onSubmitGuest)}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className={`block text-right text-sm font-semibold ${
                        theme === "dark" ? "text-light-900" : "text-dark-400"
                      }`}
                    >
                      دوست خوبم اسمت رو برام بنویس
                    </label>
                    <input
                      type="text"
                      {...guestRegister("name")}
                      className="mt-2 block w-full text-right text-[0.8rem] rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-gray-400 focus:outline-none 
                                    focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                    />
                    {guestErrors.name && (
                      <p className="flex items-center justify-end py-2 text-[0.7rem] text-red-500">
                        {guestErrors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-2">
                    <button
                      name="guest-login"
                      type="submit"
                      className="w-full cursor-pointer rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white 
                            transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
                    >
                      ورود
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
