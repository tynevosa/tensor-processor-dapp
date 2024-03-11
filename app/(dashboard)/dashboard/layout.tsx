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
    <div className="flex h-screen overflow-hidden w-full">
      <Sidebar />
      <main className="flex flex-col bg-black w-full items-stretch lg:ml-64 ml-0">
        <Header />
        {children}
      </main>
    </div>
  );
}
