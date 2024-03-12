"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Slider } from "../ui/slider";
import { ChevronDownIcon, RefreshCw } from "lucide-react";
import {
  GPUNames,
  GPUNums,
  GPUTypes,
  Geolocations,
  SortOptions,
} from "@/constants/constant";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { SelectGroup, SelectTrigger } from "@radix-ui/react-select";
import type { GPUNumberRange, GPUType } from "@/types/type";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import createImage from "@/public/create-template-icon.png";

export const MarketSidebar = () => {
  // Filter Options
  const [diskSpace, setDiskSpace] = useState<number>(8);
  const [duration, setDuration] = useState<number>(3);
  const [reliability, setReliability] = useState<number>(90);
  const [type, setType] = useState<GPUType>("ask");
  const [gpuNumber, setGPUNumber] = useState<GPUNumberRange>({});
  const [gpuName, setGPUName] = useState<string>("Any GPU");
  const [geolocation, setGeolocation] = useState<string>("Planet Earth");
  const [order, setOrder] = useState<{ [key: string]: string[] }>(
    SortOptions["Auto Sort"]
  );
  const [visibleUnverified, setVisibleUnverified] = useState<boolean>(false);
  const [showIncompatible, setShowIncompatible] = useState<boolean>(false);

  // Dialog Open Status
  const [open, setOpen] = useState<boolean>(false);

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

              <Button
                variant={"link"}
                className="p-0 justify-start text-[#97AEF3] !h-auto text-lg !no-underline hover:opacity-70 transition-all"
              >
                Select an image
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
            <Dialog open={open} onOpenChange={(change) => setOpen(change)}>
              <DialogTrigger asChild>
                <Button
                  className="py-2 px-8 text-lg font-semibold"
                  variant={"secondary"}
                >
                  Edit Image & Config
                </Button>
              </DialogTrigger>
              <DialogContent className="!box-border bg-[#0B0B0E]/80 border border-[#242835] md:p-6 md:pt-8 p-4 pt-6 w-[752px] max-w-full">
                <Card className="bg-transparent border-0 p-0 flex flex-col gap-6">
                  <CardHeader className="flex flex-col items-center p-0 text-white gap-2">
                    <span className="text-2xl font-semibold text-center">
                      Docker Image Templates
                    </span>
                    <span className="text-sm text-center">
                      Click to expand and configure templates below
                    </span>
                  </CardHeader>
                  <CardContent className="bg-[#121218]/80 border border-[#242835] rounded-md p-0">
                    <Tabs
                      defaultValue="recent"
                      className="h-full min-h-96 flex flex-col"
                    >
                      <TabsList className="grid grid-cols-2 bg-transparent p-0 h-16 box-border">
                        <TabsTrigger
                          value="recent"
                          className="!bg-transparent border-b border-[#212636] data-[state=active]:border-[#97aef3] rounded-b-none !text-white py-4 text-xl font-medium"
                        >
                          Recent
                        </TabsTrigger>
                        <TabsTrigger
                          value="recommended"
                          className="!bg-transparent border-b border-[#212636] data-[state=active]:border-[#97aef3] rounded-b-none !text-white py-4 text-xl font-medium"
                        >
                          Recommended
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent
                        value="recent"
                        className=" flex-grow flex flex-col justify-center items-center gap-6 data-[state=inactive]:hidden"
                      >
                        <Image src={createImage} alt="createTemplate" />
                        <Button
                          variant={"ghost"}
                          className="!text-white !bg-transparent hover:opacity-70"
                        >
                          + CREATE TEMPLATE
                        </Button>
                      </TabsContent>
                      <TabsContent
                        value="recommended"
                        className=" flex-grow flex flex-col justify-center items-center gap-6 data-[state=inactive]:hidden"
                      >
                        <Image src={createImage} alt="createTemplate" />
                        <Button
                          variant={"ghost"}
                          className="!text-white !bg-transparent hover:opacity-70"
                        >
                          + CREATE TEMPLATE
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex gap-4 w-full justify-stretch p-0">
                    <Button
                      variant={"secondary"}
                      className="flex-grow text-lg rounded-sm !bg-[#D9E3FF] hover:opacity-70 transition-all"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant={"default"}
                      className="flex-grow text-lg rounded-sm !bg-[#97aef3] hover:opacity-70 transition-all"
                      disabled
                    >
                      Select
                    </Button>
                  </CardFooter>
                </Card>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-white">
              <span className="text-base font-semibold">
                Disk Space to Allocate
              </span>
              <span className="text-base font-bold">
                {`${
                  diskSpace > 1024
                    ? (diskSpace / 1024).toFixed(2) + " TB"
                    : diskSpace.toFixed(2) + " GB"
                } `}
              </span>
            </div>
            <Slider
              defaultValue={[diskSpace]}
              max={10000}
              step={0.01}
              min={8}
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
                <ToggleGroup
                  type="single"
                  className="justify-between"
                  onValueChange={(value) => setGPUNumber(GPUNums[value])}
                >
                  {Object.keys(GPUNums).map((key, index) => (
                    <ToggleGroupItem
                      value={key}
                      className="p-2 uppercase text-base font-semibold text-[#020202] bg-white data-[state=off]:bg-opacity-70 data-[state=on]:bg-opacity-100"
                      key={index}
                    >
                      {key}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              <Select
                defaultValue={type}
                onValueChange={(value) => setType(value as GPUType)}
              >
                <SelectTrigger className="bg-[#121218] border border-[#242835] py-3 px-4 rounded-sm text-white font-semibold text-base flex justify-between items-center focus:!ring-0 focus-visible:!ring-0 outline-none">
                  <SelectValue className="w-full">
                    <span className="w-full flex">{GPUTypes[type]}</span>
                  </SelectValue>
                  <ChevronDownIcon size={17} />
                </SelectTrigger>
                <SelectContent className="bg-[#121218] border border-[#242835]">
                  <SelectGroup className="w-full">
                    {Object.keys(GPUTypes).map((key, index) => (
                      <SelectItem
                        value={key}
                        key={index}
                        className="py-2 px-3 rounded-sm text-white font-semibold text-base"
                      >
                        {GPUTypes[key as GPUType]}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                defaultValue={gpuName}
                onValueChange={(value) => setGPUName(value)}
              >
                <SelectTrigger className="bg-[#121218] border border-[#242835] py-3 px-4 rounded-sm text-white font-semibold text-base flex justify-between items-center focus:!ring-0 focus-visible:!ring-0 outline-none">
                  <SelectValue className="w-full">
                    <span className="w-full flex">{gpuName}</span>
                  </SelectValue>
                  <ChevronDownIcon size={17} />
                </SelectTrigger>
                <SelectContent className="bg-[#121218] border border-[#242835] text-white">
                  <SelectGroup className="w-full ">
                    {GPUNames.map((name, index) => (
                      <SelectItem
                        value={name}
                        key={index}
                        className="py-2 px-3 rounded-sm text-white font-semibold text-base"
                      >
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                defaultValue={geolocation}
                onValueChange={(value) => setGeolocation(value)}
              >
                <SelectTrigger className="bg-[#121218] border border-[#242835] py-3 px-4 rounded-sm text-white font-semibold text-base flex justify-between items-center focus:!ring-0 focus-visible:!ring-0 outline-none">
                  <SelectValue className="w-full focus:!ring-0 focus-visible:!ring-0 outline-none">
                    <span className="w-full flex">{geolocation}</span>
                  </SelectValue>
                  <ChevronDownIcon size={17} />
                </SelectTrigger>
                <SelectContent className="bg-[#121218] border border-[#242835] text-white">
                  <SelectGroup className="w-full ">
                    {Object.keys(Geolocations).map((location, index) => (
                      <SelectItem
                        value={location}
                        key={index}
                        className="py-2 px-3 rounded-sm text-white font-semibold text-base"
                      >
                        {location}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                defaultValue={"Auto Sort"}
                onValueChange={(value) => setOrder(SortOptions[value])}
              >
                <SelectTrigger className="bg-[#121218] border border-[#242835] py-3 px-4 rounded-sm text-white font-semibold text-base flex justify-between items-center focus:!ring-0 focus-visible:!ring-0 outline-none">
                  <SelectValue className="w-full focus:!ring-0 focus-visible:!ring-0 outline-none">
                    <span className="w-full flex">
                      {Object.keys(SortOptions).find(
                        (key) => SortOptions[key] == order
                      )}
                    </span>
                  </SelectValue>
                  <ChevronDownIcon size={17} />
                </SelectTrigger>
                <SelectContent className="bg-[#121218] border border-[#242835] text-white">
                  <SelectGroup className="w-full ">
                    {Object.keys(SortOptions).map((key, index) => (
                      <SelectItem
                        value={key}
                        key={index}
                        className="py-2 px-3 rounded-sm text-white font-semibold text-base"
                      >
                        {key}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                  min={11.31}
                  step={0.01}
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
                  <Checkbox
                    id="unverified"
                    checked={visibleUnverified}
                    onCheckedChange={(checked: boolean) =>
                      setVisibleUnverified(checked)
                    }
                  />
                  <label
                    htmlFor="unverified"
                    className="text-base font-semibold text-white"
                  >
                    Unverified Machines
                  </label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="incompatible"
                    checked={showIncompatible}
                    onCheckedChange={(checked: boolean) =>
                      setShowIncompatible(checked)
                    }
                  />
                  <label
                    htmlFor="incompatible"
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
