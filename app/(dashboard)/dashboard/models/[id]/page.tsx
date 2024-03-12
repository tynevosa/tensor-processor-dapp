"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { CopyBlock, atomOneDark } from "react-code-blocks";

type Props = {
  params: {
    id: string;
  };
};

const languages = [
  {
    name: "Python",
    value: "python",
  },
  {
    name: "Javascript",
    value: "javascript",
  },
  {
    name: "cURL",
    value: "curl",
  },
];

const code = `
import Tensor processor
             
output = tpu.run("tpu-img-to-vid/sdxl:39ed",
input={"prompt": "A video of a cat playing with a ball", "num_frames": 100, "fps": 30, "resolution": "720p", "style": "none", "audio": "none", "text": "none", "seed": "none", "truncation": "1", "class": "none", "class_weight": "1", "class_bias": "0", "class_temperature})

print(output)`;

const ModelDetailPage = ({ params }: Props) => {
  const router = useRouter();
  const [activeLang, setActiveLang] = React.useState(languages[0]?.value);
  return (
    <div className="flex flex-col px-6 py-12">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <div className="bg-[#97AEF31A] p-2 rounded-full size-10">
          <ArrowLeft color="#97AEF3" />
        </div>
        <span className="font-[600] text-white text-xl">Back</span>
      </button>
      {/* Prompt Section */}
      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-4 mt-10 w-3/4">
          <div className="flex justify-between items-center bg-[#151C2B] p-2 rounded-[8px]">
            <input
              type="text"
              className="flex-1 border-0 bg-transparent mx-4 font-[500] text-lg text-nowrap text-white outline-none"
              placeholder="Write prompt here..."
            />
            <Button className="bg-[#97AEF3] hover:bg-[#97AEF3] px-9 py-4 font-[600] text-black text-lg">
              Run model
            </Button>
          </div>
          {/* Code Section */}
          <div className="flex flex-col bg-[#0B0B0E] rounded-[8px] border border-[#242835]">
            <div className="flex gap-4 px-4 py-[14px] border-b border-b-[#242835]">
              {languages?.map((language) => (
                <Button
                  className={`${
                    activeLang === language?.value
                      ? "bg-[#97AEF3] text-black font-[600]"
                      : "bg-transparent text-[#7782A4] font-[500]"
                  } hover:text-black hover:bg-[#97AEF3] py-4 text-lg`}
                  key={language?.value}
                  onClick={() => setActiveLang(language?.value)}
                >
                  {language?.name}
                </Button>
              ))}
            </div>
            <div className="flex gap-4 px-4 py-[14px]">
              <CopyBlock
                text={code}
                language={activeLang}
                customStyle={{
                  padding: "12px",
                  width: "100%",
                }}
                theme={atomOneDark}
                showLineNumbers={false}
                wrapLongLines
              />
            </div>
          </div>
          {/* Output Section */}
          <div className="flex justify-center bg-[#121218] p-2 rounded-[8px] w-full">
            <Image
              src="/images/default-output.png"
              alt="default-image"
              width={300}
              height={300}
              className="rounded-[4px] w-full h-[263px] object-contain"
            />
          </div>
          <Button className="bg-[#D9E3FF] hover:bg-[#D9E3FF] px-9 py-4 w-full font-[600] text-black text-lg">
            Run lucatso / xtts-v2 with an API
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailPage;
