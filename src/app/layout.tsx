import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/theme/globals.css";
import { ThemeProvider } from "@/theme/provider";
import { Toaster } from "@/components/ui/toaster"



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Urly - Short it",
  description: "Blazing fast url shortner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
