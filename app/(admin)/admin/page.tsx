"use client";

import { AddModel } from "@/components/models/add-model";
import { EditModel } from "@/components/models/edit-model";
import { ModelCard } from "@/components/models/model-card";
import { Loader } from "@/components/ui/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModelInfoType } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

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
    // queryKey: ["models-list"],
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

  useEffect(() => {
    if (modelPage?.length > 0) {
      setModelDatas(modelPage); // Append new data to existing state
    }
  }, [modelPage]);

  if (error) return "An error has occurred: " + error.message;

  return (
    <ScrollArea className="w-full h-full">
      <div className="px-1 py-12 w-full h-full container">
        <div className="flex justify-between items-center w-full">
          <h1 className="ml-10 lg:ml-6 font-bold text-3xl text-white">
            Admin Panel
          </h1>
          <AddModel page={page} />
        </div>
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-6 px-10 lg:px-6">
          {modelDatas.map((item, index) => {
            return (
              <EditModel key={index} modelData={item} page={page}>
                <div className="flex flex-col gap-4 bg-[#121218] p-4 rounded-[8px] text-left">
                  <ModelCard
                    cover_image_url={item?.cover_image_url}
                    name={item?.name}
                    description={item?.description}
                    run_count={item?.run_count}
                  />
                </div>
              </EditModel>
            );
          })}
        </div>
        <Loader isPending={isPending} modelDatas={modelDatas} />
      </div>
    </ScrollArea>
  );
}
