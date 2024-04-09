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

  // const {
  //   data: modelPage,
  //   fetchStatus: isPending,
  //   error,
  // } = useQuery({
  //   queryKey: ["models-list", page],
  //   queryFn: () =>
  //     axios
  //       .post(
  //         "/api/model/list",
  //         {
  //           page: page,
  //           count: 15,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => res.data),
  // });

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);
  // console.log(isPending);

  // useEffect(() => {
  //   if (modelPage?.length > 0) {
  //     setModelDatas((prev) => [...prev, ...modelPage]);
  //   }
  // }, [modelPage]);

  // if (error) return "An error has occurred: " + error.message;

  return (
    <ScrollArea className="w-full h-full">
      <div className="px-1 py-12 w-full h-full container">
        <h1 className="ml-10 lg:ml-6 font-bold text-3xl text-white">
          My Models
        </h1>
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-6 px-10 lg:px-6">
          {/* {modelDatas.map(
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
                    <div className="relative w-40 min-w-40 h-40">
                      <Image
                        alt="model"
                        src={cover_image_url ?? "/images/model.svg"}
                        onError={({currentTarget}) => currentTarget.src = "/images/model.svg"}
                        className="absolute w-full h-full"
                        width={500}
                        height={500}
                        priority
                      />
                    </div>
                    <div className="flex flex-col flex-grow flex-shrink justify-between w-[calc(100%-176px)]">
                      <div className="flex flex-col items-stretch gap-4">
                        <div className="flex gap-2 max-w-full">
                          <Avatar className="rounded-none !w-5">
                            <AvatarImage
                              className="rounded-full !w-5 !h-5"
                              src="/images/model-avatar.png"
                            />
                          </Avatar>
                          <h2 className="inline-block flex-shrink font-[600] text-sm text-white truncate">
                            {`${owner} / ${name}`}
                          </h2>
                        </div>
                        <div className="max-h-10 font-[400] text-ellipsis text-sm text-white overflow-hidden">
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
                    <div className="relative w-40 min-w-40 h-40">
                      <Image
                        alt="model"
                        src={cover_image_url ?? "/images/model.svg"}
                        onError={({currentTarget}) => currentTarget.src = "/images/model.svg"}
                        className="absolute w-full h-full"
                        width={500}
                        height={500}
                        priority
                      />
                    </div>
                    <div className="flex flex-col flex-grow flex-shrink justify-between w-[calc(100%-176px)]">
                      <div className="flex flex-col items-stretch gap-4">
                        <div className="flex gap-2 max-w-full">
                          <Avatar className="rounded-none !w-5">
                            <AvatarImage
                              className="rounded-full !w-5 !h-5"
                              src="/images/model-avatar.png"
                            />
                          </Avatar>
                          <h2 className="inline-block flex-shrink font-[600] text-sm text-white truncate">
                            {`${owner} / ${name}`}
                          </h2>
                        </div>
                        <div className="max-h-10 font-[400] text-ellipsis text-sm text-white overflow-hidden">
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
          )} */}
          <div className="flex flex-col gap-4 bg-[#121218] p-4 rounded-[8px]">
            <div className="relative overflow-hidden">
              <Image
                alt="model"
                src="/images/model.svg"
                width={400}
                height={264}
                className="rounded-md w-full h-[300px] object-cover"
                style={{
                  clipPath:
                    "polygon(64% 1%, 73% 16%, 100% 16%, 100% 100%, 0 100%, 0% 60%, 0 0)",
                }}
              />
              <p className="top-2 right-2 z-[10px] absolute font-bold text-2xl text-white leading-6">
                50k runs
              </p>
            </div>
            <div>
              <p className="font-medium text-base text-white leading-6">
                Coqui XTTS-v2: Multilingual Text To Speech Voice Cloning
              </p>
            </div>
          </div>
        </div>
        {/* <div
          className={cn("flex justify-center items-center  mt-10", {
            "mt-[20%]": modelDatas.length === 0,
          })}
        >
          {isPending === "fetching" && <Spinner />}
        </div> */}
      </div>
    </ScrollArea>
  );
}
