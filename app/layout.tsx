import "./globals.css";
import { cn } from "@/lib/utils";

import { AuthProvider, ThemeProvider, NextUIProvider } from "@/context";
import { Toaster } from "@ui/toaster";

import { inter } from "@/styles/fonts";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Civic Inn",
  description: "The Civic Inn is a 3-star hotel located in the heart of Dhaka, Bangladesh.",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="bg-background">
      {/* prettier-ignore */}
      <body className={cn("bg-back text-fore dark:bg-back-dark dark:text-fore-dark",inter.className)}>
            <AuthProvider>
              <ThemeProvider attribute="class" defaultTheme="light">
                {/* <NextUIProvider> */}
                <Toaster />
                {children}
                {/* </NextUIProvider> */}
              </ThemeProvider>
            </AuthProvider>
      </body>
    </html>
  );
}
