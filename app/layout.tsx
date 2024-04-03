import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from "@/components/layout/provider";
import { Toaster } from "@/components/ui/toaster";

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="./favicon.ico" sizes="16x16 32x32 64x64" />
      </Head>
      <body className={cn(chakra.className, "h-screen")}>
        <Toaster />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
