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
  const { setParam } = useParam();
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
        <AvailabilityFilter />
        <MachineOptions />
        <PriceFilter />
        <GpuFilter />
        <MachineFilter />
      </div>
    </div>
  );
};
