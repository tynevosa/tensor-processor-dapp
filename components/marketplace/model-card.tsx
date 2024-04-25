"use client";

import { ArrowDown, ArrowUp, ChevronUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { useRef } from "react";
import { GPUInfoType } from "@/types/type";
import { HOURS_A_DAY } from "@/constants/constant";
import { useReveal } from "../contexts/marketplace-context";
import Image from "next/image";

export const ModelCard = (props: GPUInfoType) => {
  const { setReveal } = useReveal();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onClickHandler = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  const normalizeDuration = (duration: number) => {
    if (duration < HOURS_A_DAY) return `${Math.floor(duration / 3600)} hours`;
    const days = Math.floor(duration / HOURS_A_DAY);
    if (days > 30) {
      const months = `${Math.floor(days / 30)} months`;
      if (days % 30) months.concat(` ${days % 30} d`);
      return months;
    } else {
      return `${days} days`;
    }
  };

  const normalizeCapacity = (
    capacity: number,
    fixed: number = 2,
    visibleUnit: boolean = true
  ) => {
    if (capacity > 1024)
      return `${(capacity / 1024).toFixed(fixed)}${visibleUnit ? "GB" : ""}`;
    else return `${capacity}${visibleUnit ? "GB" : ""}`;
  };

  const ratio = props.cpu_cores_effective / props.cpu_cores;

  return (
    <Card className="bg-[#121218] border border-[#242835] p-4 w-full flex flex-col gap-2">
      <CardHeader className="p-0 flex flex-col gap-3">
        <div className="flex items-stretch">
          <div className="flex-grow flex flex-col gap-2 items-stretch">
            <div className="flex justify-start gap-6 text-[#97AEF3]">
              <span className="text-sm font-bold">{`host: ${props.host_id}`}</span>
              <span className="text-sm font-bold">{props.geolocation}</span>
            </div>
            <div className="text-3xl font-semibold text-white">{`${props.num_gpus}x ${props.gpu_name}`}</div>
          </div>
          <div className="flex gap-8 items-stretch">
            <div className="flex flex-col justify-start gap-1">
              <span className="text-base text-[#97AEF3] font-semibold">
                {normalizeDuration(props.duration)}
              </span>
              <span className="text-base text-white">Max Duration</span>
            </div>
            <div className="flex flex-col justify-start gap-1">
              <span className="text-base text-[#97AEF3] font-semibold">
                {(props.reliability * 100).toFixed(2) + " %"}
              </span>
              <span className="text-base text-white">Reliability</span>
            </div>
            <span className="text-white text-xl font-semibold capitalize">
              {props.verification === "verified" && (
                <Image
                  src="/images/marketplace/verified.svg"
                  alt="verified"
                  width={24}
                  height={24}
                />
              )}
            </span>
          </div>
        </div>
        <Separator className="bg-[#252b3d]" />
      </CardHeader>

      <CardContent className="p-0">
        <Accordion type="single" collapsible>
          <AccordionItem value="details" className="border-b-0">
            <AccordionTrigger
              className="flex justify-end text-white py-0 data-[state=open]:hidden"
              ref={buttonRef}
            />
            <AccordionContent
              className="py-4 flex items-start cursor-pointer"
              ref={contentRef}
              onClick={onClickHandler}
            >
              <div className="flex-grow flex flex-col gap-8 items-start">
                <div className="flex gap-16 items-end">
                  <div className="flex flex-col gap-2 items-stretch text-white">
                    <span className="text-lg font-semibold">
                      {props.mobo_name}
                    </span>
                    <div className="flex gap-6">
                      <span className="font-semibold text-sm">
                        {`PCIE ${props.pci_gen.toFixed(1)}, ${
                          props.gpu_lanes
                        }x`}
                      </span>
                      <span className="font-semibold text-sm">{`${props.pcie_bw?.toFixed(
                        1
                      )} GB/s`}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 items-stretch text-[#97AEF3]">
                    <div className="flex">
                      <ArrowUp size={20} />
                      <span className="text-sm font-bold">{`${props.inet_up.toFixed(
                        0
                      )} Mbps`}</span>
                    </div>
                    <div className="flex">
                      <ArrowDown size={20} />
                      <span className="text-sm font-bold">{`${props.inet_down.toFixed(
                        0
                      )} Mbps`}</span>
                    </div>
                  </div>
                  <span className="text-sm text-white font-semibold">
                    {`${props.direct_port_count} ports`}
                  </span>
                </div>
                <div className="flex gap-16 items-stretch">
                  <div className="flex gap-2 max-w-44 flex-col text-white">
                    <span className="truncate text-lg">
                      {props.cpu_name || "No CPU Available"}
                    </span>
                    <div className="flex gap-6">
                      <span className="font-semibold text-sm truncate">
                        {`${props.cpu_cores_effective.toFixed(1)}/${
                          props.cpu_cores
                        } cpu`}
                      </span>
                      <span className="font-semibold text-sm">
                        {`${normalizeCapacity(
                          props.cpu_ram_space,
                          0,
                          false
                        )}/${normalizeCapacity(
                          props.cpu_ram_space * ratio,
                          0
                        )}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 max-w-44 flex-col text-white">
                    <span className="truncate text-lg uppercase">
                      {props.disk_name || "No Disk Available"}
                    </span>
                    <div className="flex gap-6">
                      <span className="font-semibold text-sm truncate">
                        {`${props.disk_bw.toFixed(0)} MB/s`}
                      </span>
                      <span className="font-semibold text-sm">
                        {`${props.disk_space.toFixed(1)} GB`}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-baseline">
                      <span className="text-lg font-semibold text-white">
                        {props.dlperf.toFixed(1)}
                      </span>
                      <span className="text-sm text-[#97AEF3] font-bold">
                        DLPerf
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {props.dlperf_per_dphtotal.toFixed(1)} DLP/$/hr
                    </span>
                  </div>
                </div>
              </div>
              <ChevronUp className="w-4 h-4 shrink-0 text-white" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-between items-end p-0">
        <div className="flex gap-6 items-stretch">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-end text-white">
              <span className="text-2xl font-semibold">
                {props.total_flops.toFixed(2)}
              </span>
              <span className="text-base uppercase">TFLOPS</span>
            </div>
            <span className="text-[#97AEF3] text-sm font-semibold">
              {`Max CUDA: ${props.cuda_max_good.toFixed(1)} `}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold text-white">
              {normalizeCapacity(props.gpu_ram)}
            </span>
            <span className="text-[#97AEF3] text-sm font-semibold">
              {props.gpu_mem_bw} GB/s
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-white text-2xl font-semibold">{`$${(
            props.storage_total_cost * 100
          ).toFixed(2)}/hr`}</span>
          <Button
            variant={"secondary"}
            onClick={() => setReveal(props)}
            className="bg-[#97AEF3] py-3 px-9 gap-2 hover:bg-[#97aef3] hover:opacity-70 transition-all font-semibold text-lg"
          >
            Reveal
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
