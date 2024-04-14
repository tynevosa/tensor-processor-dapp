"use client";

import axios from "axios";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useModel } from "../contexts/model-context";
import OutputComponent from "./components/output";
import { InputComponent } from "./components/input";

type Props = {
  defaultExample: any;
  modelId: string;
  schema: any;
};

export const Playground: FC<Props> = ({ schema, defaultExample, modelId }) => {
  const { model, input, setModel, setInput } = useModel();
  const [inputSchema, setInputSchema] = useState<any[]>([]);
  const [output, setOutput] = useState<string>("");
  const [time, setTime] = useState<number>(
    defaultExample["metrics"]["predict_time"].toFixed(2)
  );

  const normalize = (value: any, key: string) => {
    return { key: key, ...value };
  };

  useEffect(() => {
    const renderedInputs = Array.from(schema["Input"]["rendered"]);
    const validInputs = schema["Input"]["properties"];
    const origin = renderedInputs.map((item, key) => {
      const propertyName = item as string;
      const type = validInputs[propertyName]["type"];

      if (type) {
        const format = validInputs[propertyName]["format"];
        const max = validInputs[propertyName]["maximum"];
        // File Type
        if (type === "string" && format === "uri") {
          const { type, ...rest } = validInputs[propertyName];
          return normalize({ type: "file", ...rest }, propertyName);
        }
        // Slider Type
        if (type === "number" && max === "maximum") {
          const { type, ...rest } = validInputs[propertyName];
          return normalize(
            {
              type: "slider",
              ...rest,
            },
            propertyName
          );
        }
        return normalize(validInputs[propertyName], propertyName);
      }

      const { allOf, ...rest } = validInputs[propertyName];
      const ref = validInputs[propertyName]["allOf"][0]["$ref"] as string;
      const refProperty = ref.split("/").reverse().at(0) as string;
      const options = schema[refProperty]["enum"];
      const title = schema[refProperty]["title"];

      return normalize({ ...rest, options, title, type: "enum" }, propertyName);
    });

    let defaultValue = {};

    Object.keys(validInputs).map((item) => {
      const key = item as string;
      if (validInputs[key]["default"] != undefined)
        defaultValue = { ...defaultValue, [key]: validInputs[key]["default"] };
    });
    setInput(defaultValue);
    setInputSchema(origin);
    setModel(modelId);
    return () => {
      setInput({});
      setModel("");
      setInputSchema([]);
      setOutput("");
      setTime(defaultExample["metrics"]["predict_time"].toFixed(2));
    };
  }, [schema, modelId, defaultExample, setInput, setModel, setTime]);

  const outputTypeValidate = useCallback(
    (output: any) => {
      const outputType = schema["Output"]["type"];
      if (outputType) {
        if (outputType === "array") setOutput(output[0]);
        if (outputType === "string") setOutput(output);
      } else {
        setOutput(output ?? Object.values(output)[0]);
      }
    },
    [schema]
  );

  useEffect(() => {
    outputTypeValidate(defaultExample["output"]);
  }, [schema, defaultExample, outputTypeValidate]);

  const mutation = useMutation({
    mutationFn: (input: any) => axios.post("/api/prediction", input),
    onSuccess: (data) => {
      outputTypeValidate(data.data.output);
      setTime(data.data.time);
    },
  });

  const predictModel = () => mutation.mutate({ model, input });

  return (
    <>
      <div className="flex mt-5 md:flex-row flex-col w-full gap-6">
        <div className="md:w-6/12 w-full flex flex-col gap-5 overflow-y-visible">
          <h3 className="font-bold text-2xl text-white">Input</h3>
          <div className="flex justify-center flex-col gap-7 mt-3 lg:pr-[82px] pr-0">
            <div className="flex-col flex gap-6 w-full">
              <InputComponent inputSchema={inputSchema} />
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
              <OutputComponent
                time={time}
                output={output}
                isPending={mutation.isPending}
              />
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
