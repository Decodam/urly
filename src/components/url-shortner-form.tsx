"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import confetti from "canvas-confetti";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LoaderIcon,
  ClipboardCopyIcon,
  XIcon,
  Share2Icon,
  LinkIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleShare } from "@/lib/utils";

// Define form schema with Zod
const formSchema = z.object({
  originalUrl: z
    .string()
    .url("Please enter a valid URL.")
    .nonempty("URL is required"),
});

export function UrlShortenerForm() {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { originalUrl: "" },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      // Make the API call to shorten the URL
      const response = await fetch("/api/short-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: values.originalUrl,
          ownerID: userId || "loc-w213r7hhfi", // TODO: implement anon url creation
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      // Parse the response
      const data = await response.json();
      const shortenedUrl = data.shortUrl;

      // Trigger confetti on success
      setShortenedUrl(shortenedUrl);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

      // Share the shortened URL
      handleShare(shortenedUrl);
      setLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create short link!",
        description: "Something went wrong! " + error,
      });
      setLoading(false);
    }
  }

  // Reset the form and shortened URL
  function handleReset() {
    form.reset();
    setShortenedUrl(null);
  }

  // Copy shortened URL to clipboard
  function handleCopy() {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      toast({
        title: "🎉 Link copied to clipboard",
        description: "The short link has been copied to your clipboard!",
      });
    }
  }

  return (
    <div className="w-full max-w-lg">
      <Card className={shortenedUrl ? "squeeze-card" : ""}>
        <CardContent className="p-4">
          {shortenedUrl ? (
            // Success content after URL is shortened
            <div className="flex flex-col items-center space-y-4">
              <p className="text-center text-lg font-medium">
                😎 URL shortened successfully!
              </p>
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="ghost" onClick={handleReset}>
                  <XIcon />
                </Button>
                <button
                  onClick={handleCopy}
                  className="px-2 py-1 h-full bg-muted rounded-lg flex justify-center items-center gap-1"
                >
                  <ClipboardCopyIcon size={16} />
                  <p className="font-medium">{shortenedUrl}</p>
                </button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    handleShare(shortenedUrl);
                  }}
                >
                  <Share2Icon />
                </Button>
              </div>
            </div>
          ) : (
            // Form content before URL is shortened
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  {...form.register("originalUrl")}
                  placeholder="https://example.com"
                  className="flex-1 h-11"
                />
                <Button
                  type="submit"
                  className="size-11 font-medium"
                  size="icon"
                >
                  {loading ? (
                    <LoaderIcon className="animate-spin" />
                  ) : (
                    <LinkIcon size={20} />
                  )}
                </Button>
              </div>
              {form.formState.errors.originalUrl && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.originalUrl.message}
                </p>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
