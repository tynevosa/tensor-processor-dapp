"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ModelContextType = {
  input: any;
  setInput: React.Dispatch<React.SetStateAction<any>>;
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
};

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useParams must be used within a ParamsProvider");
  }
  return context;
};

export const ModelProvider = ({ children }: { children: ReactNode }) => {
  const [input, setInput] = useState<any>({});
  const [model, setModel] = useState<string>("");

  return (
    <ModelContext.Provider value={{ input, setInput, model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
};
