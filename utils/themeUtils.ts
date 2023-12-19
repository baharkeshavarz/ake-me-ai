import { themes } from "../constants";

// for tailwind css, need the change the root
export const applyThemePreference = (theme: any) => {
  const { THEME_DARK, THEME_LIGHT } = themes;
  
  const root = window.document.documentElement;
  const isDark = theme === THEME_DARK;
  root.classList.remove(isDark ? THEME_LIGHT : THEME_DARK);
  root.classList.add(theme);
}