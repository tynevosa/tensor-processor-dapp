import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <ScrollArea className="w-full h-full">
      <div className="px-6 py-12 w-full h-full">
        <h1 className="font-bold text-3xl text-white">My Models</h1>
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]?.map((item) => (
            <Link
              href={`/dashboard/models/${item}`}
              key={item}
              className="flex gap-4 col-span-1 bg-[#121218] p-2 rounded-[8px]"
            >
              <Image
                alt="model"
                src="/images/model.svg"
                width={160}
                height={160}
              />
              <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <Image
                      alt="model-avatar"
                      src="/images/model-avatar.png"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <h2 className="font-[600] text-sm text-white">
                      lucataco / xtts-v2
                    </h2>
                  </div>
                  <p className="font-[400] text-sm text-white">
                    Coqui XTTS-v2: Multilingual Text To Speech Voice Cloning
                  </p>
                </div>
                <p className="font-[600] text-[#7D9EFF] text-sm">50k runs</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
