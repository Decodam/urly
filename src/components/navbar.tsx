"use client"

import { ThemeToggleIconButton } from "@/components/ui/theme";
import { Button } from "@/components/ui/button";
import { UserIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";

export default function Navbar({}) {
  const clerk = useClerk()
  
  return (
    <nav className="fixed top-0 w-full bg-white/10 dark:bg-neutral-950/30 backdrop-blur-md border-b px-4 py-2 flex justify-between items-center">
      <img src="/logo.png" alt="" className="size-10 rounded-lg" />

      {/* Links for larger screens */}
      <ul className="hidden md:flex justify-center items-center gap-12">
        <li className="font-medium hover:-translate-y-1 transition">
          <Link href="/">Home</Link>
        </li>
        <li className="font-medium hover:-translate-y-1 transition">
          <Link href="/links">Your Links</Link>
        </li>
        <li className="font-medium hover:-translate-y-1 transition">
          <Link href="/">Portfolio</Link>
        </li>
      </ul>

      <div className="nav-left flex items-center gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <Button onClick={() => {clerk.openSignIn()}} size="icon" variant="outline">
            <UserIcon />
          </Button>
        </SignedOut>

        <ThemeToggleIconButton />

        {/* Dropdown Menu for small screens */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="md:hidden mx-4 my-2">
            <DropdownMenuLabel>Explore</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/links">Your Links</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/">Portfolio</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
