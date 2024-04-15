import { MarketplaceProvider } from "@/components/contexts/marketplace-context";
import { ParamsProvider } from "@/components/contexts/param-context";
import { MarketSidebar } from "@/components/layout/market-side";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ParamsProvider>
      <MarketplaceProvider>
        <div className="w-full h-screen flex gap-0">
          <MarketSidebar />
          <div className="flex-grow">{children}</div>
        </div>
      </MarketplaceProvider>
    </ParamsProvider>
  );
}
