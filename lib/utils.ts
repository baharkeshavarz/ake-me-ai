import { contexts } from "@/constants";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Get the name of button in satrting the chat
export const findElementName = (id: string) => {
  if (id.startsWith("faq-")) {
    return contexts.faq;
  } else if (id.startsWith("profile-")) {
    return contexts.profile;
  } else if (id.startsWith("hologram-")) {
    return contexts.hologram;
  } else {
    return "";
  }
};

// Get the color of send button
export const getSendButtonColor = (theme: string, inputText: string) => {
  if (theme === "light" && inputText !== "") {
    return "#000000"; // Black for light theme and non-empty input
  } else if (theme === "light" && inputText === "") {
    return "#dedcdc"; // for light theme and empty input
  } else if (theme === "dark" && inputText !== "") {
    return "#f3f3f3"; // for dark theme and non-empty input
  } else {
    return "#8c939f"; // for dark theme and empty input
  }
};