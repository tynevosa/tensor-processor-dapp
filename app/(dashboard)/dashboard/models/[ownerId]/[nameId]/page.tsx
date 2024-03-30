"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModelInfoType } from "@/types/type";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CopyBlock, atomOneDark } from "react-code-blocks";

type Props = {
  params: {
    nameId: string;
    ownerId: string;
  };
};

const languages = [
  {
    name: "Python",
    value: "python",
  },
  {
    name: "Javascript",
    value: "javascript",
  },
  {
    name: "cURL",
    value: "curl",
  },
];

const code = `
import Tensor processor
             
output = tpu.run("tpu-img-to-vid/sdxl:39ed",
input={})

print(output)`;

const ModelDetailPage = ({ params }: Props) => {
  const router = useRouter();
  const [activeLang, setActiveLang] = React.useState(languages[0]?.value);
  const [prompt, setPrompt] = React.useState("");
  const [replica, setReplica] = React.useState<string>("");
  const { ownerId, nameId } = params;
  const [model, setModel] = React.useState<ModelInfoType | null>(null);

  const predictModel = async () => {
    if (!model) return null;
    console.log(model);
    const modelId =
      model.owner + "/" + model.name + ":" + model.latest_version.id;
    console.log(modelId);

    const response = await fetch("/api/prediction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelId as string,
        input: JSON.parse(prompt),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.length) setReplica(data[0] as string);
    }
  };

  const getModel = async () => {
    const response = await fetch(`/api/model/${ownerId}/${nameId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setModel(data as ModelInfoType);
    }
  };

  const generateCodeSample = () => {
    const code = `
import Tensor processor
             
output = tpu.run("${model?.owner}/${model?.name}:${model?.latest_version.id}",
input=${JSON.stringify(model?.default_example.input)})

print(output)`;

    return code;
  };

  useEffect(() => {
    getModel();
  }, []);

  if (!model) return null;

  return (
    <ScrollArea className="w-full h-full pr-5">
      <div className="flex flex-col px-6 py-12">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <div className="bg-[#97AEF31A] p-2 rounded-full size-10">
            <ArrowLeft color="#97AEF3" />
          </div>
          <span className="font-[600] text-white text-xl">Back</span>
        </button>
        {/* Prompt Section */}
        <div className="flex justify-center w-full max-w-full">
          <div className="flex flex-col gap-4 mt-10 w-3/4 max-w-3/4">
            <div className="flex justify-between items-center bg-[#151C2B] p-2 rounded-[8px]">
              <input
                type="text"
                className="flex-1 border-0 bg-transparent mx-4 font-[500] text-lg text-nowrap text-white outline-none"
                value={prompt}
                placeholder="Write input here..."
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button
                className="bg-[#97AEF3] hover:bg-[#97AEF3] px-9 py-4 font-[600] text-black text-lg"
                disabled={!model}
                onClick={predictModel}
              >
                Run model
              </Button>
            </div>
            {/* Code Section */}
            <div className="flex flex-col bg-[#0B0B0E] rounded-[8px] border border-[#242835] max-w-full w-full">
              <div className="flex gap-4 px-4 py-[14px] border-b border-b-[#242835]">
                {languages?.map((language) => (
                  <Button
                    className={`${
                      activeLang === language?.value
                        ? "bg-[#97AEF3] text-black font-[600]"
                        : "bg-transparent text-[#7782A4] font-[500]"
                    } hover:text-black hover:bg-[#97AEF3] py-4 text-lg`}
                    key={language?.value}
                    onClick={() => setActiveLang(language?.value)}
                  >
                    {language?.name}
                  </Button>
                ))}
              </div>
              <div className="flex gap-4 px-4 py-[14px] max-w-full w-full">
                <CopyBlock
                  text={generateCodeSample()}
                  language={activeLang}
                  customStyle={{
                    padding: "12px",
                    width: "100%",
                    maxWidth: "100%",
                  }}
                  codeBlock={true}
                  codeContainerStyle={{
                    width: "100%",
                    maxWidth: "100%",
                  }}
                  theme={atomOneDark}
                  showLineNumbers={false}
                  wrapLongLines={true}
                />
              </div>
            </div>
            {/* Output Section */}
            <div className="flex justify-center bg-[#121218] p-2 rounded-[8px] w-full">
              <img
                src={
                  replica === ""
                    ? model
                      ? model.cover_image_url
                      : "/images/default-output.png"
                    : replica
                }
                alt="default-image"
                width={300}
                height={300}
                className="rounded-[4px] w-full h-[263px] object-contain"
              />
            </div>
            <Button className="bg-[#D9E3FF] hover:bg-[#D9E3FF] px-9 py-4 w-full font-[600] text-black text-lg">
              Run lucatso / xtts-v2 with an API
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ModelDetailPage;
