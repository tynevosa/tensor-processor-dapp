"use client";

import Image from "next/image";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { marketplaceBtn } from "@/constants/constant";

import { InstanceConfig } from "../marketplace/market-side/instance-config";
import { FilterOptions } from "../marketplace/market-side/filter-option";

export const MarketSidebar = () => {
  // Dialog Open Status
  const [open, setOpen] = useState<boolean>(false);
  const [activeBtn, setActiveBtn] = useState(marketplaceBtn[0]?.name);

  return (
    <ScrollArea className="h-full pl-8 pr-6 border-r border-[#242835]">
      <div className="flex flex-col gap-6 items-stretch w-80 py-8">
        <div className="flex lg:flex-row flex-col justify-between py-2 px-2 bg-[#0E0E16] rounded-lg">
          {marketplaceBtn.map((item, index) => (
            <button
              className={`${
                activeBtn === item?.name
                  ? "text-white bg-[#262E47]"
                  : "text-gray-600"
              } rounded-lg flex flex-row items-center px-2 py-3 font-light justify-center`}
              key={item?.name}
              onClick={() => setActiveBtn(item?.name)}
            >
              <Image
                src={item.url}
                width={20}
                height={20}
                className="h-full w-full mr-1"
                style={{
                  width: "auto",
                  height: "auto",
                  filter: activeBtn === item?.name ? "" : "hue-rotate(317deg)",
                }}
                alt="image"
                priority
              />
              <p className="flex flex-row text-base font-semibold">
                {item.name}
              </p>
            </button>
          ))}
        </div>
        {activeBtn === "Instance Config" ? (
          <InstanceConfig />
        ) : (
          <FilterOptions />
        )}
      </div>
    </ScrollArea>
  );
};
