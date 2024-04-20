"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function CreateTemplate() {
  return (
    <ScrollArea className="w-full h-full">
      <div className="px-1 py-12 w-full container flex flex-col mb-36">
        <h1 className="ml-10 lg:ml-6 font-bold text-3xl text-white text-center">
          Template Creator
        </h1>
        <div className="flex flex-col justify-center items-center w-full mt-10 gap-6">
          <div className="flex flex-col border border-[#242835] px-6 py-8 w-full rounded-lg bg-[#0B0B0E] gap-8">
            <span className="text-3xl text-white font-semibold">
              Docker Repository and Enironment
            </span>
            <div className="flex md:flex-row flex-col w-full gap-6">
              <div className="md:w-6/12 w-full flex flex-col gap-2">
                <span className="uppercase text-white font-semibold text-base">
                  Image path/tag
                </span>
                <Input placeholder="Enter full docker image/tag name for docker pull" />
              </div>
              <div className="md:w-6/12 w-full flex flex-col gap-2">
                <span className="uppercase text-white font-semibold text-base">
                  Version tag
                </span>
                <Select
                  defaultValue={"DDIM"}
                  onValueChange={(value) => console.log(value)}
                >
                  <SelectTrigger className="bg-[#121218] border border-[#242835] p-3 rounded-sm text-white font-semibold text-base flex justify-between items-center focus:!ring-0 focus-visible:!ring-0 outline-none h-14">
                    <SelectValue className="w-full !px-3 !py-3">
                      <span className="w-full flex">select</span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-[#121218] border border-[#242835]">
                    <SelectGroup className="w-full">
                      <SelectItem
                        value={"MDD"}
                        key={""}
                        className="rounded-sm text-white font-semibold text-base"
                      ></SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <span className="uppercase text-white font-semibold text-base">
                Docker options
              </span>
              <Input placeholder="Docker create/run options ex: -e TZ=UTC -p 8081:8081 -e JUPYTER_DIR=/ -h hostname" />
            </div>
          </div>

          <div className="flex flex-col border border-[#242835] px-6 py-8 w-full rounded-lg bg-[#0B0B0E] gap-8">
            <span className="text-3xl text-white">Launch Mode</span>

            <div className="flex flex-col w-full gap-8">
              <div className="flex flex-col gap-4">
                <span className="flex flex-row text-white items-center gap-2 font-semibold">
                  <Checkbox
                    checked={true}
                    className="w-6 h-6"
                    onCheckedChange={(checked: boolean) => console.log(checked)}
                  />
                  Run a jupyter-python notebook (easiest). A browser based GUI
                  with python editor, bash terminal and more. SSH as well.
                </span>
                <span className="flex flex-row text-white items-center gap-2 font-semibold ml-8">
                  <Checkbox
                    checked={false}
                    className="w-6 h-6"
                    onCheckedChange={(checked: boolean) => console.log(checked)}
                  />
                  Jupyter direct HTTPS - much faster, but requires first loading
                  our TLS certificate in your browser (one-time).
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="flex flex-row text-white items-center gap-2 font-semibold">
                  <Checkbox
                    checked={false}
                    className="w-6 h-6"
                    onCheckedChange={(checked: boolean) => console.log(checked)}
                  />
                  Run interactive shell server, SSH.
                </span>
                <span className="flex flex-row text-white items-center gap-2 font-semibold ml-8">
                  <Checkbox
                    checked={false}
                    className="w-6 h-6"
                    onCheckedChange={(checked: boolean) => console.log(checked)}
                  />
                  Use direct SSH connection - faster than proxy, but limited to
                  machines with open ports. Proxy ssh still available as backup.
                </span>
              </div>
              <span className="flex flex-row text-white items-center gap-2 font-semibold">
                <Checkbox
                  checked={false}
                  className="w-6 h-6"
                  onCheckedChange={(checked: boolean) => console.log(checked)}
                />
                Docker Run: use docker ENTRYPOINT.
              </span>
            </div>
          </div>

          <div className="flex flex-col border border-[#242835] px-6 py-8 w-full rounded-lg bg-[#0B0B0E] gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-3xl text-white">On-start Script</span>
              <span className="font-semibold text-[#828693]">
                Bash commands that are invoked whenever your instance starts,
                see FAQ/docs for details.
              </span>
            </div>
            <div className="flex flex-row w-full gap-6">
              <Textarea
                placeholder="echo ‘This is where your bash commands go’ > test.txt; touch /workspace/onstart_was_here;"
                className="flex w-full rounded-md border border-[#242835] text-gray-400 font-semibold bg-[#121218] px-3 py-3 italic text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-[126px] "
              />
            </div>
          </div>

          <div className="flex flex-col border border-[#242835] px-6 py-8 w-full rounded-lg bg-[#0B0B0E] gap-8">
            <span className="text-base text-white font-semibold">
              Extra Filters (CLI Format: verified=true
              gpu_display_active=true...)
            </span>
            <div className="flex flex-row w-full gap-6">
              <Textarea className="flex w-full rounded-md border border-[#242835] text-gray-400 font-semibold bg-[#121218] px-3 py-3 italic text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-[126px] " />
            </div>
          </div>

          <div className="flex flex-col border border-[#242835] px-6 py-8 w-full rounded-lg bg-[#0B0B0E] gap-8 font-semibold">
            <span className="text-3xl text-white">
              Docker Repository Authentication
            </span>
            <div className="w-full flex flex-col gap-2">
              <span className="uppercase text-white text-base">server</span>
              <Input placeholder="Server name (i.e : docker.io)" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="uppercase text-white text-base">
                Docker username
              </span>
              <Input placeholder="Docker Login Username" />
            </div>
            <div className="flex flex-col w-full gap-2">
              <span className="uppercase text-white text-base">
                Docker password
              </span>
              <Input placeholder="Docker Login Password" />
            </div>
            <span className="text-white">docker login -u -p</span>
          </div>

          <div className="flex flex-col border border-[#242835] px-6 py-8 w-full rounded-lg bg-[#0B0B0E] gap-8 font-semibold">
            <span className="text-3xl text-white">Identification</span>
            <div className="w-full flex flex-col gap-2">
              <span className="uppercase text-white text-base">
                Template name
              </span>
              <Input placeholder="Enter Your Template Name" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="uppercase text-white text-base">
                Template description
              </span>
              <Textarea className="flex w-full rounded-md border border-[#242835] text-gray-400 font-semibold bg-[#121218] px-3 py-3 italic text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-[126px] " />
            </div>
          </div>

          <div className="flex flex-col border border-[#242835] px-6 py-8 w-full rounded-lg bg-[#0B0B0E] gap-8 font-semibold">
            <span className="text-3xl text-white">Identification</span>
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-row justify-between items-center">
                <span className=" text-white text-base">
                  Recommended Disk Space
                </span>
                <span className=" text-white text-base">8.00 TB</span>
              </div>
              <Slider
                defaultValue={[8]}
                max={1024}
                min={0}
                step={1}
                className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
                onValueChange={(value) => console.log(value)}
              />
            </div>
          </div>

          <div className="flex flex-col border border-[#242835] px-6 py-8 w-full rounded-lg bg-[#0B0B0E] gap-8 font-semibold">
            <span className="text-3xl text-white">Accessibility</span>
            <div className="w-full flex flex-row gap-4">
              <span className="flex flex-row gap-2 text-white">
                <Checkbox
                  checked={false}
                  className="w-6 h-6"
                  onCheckedChange={(checked: boolean) => console.log(checked)}
                />
                Include ReadMe
              </span>
              <span className="flex flex-row gap-2 text-white">
                <Checkbox
                  checked={false}
                  className="w-6 h-6"
                  onCheckedChange={(checked: boolean) => console.log(checked)}
                />
                Public Template
              </span>
            </div>
          </div>

          <div className="flex md:flex-row flex-col justify-between w-full gap-4">
            <div className="flex flex-row items-center gap-5 md:w-6/12 w-full">
              <button className="px-4 py-4 bg-primary rounded-lg">
                <Image
                  src={"/images/marketplace/copy.svg"}
                  alt="copy"
                  width={24}
                  height={24}
                />
              </button>
              <div className="flex flex-col gap-1 font-semibold">
                <span className="text-white">Cli Command</span>
                <span className="text-base text-[#B2B9CD]">
                  $ vastai create instance x
                </span>
              </div>
            </div>
            <div className="flex flex-row md:w-6/12 w-ful justify-end gap-4">
              <button className="rounded-lg bg-[#D9E3FF] text-black font-semibold py-3 px-4 w-full">
                Cancel
              </button>
              <button className="rounded-lg bg-[#97AEF3] text-white font-semibold py-3 px-4 w-full">
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
