import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
