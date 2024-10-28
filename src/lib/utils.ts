import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteUrl } from "./constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to handle sharing the link
export const handleShare = (url: string) => {
  if (navigator.share) {
    navigator
      .share({
        title: "Check out this link!",
        url: url,
      })
      .then(() => {
        console.log("Share successful");
      })
      .catch((error) => {
        console.log("Error sharing:", error);
      });
  } else {
    // Fallback for browsers that don't support the Web Share API
    console.log("Share this link manually:", url);
  }
};

export function setOrGetAnonKey() {
  const key = "anonKey";

  // Check if the key already exists in localStorage
  let anonKey = localStorage.getItem(key);

  if (!anonKey) {
    // Generate a random 32-character string (e.g., alphanumeric)
    anonKey = "local_" + Math.random().toString(36).substring(2, 34);

    // Store it in localStorage
    localStorage.setItem(key, anonKey);
  }

  return anonKey;
}

export function convertKeyToLink(key: string) {
  return `${siteUrl}/r/${key}`;
}
