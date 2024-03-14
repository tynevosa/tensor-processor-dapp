"use client";

import { useParam } from "@/components/contexts/param-context";
import { ModelCard } from "@/components/marketplace/model-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  GPUNums,
  Geolocations,
  HOURS_A_DAY,
  SortOptions,
} from "@/constants/constant";
import { GPUInfoType } from "@/types/type";
import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "@/components/hooks/use-debounce";

export default function page() {
  const { param } = useParam();
  const debounce = useDebounce(param, 500);

  const [dataSource, setDataSource] = useState<GPUInfoType[]>([]);

  const fetchData = async () => {
    const host = process.env.NEXT_PUBLIC_SERVER_URL;

    const query = {
      disk_space: { gte: param.diskSpace },
      duration: { gte: param.duration * HOURS_A_DAY },
      rentable: { eq: true },
      num_gpus: GPUNums[param.gpuNumber],
      sort_option: SortOptions[param.order],
      order: Object.values(SortOptions[param.order]),
      allocated_storage: param.diskSpace,
      type: param.type,
      limit: 64,
      ...(param.showIncompatible && { show_incompatible: { eq: true } }),
      ...(!param.visibleUnverified && { verified: { eq: true } }),
      ...(param.gpuName != "Any GPU" && {
        gpu_name: { eq: param.gpuName },
        gpu_option: { eq: param.gpuName },
      }),
      ...(param.geolocation != "Planet Earth" && {
        geolocation: { in: Geolocations[param.geolocation] },
      }),
      reliability2: { gte: param.reliability / 100 },
    };

    const response = await axios.post(`${host}/api/v1/list`, query);

    if (response.status !== 200) {
      throw new Error("Failed to fetch data from server");
    }

    const data = await response.data;
    if (data && data.list.offers) {
      setDataSource(data.list.offers.map((item: any) => item as GPUInfoType));
    }
  };
  useEffect(() => {
    fetchData();
  }, [debounce]);

  return (
    <ScrollArea className="w-full h-full pr-5">
      <div className="flex flex-col gap-6 items-stretch py-8">
        <span className="text-3xl text-white font-bold">
          List of Tensor Processors
        </span>
        {dataSource.map((item) => (
          <ModelCard {...item} />
        ))}
        {dataSource.length === 0 && (
          <div className="text-white text-2xl text-center py-52">
            No machines
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
