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
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ModelCard } from "@/components/models/model-card";

export default function AdminPage() {
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
        <div className="flex justify-between items-center w-full">
          <h1 className="ml-10 lg:ml-6 font-bold text-3xl text-white">
            Admin Panel
          </h1>
          <Button
            variant="secondary"
            className="mr-10 lg:mr-6 font-semibold text-black text-xl"
          >
            <Plus /> Add
          </Button>
        </div>
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
               <ModelCard key={index} cover_image_url={cover_image_url} name={name} description={description} run_count={run_count} />
              );
            },
          )}
        </div>
        <Loader isPending={isPending} modelDatas={modelDatas} />
      </div>
    </ScrollArea>
  );
}
