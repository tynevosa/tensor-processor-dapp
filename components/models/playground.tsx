"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { ChevronDownIcon } from "lucide-react";
import { useParam } from "@/components/contexts/param-context";

// type
import { InputType, NumImagesTypes, StyleType } from "@/types/type";

// components
import { Slider } from "@/components/ui/slider";
import { SelectGroup, SelectTrigger } from "@radix-ui/react-select";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { StyleTypes, NumImages } from "@/constants/constant";
import WebcamComponent from "@/components/ui/web-camera";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Spinner } from "../ui/spinner";

type Props = {
  defaultInput: InputType;
  defaultOutput: string[];
  model: string;
};

const Playground: FC<Props> = ({ defaultInput, model, defaultOutput }) => {
  const [input, setInput] = React.useState<InputType>(defaultInput);
  const [output, setOutput] = React.useState<string[]>(defaultOutput);

  const mutation = useMutation({
    mutationFn: (input: any) => {
      return axios.post("/api/prediction", input);
    },
    onSuccess: (data) => {
      setOutput(data.data as string[]);
    },
  });

  const predictModel = () => {
    mutation.mutate({ model, input });
  };

  return (
    <>
      <div className="flex mt-5 md:flex-row flex-col w-full gap-6">
        <div className="md:w-6/12 w-full flex flex-col gap-5">
          <h3 className="font-bold text-2xl text-white">Input</h3>
          <div className="flex justify-center flex-col gap-7 mt-3 lg:pr-[82px] pr-0">
            <div className="flex-col flex gap-6 w-full">
              <div className="flex flex-col w-full items-stretch gap-3">
                <span className="text-lg text-white">
                  T Propmt
                  <span className="italic text-[#51586C]">&nbsp;string</span>
                </span>
                <Input
                  className="!ring-0 !ring-offset-0 !outline-none"
                  value={input.prompt}
                  placeholder={defaultInput.prompt}
                  onChange={(e) =>
                    setInput({ ...input, prompt: e.target.value })
                  }
                />
                <span className="text-gray-400 text-lg">
                  Default: “a panda”
                </span>
              </div>

              <div className="flex flex-col w-full items-stretch gap-3">
                <span className="text-lg text-white">
                  T negative_propmt
                  <span className="italic text-[#51586C]">&nbsp;string</span>
                </span>
                <Input
                  className="!ring-0 !ring-offset-0 !outline-none"
                  value={input.negative_prompt}
                  placeholder={defaultInput.negative_prompt}
                  onChange={(e) =>
                    setInput({ ...input, negative_prompt: e.target.value })
                  }
                />
                <span className="text-gray-400 text-lg">
                  Things you do not want in the image
                </span>
              </div>

              <div className="flex flex-col w-full items-stretch gap-3">
                <span className="text-lg text-white">
                  # width
                  <span className="italic text-[#51586C]">&nbsp;integer</span>
                </span>
                <Input
                  className="!ring-0 !ring-offset-0 !outline-none"
                  type="number"
                  placeholder={defaultInput.width?.toString()}
                  value={input.width}
                  onChange={(e) =>
                    setInput({ ...input, width: parseInt(e.target.value) })
                  }
                />
                <span className="text-gray-400 text-lg">
                  Width of output image. Recommended 1024 or 1280
                </span>
              </div>

              <div className="flex flex-col w-full items-stretch gap-3">
                <span className="text-lg text-white">
                  # height
                  <span className="italic text-[#51586C]">&nbsp;integer</span>
                </span>
                <Input
                  className="!ring-0 !ring-offset-0 !outline-none"
                  type="number"
                  value={input.height}
                  placeholder={defaultInput.height?.toString()}
                  onChange={(e) =>
                    setInput({ ...input, height: parseInt(e.target.value) })
                  }
                />
                <span className="text-gray-400 text-lg">
                  Height of output image. Recommended 1024 or 1280
                </span>
              </div>
              <div className="flex flex-col w-full items-stretch gap-3">
                <div className="flex flex-col justify-between lg:flex-row">
                  <span className="text-lg text-white">
                    # num_outputs
                    <span className="italic text-[#51586C]">&nbsp;integer</span>
                  </span>
                  <span className="text-lg text-gray-400 mt-2 lg:mt-0">
                    [minimum:1, maximum:4]
                  </span>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div className="w-10/12">
                    <Slider
                      defaultValue={[defaultInput.num_outputs ?? 1]}
                      max={4}
                      min={1}
                      step={1}
                      className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
                      onValueChange={(value) =>
                        setInput({ ...input, num_outputs: value[0] })
                      }
                    />
                  </div>
                  <span className="text-white w-2/12 py-2 px-2 border border-[#242835] bg-[#121218] text-center rounded">{`${input.num_outputs}`}</span>
                </div>
              </div>
              <div className="flex flex-col w-full items-stretch gap-3">
                <span className="text-lg text-white">
                  # scheduler
                  <span className="italic text-[#51586C]">&nbsp;string</span>
                </span>
                <Select
                  defaultValue={defaultInput.scheduler ?? "DDIM"}
                  onValueChange={(value) =>
                    setInput({ ...input, scheduler: StyleTypes[value] })
                  }
                >
                  <SelectTrigger className="bg-[#121218] border border-[#242835] p-3 rounded-sm text-white font-semibold text-base flex justify-between items-center focus:!ring-0 focus-visible:!ring-0 outline-none h-14">
                    <SelectValue className="w-full !px-3 !py-3">
                      <span className="w-full flex">
                        {input.scheduler ?? defaultInput.scheduler}
                      </span>
                    </SelectValue>
                    <ChevronDownIcon size={17} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121218] border border-[#242835]">
                    <SelectGroup className="w-full">
                      {Object.keys(StyleTypes).map((key, index) => (
                        <SelectItem
                          value={key}
                          key={index}
                          className="rounded-sm text-white font-semibold text-base"
                        >
                          {StyleTypes[key as StyleType]}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <span className="text-gray-400 text-lg">scheduler</span>
              </div>
              <div className="flex flex-col w-full items-stretch gap-3">
                <div className="flex flex-col justify-between lg:flex-row">
                  <span className="text-lg text-white">
                    Number of inference steps
                    <span className="italic text-[#51586C]">&nbsp;number</span>
                  </span>
                  <span className="text-lg text-gray-400 mt-2 lg:mt-0">
                    [minimum:1, maximum:10]
                  </span>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div className="w-10/12">
                    <Slider
                      defaultValue={[defaultInput.num_inference_steps ?? 1]}
                      max={10}
                      min={1}
                      step={1}
                      className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
                      onValueChange={(value) =>
                        setInput({ ...input, num_inference_steps: value[0] })
                      }
                    />
                  </div>
                  <span className="text-white w-2/12 py-2 px-2 border border-[#242835] bg-[#121218] text-center rounded">{`${input.num_inference_steps}`}</span>
                </div>
              </div>
              <div className="flex flex-col w-full items-stretch gap-3">
                <div className="flex flex-col justify-between lg:flex-row">
                  <span className="text-lg text-white">
                    Guidence scale
                    <span className="italic text-[#51586C]">&nbsp;number</span>
                  </span>
                  <span className="text-lg text-gray-400 mt-2 lg:mt-0">
                    [minimum:1, maximum:50]
                  </span>
                </div>
                <div className="flex flex-row items-center gap-4 ">
                  <div className="w-10/12">
                    <Slider
                      defaultValue={[defaultInput.guidance_scale ?? 1]}
                      max={50}
                      min={1}
                      step={1}
                      className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
                      onValueChange={(value) =>
                        setInput({ ...input, guidance_scale: value[0] })
                      }
                    />
                  </div>
                  <span className="text-white w-2/12 py-2 px-2 border border-[#242835] bg-[#121218] text-center rounded">{`${input.guidance_scale}`}</span>
                </div>
              </div>
              <div className="flex flex-col w-full items-stretch gap-3 mt-5">
                <div className="flex flex-row gap-5 justify-start">
                  <button className="bg-white text-black md:text-lg text-base md:px-10 px-5 md:py-3 rounded-sm font-semibold">
                    Reset
                  </button>
                  <button
                    className="bg-[#97AEF3] text-white md:text-lg text-base md:px-11 px-4 py-3 rounded-sm font-semibold"
                    onClick={predictModel}
                  >
                    Run
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-6/12 w-full">
          <h3 className="font-bold text-2xl text-white">Output</h3>
          <div className="flex flex-col">
            <div className="mt-10">
              <div
                className="flex border-gray-800 rounded-sm"
                style={{ borderWidth: "7px" }}
              >
                {mutation.isPending ? (
                  <div className="relative w-full h-[344px]">
                    <div
                      className="w-full h-full opacity-20 transition-all transition-duration-500"
                      style={{
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundImage: `url(${output[0]})`,
                      }}
                    ></div>
                    <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
                      <Spinner />
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-full"
                    style={{
                      height: "344px",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundImage: `url(${output[0]})`,
                    }}
                  ></div>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-5">
              <p className="text-lg text-gray-400 my-3 font-semibold">
                Generated in 23.0 seconds
              </p>
              <button className="rounded-sm px-2 py-2 flex flex-row items-center gap-1 bg-gray-600">
                <Image
                  src="/images/model/download.svg"
                  width={20}
                  height={20}
                  alt="setting"
                />
                <span className="text-base text-white hidden lg:flex">
                  Download
                </span>
              </button>
            </div>
          </div>
        </div>
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
          <h3 className="font-bold text-2xl text-white">Info</h3>
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
    </>
  );
};

export default Playground;
