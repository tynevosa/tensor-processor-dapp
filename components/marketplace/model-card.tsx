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

type Props = {
  host_id: number;
  geolocation: string;
  duration: number;
  reliability2: number;
  verification: string;
  total_flops: number;
  cuda_max_good: number;
  gpu_ram: number;
  gpu_mem_bw: number;
  storage_cost: number;
};

export const ModelCard = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onClickHandler = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  return (
    <Card className="bg-[#121218] border border-[#242835] p-4 w-full flex flex-col gap-2">
      <CardHeader className="p-0 flex flex-col gap-3">
        <div className="flex items-stretch">
          <div className="flex-grow flex flex-col gap-2 items-stretch">
            <div className="flex justify-start gap-6 text-[#97AEF3]">
              <span className="text-sm font-bold">host:80558</span>
              <span className="text-sm font-bold">Virginia, US</span>
            </div>
            <div className="text-3xl font-semibold text-white">1x RTX 4090</div>
          </div>
          <div className="flex gap-8 items-stretch">
            <div className="flex flex-col justify-start gap-1">
              <span className="text-base text-[#97AEF3] font-semibold">
                10 days
              </span>
              <span className="text-base text-white">Max Duration</span>
            </div>
            <div className="flex flex-col justify-start gap-1">
              <span className="text-base text-[#97AEF3] font-semibold">
                99.07%
              </span>
              <span className="text-base text-white">Reliability</span>
            </div>
            <span className="text-white text-xl font-semibold">Verified</span>
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
                    <span className="text-lg font-semibold">ROME2D32GM</span>
                    <div className="flex gap-6">
                      <span className="font-semibold text-sm">
                        PCIE 4.0, 16x
                      </span>
                      <span className="font-semibold text-sm">14.9 GB/s</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 items-stretch text-[#97AEF3]">
                    <div className="flex">
                      <ArrowUp size={20} />
                      <span className="text-sm font-bold">396 Mbps</span>
                    </div>
                    <div className="flex">
                      <ArrowDown size={20} />
                      <span className="text-sm font-bold">670 Mbps</span>
                    </div>
                  </div>
                  <span className="text-sm text-white font-semibold">
                    12 ports
                  </span>
                </div>
                <div className="flex gap-16 items-stretch">
                  <div className="flex gap-2 max-w-44 flex-col text-white">
                    <span className="truncate text-lg">
                      AMD EPYC 9554 64-Core Processor
                    </span>
                    <div className="flex gap-6">
                      <span className="font-semibold text-sm truncate">
                        32.0/256 cpu
                      </span>
                      <span className="font-semibold text-sm">64/516GB</span>
                    </div>
                  </div>
                  <div className="flex gap-2 max-w-44 flex-col text-white">
                    <span className="truncate text-lg">
                      SAMSUNG MZQL27T6HBLA-00A07
                    </span>
                    <div className="flex gap-6">
                      <span className="font-semibold text-sm truncate">
                        1979 MB/s
                      </span>
                      <span className="font-semibold text-sm">748.3 GB</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-baseline">
                      <span className="text-lg font-semibold text-white">
                        100.6
                      </span>
                      <span className="text-sm text-[#97AEF3] font-bold">
                        DLPerf
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      246.8 DLP/$/hr
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
              <span className="text-2xl font-semibold">81.4</span>
              <span className="text-base uppercase">TFLOPS</span>
            </div>
            <span className="text-[#97AEF3] text-sm font-semibold">
              Max CUDA: 12.2
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold text-white">24 GB</span>
            <span className="text-[#97AEF3] text-sm font-semibold">
              3474.6 GB/s
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-white text-2xl font-semibold">$0.408/hr</span>
          <Button
            variant={"secondary"}
            className="bg-[#97AEF3] py-3 px-9 gap-2 hover:bg-[#97aef3] hover:opacity-70 transition-all font-semibold text-lg"
          >
            Rent
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
