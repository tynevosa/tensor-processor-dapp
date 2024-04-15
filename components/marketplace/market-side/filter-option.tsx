"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { initialParam } from "@/constants/constant";
import { PriceFilter } from "./filter-options/price-filter";
import { AvailabilityFilter } from "./filter-options/availability-filter";
import { GpuFilter } from "./filter-options/gpu-resource-filter";
import { MachineOptions } from "./filter-options/machine-options";
import { MachineFilter } from "./filter-options/machine-resource-filter";
import { useParam } from "@/components/contexts/param-context";

export const FilterOptions = () => {
  const { param, setParam } = useParam();

  const updateParam = (key: string, value: any) => {
    setParam({ ...param, [key]: value });
  };

  return (
    <div className="flex flex-col h-full gap-10 pb-32">
      <div className="flex flex-row items-center justify-between">
        <span className="font-semibold text-base text-white">Reset Filter</span>
        <Button
          variant={"secondary"}
          className="bg-[#97AEF3] p-2 gap-2 hover:bg-[#97aef3] hover:opacity-70 transition-all"
          onClick={() => setParam(initialParam)}
        >
          <RefreshCw color="black" size={24} />
        </Button>
      </div>

      <div className="flex flex-col gap-10 items-stretch">
        {/* <div className="flex flex-col gap-2 items-stretch">
          <div className="flex flex-col gap-2 items-stretch">
            <Label className="text-base font-semibold">GPUs:</Label>
            <ToggleGroup
              type="single"
              className="justify-between"
              defaultValue={gpuNumber}
              onValueChange={(value) => updateParam("gpuNumber", value)}
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
            onValueChange={(value) => updateParam("type", value as GPUType)}
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
            onValueChange={(value) => updateParam("gpuName", value)}
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
            onValueChange={(value) =>
              updateParam("geolocation", value as string)
            }
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
            defaultValue={order}
            onValueChange={(value) => updateParam("order", value)}
          >
            <SelectTrigger className="bg-[#121218] border border-[#242835] py-3 px-4 rounded-sm text-white font-semibold text-base flex justify-between items-center focus:!ring-0 focus-visible:!ring-0 outline-none">
              <SelectValue className="w-full focus:!ring-0 focus-visible:!ring-0 outline-none">
                <span className="w-full flex">{order}</span>
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
        </div> */}
        <AvailabilityFilter />
        <MachineOptions />
        <PriceFilter />
        <GpuFilter />
        <MachineFilter />
      </div>
    </div>
  );
};
