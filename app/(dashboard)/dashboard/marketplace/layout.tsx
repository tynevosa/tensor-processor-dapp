import { ParamsProvider } from "@/components/contexts/param-context";
import { MarketSidebar } from "@/components/layout/market-side";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ParamsProvider>
      <div className="w-full h-screen overflow-hidden flex gap-0">
        <MarketSidebar />
        <div className="px-4 flex-grow">{children}</div>
      </div>
    </ParamsProvider>
  );
}
