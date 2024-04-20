"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import createImage from "@/public/create-template-icon.png";
import { useParam } from "@/components/contexts/param-context";
import { useRouter } from "next/navigation";

export const InstanceConfig = () => {
  const { param, setParam } = useParam();
  const { diskSpace } = param;

  const updateParam = (key: string, value: any) => {
    setParam({ ...param, [key]: value });
  };

  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  return (
    <div className="flex flex-col gap-10">
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
          onValueChange={(value) => updateParam("diskSpace", value[0])}
        />
      </div>
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
                    onClick={() => router.push("marketplace/template")}
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
  );
};
