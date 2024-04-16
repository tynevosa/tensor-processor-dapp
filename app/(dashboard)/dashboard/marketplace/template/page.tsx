"use client";

import { Button } from "@/components/ui/button";
import { templateTab } from "@/constants/constant";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Template() {
  const {
    data: modelPage,
    fetchStatus: isPending,
    error,
  } = useQuery({
    queryKey: ["models-list"],
    queryFn: () =>
      axios.get("/api/machine/list/templates").then((res) => res.data),
  });
  console.log(modelPage);
  const [activeBtn, setActiveBtn] = useState(templateTab[0]?.name);

  const router = useRouter();
  return (
    <ScrollArea className="w-full h-full">
      <div className="px-1 py-12 w-full h-full container">
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-bold text-3xl text-white">Template</h1>
          <Button className="text-[#97AEF3] py-2 px-2">
            <X />
          </Button>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row mb-3 mt-10 border-b border-gray-800 gap-6 w-full justify-between">
            <div className="flex flex-row w-11/12 gap-8">
              {templateTab.map((item, index) => (
                <button
                  className={`${
                    activeBtn === item?.name
                      ? "text-[#97AEF3] border-b border-[#97AEF3]"
                      : "text-[#7E7F84]"
                  } sm:text-lg gap-2 text-sm font-semibold flex flex-row items-center px-2 py-2`}
                  key={item?.name}
                  onClick={() => setActiveBtn(item?.name)}
                >
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
            <div className="flex w-2/12 justify-end">
              <button
                className="text-[#97AEF3] py-2 px-2 gap-2 uppercase flex flex-row text-base"
                onClick={() => router.push("template/editor")}
              >
                <Plus />
                <span>create template</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
