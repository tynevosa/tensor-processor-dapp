"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ChevronDownIcon } from "lucide-react";
import { useParam } from "@/components/contexts/param-context";

// type
import { ModelInfoType, StyleType } from "@/types/type";

// components
import { Slider } from "@/components/ui/slider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SelectGroup, SelectTrigger } from "@radix-ui/react-select";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  StyleTypes,
  buttonTab,
  inputTab,
  ouputTab,
  outputBtn,
  viewModels,
} from "@/constants/constant";
import WebcamComponent from "@/components/ui/web-camera";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";

type Props = {
  params: {
    nameId: string;
    ownerId: string;
  };
};

const RunPage = ({ params }: Props) => {
  const [activeBtn, setActiveBtn] = useState(buttonTab[0]?.name);
  const [activeInput, setActiveInput] = useState(inputTab[0]?.name);
  const [activeOuput, setActiveOuput] = useState(ouputTab[0]?.name);
  const [replica, setReplica] = React.useState<string | JSON>("");
  const [prompt, setPrompt] = React.useState("");
  const { ownerId, nameId } = params;
  const { param, setParam } = useParam();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setUploadedFiles(acceptedFiles);
    },
  });

  const handleDelete = (fileName: string) => {
    const updatedFiles = uploadedFiles.filter((file) => file.name !== fileName);
    setUploadedFiles(updatedFiles);
  };

  const isJson = (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const { data: model, error } = useQuery({
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

  if (error) return "An error has occurred: " + error.message;

  const { type, prompt_str, control_dep_str } = param;

  const updateParam = (key: string, value: any) => {
    setParam({ ...param, [key]: value });
  };

  if (!model) return null;
  const ModelComponents = () => {
    return (
      <>
        {!(isJson(JSON.stringify(replica)) && replica !== "") && (
          <div
            className="flex border-gray-800 rounded-sm"
            style={{ borderWidth: "7px" }}
          >
            <div
              className="w-full"
              style={{
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
        )}
      </>
    );
  };

  return (
    <ScrollArea className="h-full w-full">
      <div className="container mx-auto px-10 py-16 w-full h-full gap-10 flex flex-col">
        <div className="flex md:flex-row flex-col md:justify-between justify-center items-start">
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
          <div className="flex md:mt-0 mt-5 flex-row items-center gap-6">
            <Link href={"github"} className="flex flex-row gap-2">
              <Image
                src={"/images/model/github.svg"}
                alt="court"
                width={24}
                height={24}
                className="h-full w-full"
              />
              <span className="text-[#97AEF3] text-lg">Github</span>
            </Link>
            <Link href={"license"} className="flex flex-row gap-2">
              <Image
                src={"/images/model/court-law.svg"}
                alt="court"
                width={24}
                height={24}
                className="h-full w-full"
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
                height={20}
                className="h-full w-full ml-1"
                style={{
                  width: "auto",
                  height: "auto",
                  filter:
                    activeBtn === item?.name
                      ? "invert(100%) saturate(10000%)"
                      : "saturate(0%)",
                }}
                alt="image"
                priority
              />
              <span className="hidden md:flex">{item.name}</span>
            </button>
          ))}
        </div>
        <div className="flex mt-5 flex-col w-full gap-6">
          <div className="lg:w-[47%] w-[100%] flex flex-col">
            <h3 className="font-bold text-2xl text-white">Input</h3>
            <ScrollArea>
              <div className="flex flew-row border-b border-gray-800 gap-2 pb-3">
                {inputTab.map((item, index) => (
                  <button
                    className={`${
                      activeInput === item?.name
                        ? "border-b-2 border-[#97AEF3] text-[#97AEF3] font-[600]"
                        : "bg-transparent text-white  font-[100]"
                    } lg:text-lg gap-2 text-sm flex flex-row items-center mr-4 px-2 py-2`}
                    key={index}
                    onClick={() => setActiveInput(item?.name)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="flex flex-col mt-10">
              <ModelComponents />
            </div>
            <div className="flex justify-center flex-col gap-7 mt-16 lg:pr-[82px] pr-0">
              <div className="flex-col flex gap-6 w-full">
                <button className="text-white flex flex-row items-center gap-2">
                  <Image
                    src={"/images/model/file-w.svg"}
                    alt="images"
                    width="0"
                    height="0"
                    className="w-auto h-[20px]"
                  />
                  <span>
                    IMAGE&nbsp;{" "}
                    <span className="italic text-[#51586C] text-lg">file</span>
                  </span>
                </button>
                <div className="w-full bg-[#0B0B0E] border-2 border-[#242835] border-dotted">
                  <div
                    {...getRootProps()}
                    className="flex flex-col items-start px-3 py-3 justify-start gap-2"
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-row gap-2">
                      <Image
                        src={"/images/model/file-g.svg"}
                        alt="images"
                        width={20}
                        height={20}
                      />
                      <p className="text-[#51586C] text-lg font-semibold">
                        Drop a file or click to upload
                      </p>
                    </div>
                    <ul className="text-[#51586C] text-lg font-semibold w-full">
                      {uploadedFiles.map((file) => (
                        <li
                          key={file.name}
                          className="flex flex-row justify-between items-center gap-4"
                        >
                          {file.name}
                          <button onClick={() => handleDelete(file.name)}>
                            <Image
                              src={"/images/model/trashcan.svg"}
                              alt="images"
                              width={20}
                              height={20}
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="w-full gap-3 flex flex-col">
                  <div className="w-full py-4 bg-[#0B0B0E] border-2 border-[#242835] border-dotted flex flex-row gap-2 items-center justify-start px-5">
                    <Image
                      src={"/images/model/camera.svg"}
                      alt="images"
                      width={20}
                      height={20}
                    />
                    <WebcamComponent />
                    <p className="text-[#51586C] text-lg font-semibold">
                      Take a photo with your webcam
                    </p>
                  </div>
                  <p className="text-lg text-gray-400">
                    An image of an animal to be converted
                  </p>
                </div>

                <div className="flex flex-col w-full items-stretch gap-3">
                  <span className="text-lg text-white">
                    Aa Style
                    <span className="italic text-[#51586C]">&nbsp;string</span>
                  </span>
                  <Select
                    defaultValue={type}
                    onValueChange={(value) =>
                      updateParam("type", value as StyleType)
                    }
                  >
                    <SelectTrigger className="bg-[#121218] border border-[#242835] py-5 px-4 rounded-sm text-white font-semibold text-base flex justify-between items-center focus:!ring-0 focus-visible:!ring-0 outline-none">
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
                  <span className="text-gray-400 text-lg">
                    Style to convert to
                  </span>
                </div>

                <div className="flex flex-col w-full items-stretch gap-3">
                  <span className="text-lg text-white">
                    T Propmt
                    <span className="italic text-[#51586C]">&nbsp;string</span>
                  </span>
                  <Input
                    value={prompt}
                    placeholder="an animal in a galactical wave"
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <span className="text-gray-400 text-lg">
                    Default: “a panda”
                  </span>
                </div>
                <div></div>

                <div className="flex flex-col w-full items-stretch gap-3">
                  <span className="text-lg text-white">
                    T negative_propmt
                    <span className="italic text-[#51586C]">&nbsp;string</span>
                  </span>
                  <Input
                    value={prompt}
                    placeholder=""
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <span className="text-gray-400 text-lg">
                    Things you do not want in the image
                  </span>
                </div>
                <div className="flex flex-col w-full items-stretch gap-3">
                  <div className="flex flex-col justify-between lg:flex-row">
                    <span className="text-lg text-white">
                      # prompt_strength
                      <span className="italic text-[#51586C]">
                        &nbsp;number
                      </span>
                    </span>
                    <span className="text-lg text-gray-400 mt-2 lg:mt-0">
                      [minimum:0, maximum:1]
                    </span>
                  </div>
                  <div className="flex lg:flex-row flex-col items-center gap-4">
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
                    Strength of the prompt. This is the CFG scale, higher
                    numbers lead to stronger prompt, lower numbers will keep
                    more of a likeness to the orgiinal.
                  </span>
                </div>
                <div className="flex flex-col w-full items-stretch gap-3">
                  <div className="flex flex-col justify-between lg:flex-row">
                    <span className="text-lg text-white">
                      # control_depth_strength
                      <span className="italic text-[#51586C]">
                        &nbsp;number
                      </span>
                    </span>
                    <span className="text-lg text-gray-400 mt-2 lg:mt-0">
                      [minimum:0, maximum:1]
                    </span>
                  </div>
                  <div className="flex lg:flex-row flex-col items-center gap-4 ">
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
                    Strength of the prompt. This is the CFG scale, higher
                    numbers lead to stronger prompt, lower numbers will keep
                    more of a likeness to the orgiinal.
                  </span>
                </div>
                <div className="flex flex-col w-full items-stretch gap-3">
                  <span className="text-lg text-white">
                    # seed
                    <span className="italic text-[#51586C]">&nbsp;integer</span>
                  </span>
                  <Input
                    value={prompt}
                    placeholder=""
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <span className="text-gray-400 text-lg">
                    FIx the random seed for reproducibility
                  </span>
                </div>
                <div className="flex flex-col w-full items-stretch gap-3 mt-5">
                  <div className="flex flex-row gap-5 justify-end">
                    <button className="bg-white text-black md:text-lg text-base md:px-10 px-5 md:py-3 rounded-sm font-semibold">
                      Reset
                    </button>
                    <button className="bg-[#97AEF3] text-white md:text-lg text-base md:px-11 px-4 py-3 rounded-sm font-semibold">
                      Run
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-2xl text-white font-bold mt-5">Output</h3>
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
            <div className="flex flex-col">
              <div className="mt-10">
                <ModelComponents />
              </div>
              <p className="text-lg text-gray-400 my-3 font-semibold">
                Generated in 23.0 seconds
              </p>
            </div>
            <div className="flex flex-row items-center justify-between md:justify-start gap-4">
              {outputBtn.map((item, index) => (
                <button
                  key={index}
                  className="rounded-sm px-2 py-2 flex flex-row items-center gap-1 border border-[#97AEF3]"
                >
                  <Image src={item.url} width={20} height={20} alt="setting" />
                  <span className="text-base text-white hidden lg:flex">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center mt-8 border-b border-gray-800 pb-5 md:flex-row">
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
        <div className="flex md:flex-row flex-col justify-center items-center w-full gap-4">
          {viewModels.map((item, index) => (
            <div className="flex lg:w-2/12 w-6/12 mt-6" key={index}>
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
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center mt-8 border-b border-gray-800 pb-5 gap-3">
            <h3 className="font-bold text-2xl text-white">Run time and cost</h3>
          </div>
          <p className="text-lg text-gray-400">
            This model runs on Nvidia A40 (Large) GPU hardware. Predictions
            typically complete within 31 seconds.
          </p>
        </div>
        <div className="flex flex-col gap-4">
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
