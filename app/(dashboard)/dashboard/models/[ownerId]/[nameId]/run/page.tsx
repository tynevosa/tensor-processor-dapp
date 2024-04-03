"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ModelInfoType } from "@/types/type";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectTrigger } from "@radix-ui/react-select";

import { ChevronDownIcon } from "lucide-react";
import { StyleTypes } from "@/constants/constant";
import type { StyleType } from "@/types/type";

import { useParam } from "@/components/contexts/param-context";

const buttonTab = [
  { name: "Playground", url: "/images/model/play.svg" },
  { name: "API", url: "/images/model/api.svg" },
  { name: "Examples", url: "/images/model/file-01.svg" },
  { name: "README", url: "/images/model/google-doc.svg" },
  { name: "Versions", url: "/images/model/cloud-loading.svg" },
];

const outputBtn = [
  { name: "Tweeks it", url: "/images/model/settings.svg" },
  { name: "Share", url: "/images/model/share.svg" },
  { name: "Download", url: "/images/model/download.svg" },
  { name: "Report", url: "/images/model/report.svg" },
];

const viewModels = [
  { name: "model01", url: "/images/model01.png" },
  { name: "model02", url: "/images/model02.png" },
  { name: "model03", url: "/images/model03.png" },
  { name: "model04", url: "/images/model04.png" },
  { name: "model05", url: "/images/model05.png" },
  { name: "model06", url: "/images/model06.png" },
];

const inputTab = [
  { name: "Form", value: "form" },
  { name: "Node.js", value: "node.js" },
  { name: "Python", value: "python" },
  { name: "Elixir", value: "elixir" },
  { name: "HTTP", value: "http" },
  { name: "Cog", value: "cog" },
  { name: "Docker", value: "docker" },
];

const ouputTab = [
  { name: "Preview", value: "preview" },
  { name: "Json", value: "json" },
];

type Props = {
  params: {
    nameId: string;
    ownerId: string;
  };
};

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

