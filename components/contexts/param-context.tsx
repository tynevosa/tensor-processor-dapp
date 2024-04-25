"use client";
import { initialParam } from "@/constants/constant";
import { FilterOptions } from "@/types/type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, createContext, useContext, useState } from "react";

type ParamsContextType = {
  param: FilterOptions;
  setParam: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

const Context = createContext<ParamsContextType | null>(null);

export const useParam = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useParams must be used within a ParamsProvider");
  }

  return context;
};

export const ParamsProvider = ({ children }: { children: ReactNode }) => {
  const [param, setParam] = useState<FilterOptions>(initialParam);
  const [client] = useState(() => new QueryClient());
  return (
    <Context.Provider value={{ param, setParam }}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </Context.Provider>
  );
};
