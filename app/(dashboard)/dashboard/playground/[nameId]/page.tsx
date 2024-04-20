"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { buttonTab } from "@/constants/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Playground } from "@/components/playground/playground";
import { API } from "@/components/playground/api";
import { Info } from "@/components/playground/info";
import { TInputValue } from "@/types/type";
import { ModelProvider } from "@/components/contexts/model-context";

type Props = {
  params: {
    nameId: string;
  };
};

const ModelDetailPage = ({ params }: Props) => {
  const [activeBtn, setActiveBtn] = useState(buttonTab[0]?.name);
  const [inputSchemas, setInputSchemas] = useState<TInputValue>([]);

  const { nameId } = params;
  const { data: model, error } = useQuery({
    queryKey: ["model-detail"],
    queryFn: () =>
      axios
        .get(`/api/model/get/${nameId}`, {
          headers: {
            "Content-Type": "applicatoin/json",
          },
        })
        .then((res) => res.data),
  });

  const mappingSchemaToInput = async (properties: any) => {
    const schemaKeys = Object.keys(properties);
    let tempInput: any = {};
    for (let i = 0; i < schemaKeys.length; i++) {
      const schemaKey = schemaKeys[i];
      const schemaValue = properties[schemaKey];
      tempInput[schemaKey] = schemaValue["default"];
    }
    setInputSchemas(tempInput);
  };

  useEffect(() => {
    if (model) {
      const properties = model["api_schema"]["Input"]["properties"];
      if (properties ?? Object.keys(properties)?.length > 0) {
        mappingSchemaToInput(properties);
      }
    }
  }, [model]);

  if (error) return "An error has occurred: " + error.message;

  if (!model) return null;

  return (
    <ScrollArea className="h-full w-full">
      <div className="container mx-auto px-10 py-16 w-full h-full gap-10 flex flex-col">
        <div className="flex md:flex-row flex-col md:justify-between justify-center items-start">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl text-white">{model.name}</h1>
            <p className="text-white text-lg">{model.description}</p>
          </div>
        </div>

        <div className="flex flex-row mb-3 mt-10 border-b border-gray-800 gap-6">
          {buttonTab.map((item, index) => (
            <button
              className={`${
                activeBtn === item?.name
                  ? "text-[#97AEF3] font-[600] border-b border-[#97AEF3]"
                  : "text-white  font-[100]"
              } sm:text-lg gap-2 text-sm flex flex-row items-center px-2 py-2`}
              key={item?.name}
              onClick={() => setActiveBtn(item?.name)}
            >
              <Image
                src={item.url}
                width={20}
                height={20}
                className="h-full w-full ml-1"
                style={{
                  width: "auto",
                  height: "auto",
                  filter:
                    activeBtn === item?.name ? "hue-rotate(317deg)" : "none",
                }}
                alt="image"
                priority
              />
              <span className="hidden md:flex">{item.name}</span>
            </button>
          ))}
        </div>
        {activeBtn === "Playground" ? (
          <ModelProvider>
            <Playground
              schema={model?.api_schema}
              defaultExample={model?.default_example}
              modelId={model?.name ?? ""}
            />
          </ModelProvider>
        ) : activeBtn === "API" ? (
          <API />
        ) : (
          <Info />
        )}
      </div>
    </ScrollArea>
  );
};

export default ModelDetailPage;
