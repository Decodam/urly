import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { UrlShortenerForm } from "@/components/url-shortner-form";
import { Link2Icon, UserCheck2Icon } from "lucide-react";
import Link from "next/link";

export default function Home({}) {
  return (
    <>
      <div className="dark:hidden absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="hidden dark:block absolute top-0 z-[-2] h-full w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#0b0b0b_1px)] bg-[size:20px_20px]"></div>
      <Navbar />
      <main className="px-4 container">
        <section className="min-h-svh max-sm:mt-14 flex flex-col justify-center items-center gap-6">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-foreground text-7xl font-semibold">Urly, Short It!</h1>
            <p className="text-muted-foreground max-w-lg">Blazing-fast, open-source URL shortener powered by Redis. Instant redirects with zero ads or trackers—privacy-first and lightning quick!</p>
          </div>

          {/* URL Shortener Form */}
          <UrlShortenerForm />

          {/* Link Cards Section */}
          <div className="flex justify-center gap-4 max-w-lg w-full">
            <Link className="flex-1" href={"/links"}>
              <Card className="hover:border-blue-500 transition-all duration-300">
                <CardContent className="p-4 space-y-2">
                  <CardTitle className="gap-x-2 flex items-center"><Link2Icon /> Your Links</CardTitle>
                  <CardDescription>Manage and explore your shortened URLs.</CardDescription>
                </CardContent>
              </Card>
            </Link>
            <Link className="flex-1" href={"/"}>
              <Card className="hover:border-blue-500 transition-all duration-300">
                <CardContent className="p-4 space-y-2">
                  <CardTitle className="gap-x-2 flex items-center"><UserCheck2Icon /> Your Portfolio</CardTitle>
                  <CardDescription>Showcase your work and projects in a free portfolio.</CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}