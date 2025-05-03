import type { Metadata } from "next";
import "./globals.css";

import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Librar-E",
  description: "Read anywhere, everywhere.",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body>
          {children}

          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}

export default RootLayout;
