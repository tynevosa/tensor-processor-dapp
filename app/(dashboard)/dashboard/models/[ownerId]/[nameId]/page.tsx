"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import CodeBlockComponent from "@/components/ui/code-block";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ModelInfoType } from "@/types/type";

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

const ModelDetailPage = ({ params }: Props) => {
  const router = useRouter();
  const [activeLang, setActiveLang] = React.useState(languages[0]?.value);
  const [prompt, setPrompt] = React.useState("");
  const [replica, setReplica] = React.useState<string | JSON>("");
  const [isFetching, setFetching] = React.useState<boolean>(false);
  const { ownerId, nameId } = params;

  const { data: model, error } = useQuery<ModelInfoType, Error>({
    queryKey: ["model-detail"],
    queryFn: () =>
      axios
        .get(`/api/model/${ownerId}/${nameId}`, {
          headers: {
            "Content-Type": "applicatoin/json",
          },
        })
        .then((res) => res.data),
  });

  const modelId =
    model?.owner + "/" + model?.name + ":" + model?.latest_version?.id;

  const { data: response } = useQuery({
    queryKey: ["model-predication"],
    queryFn: () =>
      axios
        .post(
          "/api/model/list",
          {
            model: modelId as string,
            input: JSON.parse(prompt),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data),
  });

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

    if (!isJson(prompt)) {
      toast({
        title: "Invalid Input",
      });
      setFetching(false);
      return;
    }

    try {
      const data = await response;
      if (data.length > 0 && Array.isArray(data)) setReplica(data[0] as string);
      else if (isJson(data)) setReplica(data as JSON);
      else setReplica(String(data));
    } catch (error) {
      toast({
        title: "Invalid Input",
      });
    }

    setFetching(false);
  };

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

  if (error) return "An error has occurred: " + error.message;
  if (!model) return null;

  return (
    <ScrollArea className="w-full h-full">
      <div className="container flex flex-col px-6 sm:py-6 py-2 w-full h-full">
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
          <div className="flex flex-col gap-4 sm:mt-10 mt-2 w-full lg:w-3/4">
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
              <div className="lg:w-2/12 md:w-2/12 sm:w-2/12 w-full mt-3 sm:mt-0">
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
              <div className="flex gap-4 px-4 py-[10px] !w-full">
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
                  width={200}
                  height={200}
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
            <Link href={`/dashboard/models/${ownerId}/${nameId}/run`}>
              <Button className="bg-[#D9E3FF] hover:bg-[#D9E3FF] w-full font-[600] text-black text-lg">
                Run lucatso/xtts-v2 with an API
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ModelDetailPage;