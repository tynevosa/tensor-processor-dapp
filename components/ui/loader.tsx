import React from "react";
import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";
import { ModelInfoType } from "@/types/type";

type Props = {
  isPending: string;
  modelDatas: ModelInfoType[];
};

export const Loader = ({ isPending, modelDatas }: Props) => {
  return (
    <div
      className={cn("flex justify-center items-center  mt-10", {
        "mt-[20%]": modelDatas.length === 0,
      })}
    >
      {isPending === "fetching" && <Spinner />}
    </div>
  );
};
