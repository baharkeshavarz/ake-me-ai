import { useEffect } from "react";
import { applyThemePreference } from "../utils/themeUtils";
import useThemeStore from "@/store/useThemeStore";

const selector = (state: any) => state.theme;
export const useTheme = () => {
  const theme = useThemeStore(selector);
  useEffect(() => {
    applyThemePreference(theme);
  }, [theme]);
};