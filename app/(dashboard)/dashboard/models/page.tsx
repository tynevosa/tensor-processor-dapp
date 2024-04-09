"use client";
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
          },
        )
        .then((res) => res.data),
  });

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);
  // console.log(isPending);

  useEffect(() => {
    if (modelPage?.length > 0) {
      setModelDatas((prev) => [...prev, ...modelPage]);
    }
  }, [modelPage]);

  if (error) return "An error has occurred: " + error.message;
  // console.log(modelDatas?.map((item) => item?.name));

  return (
    <ScrollArea className="w-full h-full">
      <div className="px-1 py-12 w-full h-full container">
        <h1 className="ml-10 lg:ml-6 font-bold text-3xl text-white">
          My Models
        </h1>
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-6 px-10 lg:px-6">
          {modelDatas.map(
            (
              {
                cover_image_url = "/images/model.svg",
                description,
                name,
                run_count,
              },
              index,
            ) => {
              return (
                <Link
                  href={`/dashboard/models/${name}`}
                  key={index}
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
                        run_count > 1000
                          ? (run_count / 1000).toFixed(1) + "K"
                          : run_count
                      } runs`}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-medium text-base text-white leading-6">
                      {name}
                    </p>
                    <p className="font-medium text-[#ffffffa9] text-sm leading-6">
                      {description}
                    </p>
                  </div>
                </Link>
              );
            },
          )}
        </div>
        <div
          className={cn("flex justify-center items-center  mt-10", {
            "mt-[20%]": modelDatas.length === 0,
          })}
        >
          {isPending === "fetching" && <Spinner />}
        </div>
      </div>
    </ScrollArea>
  );
}
