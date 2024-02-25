import { contexts } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const randomNumberInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

export const getFirstLetters = (phrase: string) => {
  if (phrase) {
    const letters = phrase
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word[0])
      .join(" ");
    return letters;
  }
  return "";
};

export const getTheQuestionType = (
  method: string,
  faqId: string,
  profileId: number
) => {
  if ((method === "faq" && profileId) || method === "faq") {
    return "faq";
  }

  if (method === "profile" && !faqId) {
    return "profile";
  }

  if (method === "profile" && faqId) {
    return "faq";
  }

  return "";
};

export const getTheQuestionValue = (
  method: string,
  faqId: string,
  profileId: number,
  val: number
) => {
  if (method === "profile") {
    return Number(profileId);
  }

  if (method === "faq") {
    return Number(faqId);
  }

  return Number(val);
};


export const RandomNumberInRange = (min: number, max: number) => {
  return Math.floor(Math.random()
      * (max - min + 1)) + min;
};