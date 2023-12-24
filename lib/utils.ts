import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Get the name of button in satrting the chat
export const findElementName = (id: string) => {
  if (id.startsWith("faq-")) {
    return "faq";
  } else if (id.startsWith("profile-")) {
    return "profile";
  } else {
    return "";
  }
};