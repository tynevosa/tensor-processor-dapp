"use client";

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Slider } from "../ui/slider";
import { RefreshCw } from "lucide-react";
import { gpuItems } from "@/constants/constant";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";

export const MarketSidebar = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [diskSpace, setDiskSpace] = useState<number>(8);
  const [reliability, setReliability] = useState<number>(90);
  const [duration, setDuration] = useState<number>(3);

  const handleButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };

  return (
    <ScrollArea className="h-full px-6">
      <div className="flex flex-col gap-6 items-stretch w-80 py-8">
        <span className="text-2xl font-semibold text-white">
          Instance Configuration
        </span>
        <div className="flex flex-col items-stretch gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label
                className="text-white text-base font-semibold capitalize"
                htmlFor="image"
              >
                template:
              </Label>
              <Input
                ref={fileInputRef}
                id="image"
                type="file"
                placeholder="Select an Image"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                variant={"link"}
                className="p-0 justify-start text-[#97AEF3] !h-auto text-lg !no-underline hover:opacity-70 transition-all"
                onClick={handleButtonClick}
              >
                {selectedFile ? selectedFile.name : "Select an image"}
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <Label
                className="text-white text-base font-semibold capitalize"
                htmlFor="image"
              >
                image CUDA version:
              </Label>
              <span className="italic text-[#51586C] text-lg">
                Incompatible images hidden
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Label
                className="text-white text-base font-semibold capitalize"
                htmlFor="image"
              >
                Launch Type:
              </Label>
              <div className="flex gap-2 text-lg">
                <span className="text-white">On-start script:</span>
                <span className="italic text-[#51586C]">Not set</span>
              </div>
            </div>
            <Button
              className="py-2 px-8 text-lg font-semibold"
              variant={"secondary"}
            >
              Edit Image & Config
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-white">
              <span className="text-base font-semibold">
                Disk Space to Allocate
              </span>
              <span className="text-base font-bold">
                {`${diskSpace.toFixed(2)} GB`}
              </span>
            </div>
            <Slider
              defaultValue={[diskSpace]}
              max={100}
              step={1}
              className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
              onValueChange={(value) => setDiskSpace(value[0])}
            />
          </div>
          <div>
            <Button
              variant={"secondary"}
              className="bg-[#97AEF3] p-2 gap-2 hover:bg-[#97aef3] hover:opacity-70 transition-all"
            >
              <span className="font-semibold text-base">Reset Filter</span>
              <RefreshCw color="black" size={24} />
            </Button>
          </div>
          <div className="flex flex-col gap-6 items-stretch">
            <div className="flex flex-col gap-2 items-stretch">
              <div className="flex flex-col gap-2 items-stretch">
                <Label className="text-base font-semibold">GPUs:</Label>
                <ToggleGroup type="multiple" className="justify-between">
                  {gpuItems.map((item, index) => (
                    <ToggleGroupItem
                      value={item}
                      className="p-2 uppercase text-base font-semibold text-[#020202] bg-white data-[state=off]:bg-opacity-70 data-[state=on]:bg-opacity-100"
                      key={index}
                    >
                      {item}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              <Accordion
                type="single"
                collapsible
                className="flex flex-col gap-2"
              >
                <AccordionItem
                  value="category-1"
                  className="bg-[#121218] border border-[#242835] py-3 px-4 rounded-sm text-white font-semibold text-base"
                >
                  <AccordionTrigger className="!no-underline py-0">
                    On-Demand
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    This is the On-Demand Accordion Content
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="category-2"
                  className="bg-[#121218] border border-[#242835] py-3 px-4 rounded-sm text-white font-semibold text-base"
                >
                  <AccordionTrigger className="!no-underline py-0">
                    Any GPU
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    This is the Any GPU Accordion Content
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="category-3"
                  className="bg-[#121218] border border-[#242835] py-3 px-4 rounded-sm text-white font-semibold text-base"
                >
                  <AccordionTrigger className="!no-underline py-0">
                    Planet Earth
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    This is the Planet Earth Accordion Content
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="category-4"
                  className="bg-[#121218] border border-[#242835] py-3 px-4 rounded-sm text-white font-semibold text-base"
                >
                  <AccordionTrigger className="!no-underline py-0">
                    Auto Sort
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    This is the Auto Sort Accordion Content
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="flex flex-col gap-6 items-stretch">
              <div className="flex flex-col gap-3 items-stretch">
                <span className="text-lg font-semibold capitalize text-white">
                  Availability
                </span>
                <Separator className="bg-[#3c4152]" />
              </div>
              <div className="flex flex-col gap-4 items-stretch">
                <div className="flex justify-between text-white">
                  <span className="text-base font-semibold">
                    Host Reliability
                  </span>
                  <span className="text-base font-bold">{`${reliability} %`}</span>
                </div>
                <Slider
                  defaultValue={[reliability]}
                  max={100}
                  step={1}
                  className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
                  onValueChange={(value) => setReliability(value[0])}
                />
              </div>
              <div className="flex flex-col gap-4 items-stretch">
                <div className="flex justify-between text-white">
                  <span className="text-base font-semibold">
                    Max Instance Duration
                  </span>
                  <span className="text-base font-bold">{`${duration} days`}</span>
                </div>
                <Slider
                  defaultValue={[duration]}
                  max={100}
                  step={1}
                  className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
                  onValueChange={(value) => setDuration(value[0])}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 items-stretch">
              <div className="flex flex-col gap-3 items-stretch">
                <span className="text-lg font-semibold capitalize text-white">
                  Machine Options
                </span>
                <Separator className="bg-[#3c4152]" />
              </div>
              <div className="flex flex-col gap-4 items-stretch">
                <div className="flex gap-2 items-center">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-base font-semibold text-white"
                  >
                    Unverified Machines
                  </label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-base font-semibold text-white"
                  >
                    Incompatible Machines
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
