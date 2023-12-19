"use client";

import Image from "next/image";
import { themesList } from "@/constants";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import useThemeStore from "@/store/useThemeStore";
import { applyThemePreference } from "@/utils/themeUtils";
import { useEffect } from "react";

const Theme = () => {
  const toggleTheme = useThemeStore((state: any) => state.toggleTheme);
  const theme = useThemeStore((state: any) => state.theme);

  useEffect(() => {
    applyThemePreference(theme);
  }, [theme]);

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state-open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {theme === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon"
              width={20}
              height={20}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] top-[-1rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300">
          {themesList.map((item) => (
            <MenubarItem
              key={item.value}
              onClick={toggleTheme}
              className="flex justify-center gap-2 px-2.5 py-2 focus:bg-light-700 dark:focus:bg-dark-400"
            >
              <p
                className={`body-semibold text-light-500 
                ${
                  theme === item.value
                    ? "text-primary-500"
                    : "text-dark400_light500"
                }`}
              >
                {item.label}
              </p>
              <Image
                src={item.icon}
                width={16}
                height={16}
                alt={item.label}
                className={`${theme === item.value && "active-theme"}`}
              />
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
