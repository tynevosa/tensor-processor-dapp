"use client";
import { InitialGPUInfo } from "@/constants/constant";
import { GPUInfoType } from "@/types/type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, createContext, useContext, useState } from "react";

type MarketplaceContextType = {
  reveal: GPUInfoType;
  setReveal: React.Dispatch<React.SetStateAction<GPUInfoType>>;
};

const Context = createContext<MarketplaceContextType | null>(null);

export const useReveal = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }

  return context;
};

export const MarketplaceProvider = ({ children }: { children: ReactNode }) => {
  const [reveal, setReveal] = useState<GPUInfoType>(InitialGPUInfo);
  const [client] = useState(() => new QueryClient());
  return (
    <Context.Provider value={{ reveal, setReveal }}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </Context.Provider>
  );
};
