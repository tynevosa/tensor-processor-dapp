"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModelInfoType } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

export default function Page() {
  const [page, setPage] = useState(1);
  const [modelDatas, setModelDatas] = useState<ModelInfoType[]>([]);

  const { ref, inView } = useInView();

  const {
    data: modelPage,
    fetchStatus: isPending,
    error,
  } = useQuery({
    queryKey: ["models-list", page],
    queryFn: () =>
      axios
        .post(
          "/api/model/list",
          {
            page: page,
            count: 15,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data),
  });

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (modelPage?.length > 0) {
      setModelDatas((prev) => [...prev, ...modelPage]);
    }
  }, [modelPage]);

  if (error) return "An error has occurred: " + error.message;

  return (
    <ScrollArea className="w-full h-full">
      <div className="container px-1 py-12 w-full h-full">
        <h1 className="font-bold text-3xl text-white lg:ml-6 ml-10">
          My Playground
        </h1>
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-6 px-10 lg:px-6">
          {modelDatas.map(
            (
              {
                cover_image_url = "/images/model.svg",
                description,
                name,
                owner,
                run_count,
              },
              index
            ) => {
              if (index + 1 === modelDatas.length)
                return (
                  <Link
                    href={`/dashboard/models/${owner}/${name}`}
                    key={index}
                    ref={ref}
                    className="flex gap-4 bg-[#121218] p-2 rounded-[8px]"
                  >
                    <div className="w-40 h-40 min-w-40  relative">
                      <Image
                        alt="model"
                        src={cover_image_url ?? "/images/model.svg"}
                        className="h-full absolute w-full"
                        width={500}
                        height={500}
                        priority
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
                        <div className="font-[400] text-sm text-white max-h-10 overflow-hidden text-ellipsis">
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
                );
              else
                return (
                  <Link
                    href={`/dashboard/models/${owner}/${name}`}
                    key={index}
                    className="flex gap-4 bg-[#121218] p-2 rounded-[8px]"
                  >
                    <div className="w-40 h-40 min-w-40  relative">
                      <Image
                        alt="model"
                        src={cover_image_url ?? "/images/model.svg"}
                        className="h-full absolute w-full"
                        width={500}
                        height={500}
                        priority
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
                        <div className="font-[400] text-sm text-white max-h-10 overflow-hidden text-ellipsis">
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
                );
            }
          )}
        </div>
        <div
          className={cn("flex justify-center items-center  mt-10", {
            "mt-[20%]": modelDatas.length === 0,
          })}
        >
          {isPending && <Spinner />}
        </div>
      </div>
    </ScrollArea>
  );
}
