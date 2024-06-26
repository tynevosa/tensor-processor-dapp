"use client";

import { useParam } from "@/components/contexts/param-context";
import { ModelCard } from "@/components/marketplace/model-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  GPUNums,
  Geolocations,
  HOURS_A_DAY,
  SortOptions,
  initialParam,
} from "@/constants/constant";
import { GPUInfoType } from "@/types/type";
import { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "@/components/hooks/use-debounce";
import { Spinner } from "@/components/ui/spinner";
import { useReveal } from "@/components/contexts/marketplace-context";
import Image from "next/image";
import { ModelDetialsBar } from "@/components/marketplace/model-details-bar";
import { MarketSidebar } from "@/components/layout/market-side";
import { useInView } from "react-intersection-observer";

const Page: FC = () => {
  const { param } = useParam();
  const { reveal } = useReveal();
  const debounce = useDebounce(param, 500);
  const { ref, inView } = useInView();
  const [dataSource, setDataSource] = useState<GPUInfoType[]>([]);

  const fetchData = useCallback(async () => {
    const host = process.env.NEXT_PUBLIC_SERVER_URL;
    try {
      const query = {
        disk_space: { gte: param.diskSpace },
        duration: { gte: param.duration * HOURS_A_DAY },
        rentable: { eq: true },
        num_gpus: { gte: param.gpu_count },
        sort_option: SortOptions[param.order],
        order: Object.values(SortOptions[param.order]),
        allocated_storage: param.diskSpace,
        type: param.type,
        limit: 10,
        ...(param.per_hour !== initialParam.per_hour && {
          dph_total: { gte: param.per_hour / 100 },
        }),
        ...(param.tflops !== initialParam.tflops && {
          total_flops: { gte: param.tflops },
        }),
        ...(param.per_gpu_ram !== initialParam.per_gpu_ram && {
          flops_per_dphtotal: { gte: param.per_gpu_ram },
        }),
        ...(param.tb_upload !== initialParam.tb_upload && {
          inet_up_cost: { gte: param.tb_upload / 100000 },
        }),
        ...(param.cpu_core !== initialParam.cpu_core && {
          cpu_cores_effective: { gte: param.cpu_core },
        }),
        ...(param.cpu_ram_space !== initialParam.cpu_ram_space && {
          cpu_ram: { gte: param.cpu_ram_space },
        }),
        ...(param.tb_download !== initialParam.tb_download && {
          inet_down_cost: { gte: param.tb_download / 10000 },
        }),
        ...(param.showIncompatible && { show_incompatible: { eq: true } }),
        ...(!param.visibleUnverified && { verified: { eq: true } }),
        ...(param.staticIpAddress && { static_ip: { eq: true } }),
        ...(param.gpuName != "Any GPU" && {
          gpu_name: { eq: param.gpuName },
          gpu_option: { eq: param.gpuName },
        }),
        ...(param.geolocation != "Planet Earth" && {
          geolocation: { in: Geolocations[param.geolocation] },
        }),
        reliability2: { gte: param.reliability / 100 },
      };

      const response = await axios.post(`/api/machine/search`, query);

      if (response.status !== 200) {
        throw new Error("Failed to fetch data from server");
      }

      const data = await response.data;
      if (data && data.offers) {
        setDataSource(data.offers.map((item: any) => item as GPUInfoType));
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    param.cpu_core,
    param.diskSpace,
    param.duration,
    param.geolocation,
    param.gpuName,
    param.order,
    param.reliability,
    param.showIncompatible,
    param.type,
    param.visibleUnverified,
    param.staticIpAddress,
    param.per_hour,
    param.tb_download,
    param.tb_upload,
    param.per_gpu_ram,
    param.gpu_count,
    param.tflops,
    param.cpu_ram_space,
  ]);

  useEffect(() => {
    fetchData();
  }, [debounce, fetchData]);

  return (
    <>
      <MarketSidebar />
      <div className="flex-grow">
        <div className="overflow-auto flex flex-row h-full">
          <div className="flex flex-col lg:w-9/12 w-full h-full">
            <span className="text-xl border border-[#242835] text-white font-bold bg-[#121218] px-6 py-8 w-full">
              Tensor Processors
            </span>
            <ScrollArea className="h-full w-full">
              <div className="flex flex-col w-full">
                <div className="px-6 flex flex-col gap-6 items-stretch py-8 mb-20">
                  {dataSource.map((item, key) => (
                    <ModelCard {...item} key={key} />
                  ))}
                  {dataSource.length === 0 && (
                    <div className="text-white text-2xl text-center py-52">
                      <span className="text-white font-semibold">
                        No machines
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>
          <div className="hidden lg:flex flex-col lg:w-3/12 border-l border-[#242835] sticky top-100 h-full">
            {reveal.host_id === 0 ? (
              <div className="flex items-center justify-center flex-col gap-3 mt-96">
                <Image
                  src={"/images/marketplace/empty.svg"}
                  width={72}
                  height={72}
                  alt="empty"
                />
                <p className="text-white font-semibold">Need a Processor?</p>
                <p className="text-[#242835] font-semibold">
                  Reveal a processor details to rent
                </p>
              </div>
            ) : (
              <ModelDetialsBar modelDetail={reveal} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
