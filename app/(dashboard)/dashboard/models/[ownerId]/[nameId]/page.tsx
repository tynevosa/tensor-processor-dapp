"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { ModelInfoType } from "@/types/type";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import CodeBlockComponent from "@/components/ui/code-block";

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
    value: "json",
  },
];

const ModelDetailPage = ({ params }: Props) => {
  const router = useRouter();
  const [activeLang, setActiveLang] = React.useState(languages[0]?.value);
  const [prompt, setPrompt] = React.useState("");
  const [replica, setReplica] = React.useState<string | JSON>("");
  const { ownerId, nameId } = params;
  const [model, setModel] = React.useState<ModelInfoType | null>(null);
  const [isFetching, setFetching] = React.useState<boolean>(false);

  const isJson = (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const predictModel = async () => {
    if (!model) return null;
    setFetching(true);
    const modelId =
      model.owner + "/" + model.name + ":" + model.latest_version.id;

    if (isJson(prompt) === false) {
      toast({
        title: "Invalid Input",
      });
      setFetching(false);
      return;
    }

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

    if (response.status !== 200) {
      toast({
        title: "Invalid Input",
      });
    }

    if (response.ok) {
      const data = await response.json();

      if (data.length > 0 && Array.isArray(data)) setReplica(data[0] as string);
      else if (isJson(data)) setReplica(data as JSON);
      else setReplica(String(data));
    }
    setFetching(false);
  };

  const getModel = useCallback(async () => {
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
  }, [nameId, ownerId]);

  interface Model {
    owner?: string;
    name?: string;
    latest_version?: {
      id?: string;
    };
    default_example?: {
      input?: any;
    };
  }

  const generateCodeSample = (model: Model | undefined): string => {
    if (!model || !model.owner || !model.name || !model.latest_version) {
      return "";
    }

    const code: string = `
    import Tensor processor           
  
    output = tpu.run("${model.owner}/${model.name}:${model.latest_version.id}",
                     input=${JSON.stringify(model.default_example?.input)})
  
    print(output)`;
    return code;
  };

  useEffect(() => {
    getModel();
  }, [getModel]);

  if (!model) return null;

  return (
    <div className="flex flex-col px-6 py-6">
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
      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-4 mt-10 w-full lg:w-3/4">
          <div className="flex sm:flex-row flex-col justify-between items-center bg-[#151C2B] p-2 rounded-[8px]">
            <div className="w-10/12">
              <input
                type="text"
                className="flex-1 border-0 bg-transparent mx-4 font-[500] text-lg text-nowrap text-white outline-none w-full"
                value={prompt}
                placeholder="Write input here..."
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="lg:w-2/12 w-full mt-3 sm:mt-0">
              <Button
                className="bg-[#97AEF3] hover:bg-[#97AEF3] sm:px-9 py-4 sm:font-[600] text-black text-lg w-full"
                disabled={!model}
                onClick={predictModel}
              >
                {isFetching ? "Loading..." : "Run model"}
              </Button>
            </div>
          </div>
          {/* Code Section */}
          <div className="flex flex-col bg-[#0B0B0E] rounded-[8px] border border-[#242835] max-w-full w-full">
            <div className="flex sm:gap-4 px-4 py-[14px] border-b border-b-[#242835]">
              {languages?.map((language) => (
                <Button
                  className={`${
                    activeLang === language?.value
                      ? "bg-[#97AEF3] text-black font-[600]"
                      : "bg-transparent text-[#7782A4]  font-[100]"
                  } hover:text-black hover:bg-[#97AEF3] sm:py-4 px-2 py-2 sm:text-lg text-sm`}
                  key={language?.value}
                  onClick={() => setActiveLang(language?.value)}
                >
                  {language?.name}
                </Button>
              ))}
            </div>
            <div className="flex gap-4 px-4 py-[14px] !w-full">
              <ScrollArea className="w-full whitespace-nowrap rounded-sm">
                <div className="flex">
                  <CodeBlockComponent
                    code={generateCodeSample(model)}
                    language={activeLang}
                  />
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
          {/* Output Section */}
          <div className="flex justify-center bg-[#121218] p-2 rounded-[8px] w-full">
            {!(isJson(JSON.stringify(replica)) && replica !== "") && (
              <Image
                // @ts-ignore
                src={
                  typeof replica === "string" && replica === ""
                    ? model
                      ? model.cover_image_url
                      : "/images/default-output.png"
                    : replica
                }
                alt="default-image"
                width={300}
                height={300}
                priority
                className="rounded-[4px] w-full h-[263px] object-contain"
              />
            )}
            {isJson(JSON.stringify(replica)) && replica !== "" && (
              <pre className="mx-3.5 my-3 w-full max-w-full rounded-md bg-[#97AEF31A] p-4 box-border flex-shrink whitespace-pre-wrap">
                <code className="text-white">{JSON.stringify(replica)}</code>
              </pre>
            )}
          </div>
          <Button className="bg-[#D9E3FF] hover:bg-[#D9E3FF] w-full font-[600] text-black text-lg">
            Run lucatso/xtts-v2 with an API
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailPage;
