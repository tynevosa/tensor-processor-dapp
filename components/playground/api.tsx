import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CodeBlockComponent from "@/components/ui/code-block";

export const API = () => {
  const code: string = `
  import Tensor processor

    output = tensor.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    input={
      "prompt": "An astronaut riding a rainbow unicorn, cinematic, dramatic"
    }
  )

  print(output)
`;

  return (
    <div className="flex flex-col justify-center gap-4 px-4 py-[10px] !w-full">
      <ScrollArea className="w-full whitespace-nowrap rounded-sm">
        <div className="flex">
          <CodeBlockComponent code={code} language="python" />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <button className="bg-[#97AEF3] mt-3 font-bold text-lg text-black w-40 px-3 py-4 rounded-sm hover:bg-[#6476af] transition-all duration-500">
        Coming soon
      </button>
    </div>
  );
};
