import { MarketplaceProvider } from "@/components/contexts/marketplace-context";
import { ParamsProvider } from "@/components/contexts/param-context";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ParamsProvider>
      <MarketplaceProvider>
        <div className="w-full h-screen flex gap-0">{children}</div>
      </MarketplaceProvider>
    </ParamsProvider>
  );
}
