import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { ParamsProvider } from "@/components/contexts/param-context";

export const metadata: Metadata = {
  title: "TPU Processor Admin Panel",
  description: "Admin Panel",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ParamsProvider>
      <div className="flex flex-col w-full h-full">
        <Header />
        <main className="flex flex-col bg-black h-full overflow-hidden">
          {children}
        </main>
      </div>
    </ParamsProvider>
  );
}
