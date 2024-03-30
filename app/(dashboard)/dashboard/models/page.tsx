"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Models } from "@/constants/constant";
import { ModelInfoType, ModelType } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
  const [models, setModels] = useState<ModelInfoType[]>([]);

  const fetchModels = async () => {
    const response = await fetch("/api/model/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: 1,
        count: 50,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        console.log(data);
        setModels(data as ModelInfoType[]);
      }
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <ScrollArea className="w-full h-full">
      <div className="px-6 py-12 w-full h-full">
        <h1 className="font-bold text-3xl text-white">My Models</h1>
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-6">
          {models.map(
            (
              {
                cover_image_url = "/images/model.svg",
                description,
                name,
                owner,
                run_count,
              },
              key
            ) => (
              <Link
                href={`/dashboard/models/${owner}/${name}`}
                key={key}
                className="flex gap-4 bg-[#121218] p-2 rounded-[8px]"
              >
                <div className="w-40 h-40 min-w-40 overflow-hidden relative">
                  <img
                    alt="model"
                    src={cover_image_url ?? "/images/model.svg"}
                    className="h-full absolute w-full"
                  />
                </div>
                <div className="flex flex-col justify-between flex-shrink flex-grow w-[calc(100%-176px)]">
                  <div className="flex flex-col gap-4 items-stretch">
                    <div className="flex gap-2 max-w-full">
                      <Avatar className="rounded-none !w-5 ">
                        <AvatarImage
                          className="!w-5 !h-5 rounded-full"
                          src="/images/model-avatar.png"
                        />
                      </Avatar>
                      <h2 className="inline-block font-[600] text-sm text-white truncate flex-shrink">
                        {`${owner} / ${name}`}
                      </h2>
                    </div>
                    <div className="font-[400] text-sm text-white max-h-10 overflow-hidden">
                      {description}
                    </div>
                  </div>
                  <span className="font-[600] text-[#7D9EFF] text-sm">
                    {`${
                      run_count > 1000
                        ? (run_count / 1000).toFixed(1) + "K"
                        : run_count
                    } runs`}
                  </span>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