const RunPage = ({ params }: Props) => {
  const [activeBtn, setActiveBtn] = useState(buttonTab[0]?.name);
  const [activeInput, setActiveInput] = useState(inputTab[0]?.name);
  const [activeOuput, setActiveOuput] = useState(ouputTab[0]?.name);
  const [replica, setReplica] = React.useState<string | JSON>("");
  const [model, setModel] = React.useState<ModelInfoType | null>(null);
  const [prompt, setPrompt] = React.useState("");
  const { ownerId, nameId } = params;
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

  const { param, setParam } = useParam();

  const { type, prompt_str, control_dep_str } = param;

  const updateParam = (key: string, value: any) => {
    setParam({ ...param, [key]: value });
  };

  useEffect(() => {
    getModel();
  }, [getModel]);

  if (!model) return null;

  return (
    <ScrollArea className="h-full w-full">
      <div className="container mx-auto px-12 py-12 w-full h-full gap-10 flex flex-col">
        <div className="flex flex-row md:justify-between justify-center items-start">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl text-white">
              tpu/ panda-multiverse
            </h1>
            <p className="text-white text-lg">
              Turn an animal image to a cyberspaced kin.
            </p>
            <div className="flex flex-row items-center gap-4">
              <span className="text-[#97AEF3] px-3 py-1.5 bg-[#97AEF31A] rounded-full">
                Public
              </span>
              <span className="text-[#97AEF3] px-3 py-1.5 bg-[#97AEF31A] rounded-full">
                50K runs
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-6">
            <Link href={"github"} className="flex flex-row gap-2">
              <Image
                src={"/images/model/github.svg"}
                alt="court"
                width={24}
                height={24}
              />
              <span className="text-[#97AEF3] text-lg">Github</span>
            </Link>
            <Link href={"license"} className="flex flex-row gap-2">
              <Image
                src={"/images/model/court-law.svg"}
                alt="court"
                width={24}
                height={24}
              />
              <span className="text-[#97AEF3] text-lg">License</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-row mb-3 mt-10 border-b pb-5 border-gray-800 gap-6">
          {buttonTab.map((item, index) => (
            <button
              className={`${
                activeBtn === item?.name
                  ? "bg-[#97AEF3] text-black font-[600]"
                  : "bg-transparent text-white  font-[100]"
              } sm:text-lg gap-2 text-sm flex flex-row items-center rounded-sm px-2 py-2`}
              key={item?.name}
              onClick={() => setActiveBtn(item?.name)}
            >
              <Image
                src={item.url}
                width={20}
                height={30}
                style={{
                  width: "auto",
                  height: "auto",
                  filter:
                    activeBtn === item?.name
                      ? "invert(100%) saturate(10000%)"
                      : "saturate(0%)",
                }}
                color="black"
                className="ml-1"
                alt="profile"
                priority
              />
              {item.name}
            </button>
          ))}
        </div>
        <div className="flex mt-8 flex-col w-6/12 gap-6">
          <h3 className="font-bold text-2xl text-white">Input</h3>
          <div className="flex justify-center flex-col gap-7">
            <div className="flex flew-row border-b border-gray-800 gap-2">
              {inputTab.map((item, index) => (
                <button
                  className={`${
                    activeInput === item?.name
                      ? "border-b-2 border-[#97AEF3] text-[#97AEF3] font-[600]"
                      : "bg-transparent text-white  font-[100]"
                  } sm:text-lg gap-2 text-sm flex flex-row items-center mr-4 px-2 py-2`}
                  key={item?.name}
                  onClick={() => setActiveInput(item?.name)}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="flex flex-col">
              {!(isJson(JSON.stringify(replica)) && replica !== "") && (
                <>
                  <div
                    className="flex border-gray-800 rounded-sm"
                    style={{ borderWidth: "7px" }}
                  >
                    <div
                      style={{
                        width: "638px",
                        height: "344px",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundImage: `url(${
                          typeof replica === "string" && replica === ""
                            ? model
                              ? model.cover_image_url
                              : "/images/default-output.png"
                            : replica
                        })`,
                      }}
                    ></div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex-col flex gap-6">
            <button className="text-white flex flex-row items-center gap-2">
              <Image
                src={"/images/model/file-01.svg"}
                alt="images"
                width={20}
                height={20}
              />
              <span>
                IMAGE&nbsp;{" "}
                <span className="italic text-gray-800 text-lg">file</span>
              </span>
            </button>
            <div className="w-[566px] h-[92px] bg-[#0B0B0E] border-2 border-[#242835] border-dotted"></div>
            <div className="w-[566px] h-[72px] bg-[#0B0B0E] border-2 border-[#242835] border-dotted"></div>
            <p className="text-lg text-gray-400">
              An image of an animal to be converted
            </p>

            <div className="flex flex-col w-[566px] items-stretch gap-3">
              <span className="text-lg text-white">
                Aa Style
                <span className="italic text-gray-800">&nbsp;string</span>
              </span>
              <Select
                defaultValue={type}
                onValueChange={(value) =>
                  updateParam("type", value as StyleType)
                }
              >
                <SelectTrigger className="bg-[#121218] border border-[#242835] py-3 px-4 rounded-sm text-white font-semibold text-base flex justify-between items-center focus:!ring-0 focus-visible:!ring-0 outline-none">
                  <SelectValue className="w-full">
                    <span className="w-full flex">{StyleTypes[type]}</span>
                  </SelectValue>
                  <ChevronDownIcon size={17} />
                </SelectTrigger>
                <SelectContent className="bg-[#121218] border border-[#242835]">
                  <SelectGroup className="w-full">
                    {Object.keys(StyleTypes).map((key, index) => (
                      <SelectItem
                        value={key}
                        key={index}
                        className="py-2 px-3 rounded-sm text-white font-semibold text-base"
                      >
                        {StyleTypes[key as StyleType]}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <span className="text-gray-400 text-lg">Style to convert to</span>
            </div>

            <div className="flex flex-col w-[566px] items-stretch gap-3">
              <span className="text-lg text-white">
                T Propmt
                <span className="italic text-gray-800">&nbsp;string</span>
              </span>
              <input
                type="text"
                className="border border-[#242835] bg-[#121218] px-5 py-2 font-[500] text-lg text-nowrap text-white outline-none w-full rounded-sm"
                value={prompt}
                placeholder="an animal in a galactical wave"
                onChange={(e) => setPrompt(e.target.value)}
              />
              <span className="text-gray-400 text-lg">Default: “a panda”</span>
            </div>

            <div className="flex flex-col w-[566px] items-stretch gap-3">
              <span className="text-lg text-white">
                T negative_propmt
                <span className="italic text-gray-800">&nbsp;string</span>
              </span>
              <input
                type="text"
                className="border border-[#242835] bg-[#121218] px-5 py-2 font-[500] text-lg text-nowrap text-white outline-none w-full rounded-sm"
                value={prompt}
                placeholder=""
                onChange={(e) => setPrompt(e.target.value)}
              />
              <span className="text-gray-400 text-lg">
                Things you do not want in the image
              </span>
            </div>
            <div className="flex flex-col w-[566px] items-stretch gap-3">
              <div className="flex flex-row justify-between">
                <span className="text-lg text-white">
                  # prompt_strength
                  <span className="italic text-gray-800">&nbsp;number</span>
                </span>
                <span className="text-lg text-gray-400">
                  [minimum:0, maximum:1]
                </span>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="w-10/12">
                  <Slider
                    defaultValue={[prompt_str]}
                    max={1}
                    min={0}
                    step={0.01}
                    className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
                    onValueChange={(value) =>
                      updateParam("prompt_str", value[0])
                    }
                  />
                </div>
                <span className="text-white w-2/12 py-2 px-2 border border-[#242835] bg-[#121218] text-center">{`${prompt_str}`}</span>
              </div>
              <span className="text-gray-400 text-lg">
                Strength of the prompt. This is the CFG scale, higher numbers
                lead to stronger prompt, lower numbers will keep more of a
                likeness to the orgiinal.
              </span>
            </div>
            <div className="flex flex-col w-[566px] items-stretch gap-3">
              <div className="flex flex-row justify-between">
                <span className="text-lg text-white">
                  # control_depth_strength
                  <span className="italic text-gray-800">&nbsp;number</span>
                </span>
                <span className="text-lg text-gray-400">
                  [minimum:0, maximum:1]
                </span>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="w-10/12">
                  <Slider
                    defaultValue={[control_dep_str]}
                    max={1}
                    min={0}
                    step={0.01}
                    className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
                    onValueChange={(value) =>
                      updateParam("control_dep_str", value[0])
                    }
                  />
                </div>
                <span className="text-white w-2/12 py-2 px-2 border border-[#242835] bg-[#121218] text-center">{`${control_dep_str}`}</span>
              </div>
              <span className="text-gray-400 text-lg">
                Strength of the prompt. This is the CFG scale, higher numbers
                lead to stronger prompt, lower numbers will keep more of a
                likeness to the orgiinal.
              </span>
            </div>
            <div className="flex flex-col w-[566px] items-stretch gap-3">
              <span className="text-lg text-white">
                # seed
                <span className="italic text-gray-800">&nbsp;integer</span>
              </span>
              <input
                type="text"
                className="border border-[#242835] bg-[#121218] px-5 py-2 font-[500] text-lg text-nowrap text-white outline-none w-full rounded-sm"
                value={prompt}
                placeholder=""
                onChange={(e) => setPrompt(e.target.value)}
              />
              <span className="text-gray-400 text-lg">
                FIx the random seed for reproducibility
              </span>
            </div>
            <div className="flex flex-col w-[566px] items-stretch gap-3 mt-5">
              <div className="flex flex-row gap-5 justify-end">
                <button className="bg-white text-black text-lg px-10 py-3 rounded-sm font-semibold">
                  Reset
                </button>
                <button className="bg-[#97AEF3] text-white text-lg px-11 py-3 rounded-sm font-semibold">
                  Run
                </button>
              </div>
            </div>
            <div className="flex flew-row border-b border-gray-800 gap-2">
              {ouputTab.map((item, index) => (
                <button
                  className={`${
                    activeOuput === item?.name
                      ? "border-b-2 border-[#97AEF3] text-[#97AEF3] font-[600]"
                      : "bg-transparent text-white  font-[100]"
                  } sm:text-lg gap-2 text-sm flex flex-row items-center mr-4 px-2 py-2`}
                  key={item?.name}
                  onClick={() => setActiveOuput(item?.name)}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {!(isJson(JSON.stringify(replica)) && replica !== "") && (
                <>
                  <div
                    className="flex border-gray-800 rounded-sm"
                    style={{ borderWidth: "7px" }}
                  >
                    <div
                      style={{
                        width: "638px",
                        height: "344px",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundImage: `url(${
                          typeof replica === "string" && replica === ""
                            ? model
                              ? model.cover_image_url
                              : "/images/default-output.png"
                            : replica
                        })`,
                      }}
                    ></div>
                  </div>
                </>
              )}
              <p className="text-lg text-gray-400 font-semibold">
                Generated in 23.0 seconds
              </p>
            </div>
            <div className="flex flex-row items-center gap-4">
              {outputBtn.map((item, index) => (
                <button
                  key={index}
                  className="rounded-sm px-4 py-2 flex flex-row items-center gap-3 border border-[#97AEF3]"
                >
                  <Image src={item.url} width={20} height={20} alt="setting" />
                  <span className="text-lg text-white">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mt-8 border-b border-gray-800 pb-5">
          <h3 className="font-bold text-2xl text-white">Examples</h3>
          <div className="flex flex-row gap-2">
            <span className="text-lg text-[#97AEF3]">View more examples</span>
            <button>
              <Image
                src={"/images/model/clipboard.svg"}
                width={20}
                height={20}
                alt="clipboard"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-row w-full gap-4">
          {viewModels.map((item, index) => (
            <div className="w-2/12" key={index}>
              <Image
                src={item.url}
                width={100}
                height={100}
                style={{ width: "100%" }}
                alt={item.name}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center mt-8 border-b border-gray-800 pb-5 gap-3">
            <h3 className="font-bold text-2xl text-white">Run time and cost</h3>
          </div>
          <p className="text-lg text-gray-400">
            This model runs on Nvidia A40 (Large) GPU hardware. Predictions
            typically complete within 31 seconds.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center mt-8 border-b border-gray-800 pb-5 gap-3">
            <h3 className="font-bold text-2xl text-white">Readme</h3>
          </div>
          <p className="text-lg text-gray-400">
            Non-commercial use only.
            <br />
            <br />
            It uses the following weights which are non-commercial:
            <br />
            InsightFace antelopev2 (which is used by InstantID)
          </p>
        </div>
      </div>
    </ScrollArea>
  );
};

export default RunPage;
