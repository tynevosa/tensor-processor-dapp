import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/side-bar";

export const metadata: Metadata = {
  title: "TPU Processor Dashboard",
  description: "Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen flex-row">
      <Sidebar />
      <div className="flex flex-col w-calc">
        <Header />
        <main className="flex flex-col bg-black w-full h-full items-stretch overflow-hidden ">
          {children}
        </main>
      </div>
    </div>
  );
}
