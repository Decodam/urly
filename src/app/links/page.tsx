"use client"

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useState } from "react"; // Import useState to manage links state
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Import the Input component for the search form
import { Link2Icon, MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { DestructiveDropdownMenuItem } from "@/components/ui/dropdown-menu-destructive";
import { siteUrl } from "@/lib/constant";
import { handleShare } from "@/lib/utils";



export default function YourLinks() {
  // Sample data for shortened links
  const [links, setLinks] = useState([
    { shortUrl: `${siteUrl}/abc123`, originalUrl: "https://example.com/some-long-url-that-needs-to-be-truncated" },
    { shortUrl: `${siteUrl}/xyz456`, originalUrl: "https://example.com/another-long-url-for-testing" },
    { shortUrl: `${siteUrl}/def789`, originalUrl: "https://example.com/yet-another-link-to-test" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter links based on the search term
  const filteredLinks = links.filter(link => 
    link.shortUrl.includes(searchTerm) || link.originalUrl.includes(searchTerm)
  );



  return (
    <>
      <Navbar />
      <main className="px-4 container">
        <section className="min-h-svh max-sm:mt-14 flex flex-col justify-center items-center gap-6">
          <div className="text-center space-y-4">
            <h1 className="text-foreground text-7xl font-semibold">Your Links</h1>
            <p className="text-muted-foreground max-w-lg">
              Search and manage your shortened URLs below.
            </p>
          </div>

          {/* Search Form */}
          <Card className="w-full p-4 max-w-lg">
            <Input
              placeholder="Search your links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10"
            />
          </Card>

          {/* Link Cards Section */}
          <div className="flex flex-col gap-4 max-w-lg w-full">
            {filteredLinks.map((link, index) => (
              <Card key={index} className="hover:border-blue-500 transition-all duration-300 flex">
                <CardContent className="p-4 flex justify-between items-center w-full">
                  <div className="flex-1">
                    <Link href={link.originalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-2">
                      <Link2Icon /> <CardTitle>{link.shortUrl}</CardTitle>
                    </Link>
                    <CardDescription>
                      {link.originalUrl.length > 50 
                        ? `${link.originalUrl.substring(0, 50)}...` 
                        : link.originalUrl}
                    </CardDescription>
                  </div>
                  {/* Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="size-8 justify-center items-center flex hover:bg-muted rounded-md">
                      <MoreVerticalIcon size={20} className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleShare(link.shortUrl)}>Share</DropdownMenuItem>
                      <DestructiveDropdownMenuItem onClick={() => {
                        // Implement delete functionality here
                        console.log('Delete link:', link.shortUrl);
                      }}>
                        Delete
                      </DestructiveDropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}