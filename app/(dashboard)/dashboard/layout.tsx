import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { ParamsProvider } from "@/components/contexts/param-context";

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
    <ParamsProvider>
      <div className="flex w-full flex-col h-full">
        <Header />
        <main className="flex flex-col bg-black h-full overflow-hidden">
          {children}
        </main>
      </div>
    </ParamsProvider>
  );
}
