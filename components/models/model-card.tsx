import { ModelInfoType } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  cover_image_url: string;
  run_count: number;
  name: string;
  description: string;
};

export const ModelCard = ({
  cover_image_url,
  run_count,
  name,
  description,
}: Props) => {
  return (
    <Link
      href={`/dashboard/models/${name}`}
      className="flex flex-col gap-4 bg-[#121218] p-4 rounded-[8px]"
    >
      <div className="relative overflow-hidden">
        {cover_image_url?.toLowerCase().endsWith(".mp4") ? (
          <video
            autoPlay
            loop
            width={400}
            height={264}
            style={{
              clipPath:
                "polygon(60% 0, 70% 16%, 100% 16%, 100% 100%, 0 100%, 0% 60%, 0 0)",
            }}
            className="rounded-md w-full h-[300px] object-cover"
          >
            <source src={cover_image_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            alt="model"
            src={cover_image_url || "/images/model.svg"}
            width={400}
            onError={({ currentTarget }) =>
              (currentTarget.src = "/images/model.svg")
            }
            height={264}
            priority
            className="rounded-md w-full h-[300px] object-cover"
            style={{
              clipPath:
                "polygon(60% 0, 70% 16%, 100% 16%, 100% 100%, 0 100%, 0% 60%, 0 0)",
            }}
          />
        )}
        <p className="top-2 right-2 z-[10px] absolute font-bold text-2xl text-white leading-6">
          {`${
            run_count > 1000 ? (run_count / 1000).toFixed(1) + "K" : run_count
          } runs`}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium text-base text-white leading-6">{name}</p>
        <p className="font-medium text-[#ffffffa9] text-sm leading-6">
          {description}
        </p>
      </div>
    </Link>
  );
};
