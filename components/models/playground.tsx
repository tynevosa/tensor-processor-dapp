"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { InputType } from "@/types/type";
import { useDropzone } from "react-dropzone";
import { Slider } from "@/components/ui/slider";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Spinner } from "../ui/spinner";
import { saveAs } from "file-saver";
import axios from "axios";
import { Switch } from "@/components/ui/switch";

type Props = {
  defaultInput: InputType;
  defaultOutput: string[];
  model: string;
  schema: any;
};

enum EInputType {
  number = "number",
  string = "string",
  select = "select",
  switch = "switch",
  slider = "slider",
  image = "image",
}

type TInputSchema = {
  type: EInputType;
  description: string;
  default?: string;
  title: string;
  xOrder: number;
  options?: string[];
  key: string;
  formatUrl?: string;
};

type TInputValue = {
  [key: string]: any;
};

const VideoComponent: React.FC<{ src: string; isPending: boolean }> = ({
  src,
  isPending,
}) => (
  <div className="h-[500px] w-full relative">
    <video
      controls
      className={`w-full h-full ${isPending ? "opacity-20" : ""}`}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    {isPending && (
      <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
        <Spinner />
      </div>
    )}
  </div>
);

const ImageComponent: React.FC<{ src: string; isPending: boolean }> = ({
  src,
  isPending,
}) => (
  <div
    className="flex border-gray-800 rounded-sm"
    style={{ borderWidth: "7px" }}
  >
    <div className="relative w-full h-[344px]">
      <div
        className={`w-full h-full transition-all transition-duration-500 ${
          isPending ? "opacity-20" : ""
        }`}
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${src})`,
        }}
      ></div>
      {isPending && (
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  </div>
);

const AudioComponent: React.FC<{ src: string; isPending: boolean }> = ({
  src,
  isPending,
}) => (
  <div className="flex justify-center items-center">
    <audio
      controls
      src={src}
      className={`${isPending ? "opacity-10" : "opacity-100"}`}
    ></audio>
    {isPending && (
      <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
        <Spinner />
      </div>
    )}
  </div>
);

export const Playground: FC<Props> = ({
  schema,
  defaultInput,
  model,
  defaultOutput,
}) => {
  const [output, setOutput] = useState<string[] | string>([]);
  const [inputSchemas, setInputSchemas] = useState<TInputSchema[]>([]);
  const [inputValue, setInputValue] = useState<TInputValue>({});
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

  const mutation = useMutation({
    mutationFn: (input: any) => {
      return axios.post("/api/prediction", input);
    },
    onSuccess: (data) => {
      setOutput(data.data as string[]);
    },
  });

  const predictModel = () => {
    mutation.mutate({ model, input: inputValue });
  };

  const saveImage = () => {
    const fileExtension =
      typeof output === "string" ? output.substring(output.length - 3) : "png";
    const fileName = `output.${fileExtension}`;
    saveAs(typeof output === "string" ? output : output[0], fileName);
  };
  const mappingSchemaToInput = async (properties: any, rendered: string[]) => {
    const filteredSchemaKeys = Object.keys(properties).filter((item) =>
      rendered.includes(item)
    );

    const tempInputSchemas: TInputSchema[] = [];
    const tempInput: Record<string, any> = {};

    for (const schemaKey of filteredSchemaKeys) {
      const schemaValue = properties[schemaKey];
      const {
        type,
        description,
        title,
        "x-order": xOrder,
        default: defaultValue,
      } = schemaValue;

      switch (type) {
        case "integer":
          const minimum = schemaValue.minimum;
          const maximum = schemaValue.maximum;
          const sliderOptions = maximum ? [minimum, maximum] : undefined;
          tempInputSchemas.push({
            type: maximum ? EInputType.slider : EInputType.number,
            description,
            title,
            xOrder,
            key: schemaKey,
            default: defaultValue,
            options: sliderOptions,
          });
          break;
        case "string":
          const formatUrl = schemaValue.format;
          tempInputSchemas.push({
            type: formatUrl ? EInputType.image : EInputType.string,
            description,
            title,
            xOrder,
            key: schemaKey,
            default: defaultValue,
            formatUrl,
          });
          break;
        case "boolean":
          tempInputSchemas.push({
            type: EInputType.switch,
            description,
            title,
            xOrder,
            key: schemaKey,
            default: defaultValue,
          });
          break;
        case undefined:
          tempInputSchemas.push({
            type: EInputType.select,
            description,
            title: schemaKey,
            xOrder,
            key: schemaKey,
            default: defaultValue,
            options: [schemaValue.enum],
          });
          break;
        default:
          break;
      }

      tempInput[schemaKey] = defaultValue;
    }

    setInputSchemas(tempInputSchemas);
    setInputValue((prev) => ({ ...prev, ...tempInput }));
  };

  useEffect(() => {
    const properties = schema?.Input?.properties ?? "";
    const rendered = schema?.Input?.rendered ?? "";
    if (properties ?? Object.keys(properties)?.length > 0) {
      mappingSchemaToInput(properties, rendered);
    }
  }, [schema]);

  useEffect(() => {
    setOutput(defaultOutput);
  }, [defaultOutput]);

  useEffect(() => {
    setInputValue(defaultInput);
  }, [defaultInput]);

  useEffect(() => {
    return () => {
      setOutput([]);
      setInputValue({});
      setInputSchemas([]);
      setUploadedFiles([]);
    };
  }, []);

  return (
    <>
      <div className="flex mt-5 md:flex-row flex-col w-full gap-6">
        <div className="md:w-6/12 w-full flex flex-col gap-5 overflow-y-visible">
          <h3 className="font-bold text-2xl text-white">Input</h3>
          <div className="flex justify-center flex-col gap-7 mt-3 lg:pr-[82px] pr-0">
            <div className="flex-col flex gap-6 w-full">
              {inputSchemas
                .sort((a, b) => a.xOrder - b.xOrder)
                .map((inputSchema, index) => {
                  switch (inputSchema.type) {
                    case "string":
                      return (
                        <div
                          className="flex flex-col w-full items-stretch gap-3"
                          key={index}
                        >
                          <span className="text-lg text-white">
                            {inputSchema.title}
                            <span className="italic text-[#51586C]">
                              &nbsp;{inputSchema.type}
                            </span>
                          </span>
                          <Input
                            className="!ring-0 !ring-offset-0 !outline-none"
                            value={inputValue[inputSchema.key] ?? ""}
                            placeholder={inputValue[inputSchema.key]}
                            onChange={(e) =>
                              setInputValue((prev) => ({
                                ...prev,
                                [inputSchema.key]: e.target.value,
                              }))
                            }
                          />
                          <span className="text-gray-400 text-lg">
                            {inputSchema.description}
                          </span>
                        </div>
                      );
                    case "number":
                      return (
                        <div
                          className="flex flex-col w-full items-stretch gap-3"
                          key={index}
                        >
                          <span className="text-lg text-white">
                            {inputSchema.title}
                            <span className="italic text-[#51586C]">
                              &nbsp;integer
                            </span>
                          </span>
                          <Input
                            className="!ring-0 !ring-offset-0 !outline-none"
                            type="number"
                            placeholder={inputSchema.default}
                            value={inputValue[inputSchema.key] ?? "0"}
                            onChange={(e) =>
                              setInputValue((prev) => ({
                                ...prev,
                                [inputSchema.key]: parseInt(e.target.value),
                              }))
                            }
                          />
                          <span className="text-gray-400 text-lg">
                            {inputSchema.description}
                          </span>
                        </div>
                      );
                    case "slider":
                      return (
                        <div
                          className="flex flex-col w-full items-stretch gap-3"
                          key={index}
                        >
                          <div className="flex flex-col justify-between lg:flex-row">
                            <span className="text-lg text-white">
                              {inputSchema.title}
                              <span className="italic text-[#51586C]">
                                &nbsp;integer
                              </span>
                            </span>
                          </div>
                          <div
                            className="flex flex-row items-center gap-4"
                            key={index}
                          >
                            <div className="w-10/12">
                              <Slider
                                defaultValue={[Number(inputSchema.default)]}
                                max={Number(
                                  inputSchema.options
                                    ? inputSchema.options[1]
                                    : "1"
                                )}
                                min={Number(
                                  inputSchema.options
                                    ? inputSchema.options[0]
                                    : "0"
                                )}
                                step={1}
                                className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
                                onValueChange={(value) =>
                                  setInputValue((prev) => ({
                                    ...prev,
                                    [inputSchema.title]: value[0],
                                  }))
                                }
                              />
                            </div>
                            <span className="text-white w-2/12 py-2 px-2 border border-[#242835] bg-[#121218] text-center rounded">{`${
                              inputValue[inputSchema.key]
                            }`}</span>
                          </div>
                        </div>
                      );
                    case "image":
                      return (
                        <div
                          className="w-full bg-[#0B0B0E] border-2 border-[#242835] border-dotted h-[92px]"
                          key={index}
                        >
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
                                  <p className="overflow-hidden text-ellipsis">
                                    {file.name.substring(0, 30) +
                                      "..." +
                                      file.name.substring(file.name.length - 8)}
                                  </p>
                                  <button
                                    onClick={() => handleDelete(file.name)}
                                  >
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
                      );
                    case "switch":
                      return (
                        <label
                          className="inline-flex items-center cursor-pointer"
                          key={index}
                        >
                          <Switch
                            name={inputSchema.title}
                            checked={inputValue[inputSchema.key] ?? "true"}
                            onCheckedChange={(event) => {
                              setInputValue((prev) => ({
                                ...prev,
                                [inputSchema.key]: !prev[inputSchema.key],
                              }));
                            }}
                          />
                          <span className="ms-3 text-base text-white font-medium dark:text-gray-300">
                            {inputSchema.title}
                          </span>
                        </label>
                      );
                    default:
                      break;
                  }
                })}

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
        <div className="md:w-6/12 w-full sticky top-10 h-full">
          <h3 className="font-bold text-2xl text-white">Output</h3>
          <div className="flex flex-col">
            <div className="mt-10">
              {typeof output === "string" ? (
                output.endsWith("mp4") ? (
                  <VideoComponent src={output} isPending={mutation.isPending} />
                ) : output.endsWith("png") ? (
                  <ImageComponent src={output} isPending={mutation.isPending} />
                ) : (
                  <AudioComponent src={output} isPending={mutation.isPending} />
                )
              ) : output[0]?.endsWith("mp4") ? (
                <VideoComponent
                  src={output[0]}
                  isPending={mutation.isPending}
                />
              ) : output[0]?.endsWith("png") ? (
                <ImageComponent
                  src={output[0]}
                  isPending={mutation.isPending}
                />
              ) : (
                <AudioComponent
                  src={output[0]}
                  isPending={mutation.isPending}
                />
              )}
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

                <span
                  className="text-base text-white hidden lg:flex"
                  onClick={saveImage}
                >
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
