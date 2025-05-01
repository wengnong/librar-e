import type { Metadata } from "next";
import "./globals.css";

import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Librar-E",
  description: "Read anywhere, everywhere.",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
