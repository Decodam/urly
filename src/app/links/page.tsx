"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react"; // Import useEffect for data fetching
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
import { convertKeyToLink, handleShare, setOrGetAnonKey } from "@/lib/utils";

// Define a TypeScript interface for the fetched links
interface ShortLink {
  id: number;
  key: string;
  value: string; // This is the original URL
  ownerID: string;
  createdAt: string; // ISO date string
}

export default function YourLinks() {
  const [links, setLinks] = useState<ShortLink[]>([]); // State for storing fetched links
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch short URLs
  const fetchLinks = async () => {
    const anonKey = setOrGetAnonKey(); // Get or set the anonymous key

    try {
      const response = await fetch(`/api/my-links?ownerID=${anonKey}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch links");
      }

      const data: ShortLink[] = await response.json();

      // Sort data in reverse order of createdAt
      const sortedLinks = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setLinks(sortedLinks); // Update state with sorted links
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  useEffect(() => {
    fetchLinks(); // Fetch links when component mounts
  }, []);

  // Filter links based on the search term
  const filteredLinks = links.filter(link =>
    link.value.includes(searchTerm) || link.key.includes(searchTerm)
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
            {filteredLinks.map((link) => (
              <Card key={link.id} className="hover:border-blue-500 transition-all duration-300 flex">
                <CardContent className="p-4 flex justify-between items-center w-full">
                  <div className="flex-1">
                    <Link href={convertKeyToLink(link.key)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-2">
                      <Link2Icon /> <CardTitle>{convertKeyToLink(link.key)}</CardTitle>
                    </Link>
                    <CardDescription>
                      {link.value.length > 50
                        ? `${link.value.substring(0, 50)}...`
                        : link.value}
                    </CardDescription>
                  </div>
                  {/* Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="size-8 justify-center items-center flex hover:bg-muted rounded-md">
                      <MoreVerticalIcon size={20} className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleShare(convertKeyToLink(link.key))}>Share</DropdownMenuItem>
                      <DestructiveDropdownMenuItem onClick={() => {
                        // Implement delete functionality here
                        console.log('Delete link:', link.value);
                      }}>
                        Delete
                      </DestructiveDropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            ))}

            {filteredLinks.length === 0 && <p className="text-center text-muted-foreground text-sm">No links created yet...</p>}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
