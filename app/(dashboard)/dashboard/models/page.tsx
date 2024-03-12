import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Models } from "@/constants/constant";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <ScrollArea className="w-full h-full">
      <div className="px-6 py-12 w-full h-full">
        <h1 className="font-bold text-3xl text-white">My Models</h1>
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6">

          {Models.map(
            (
              {
                imgSrc = "/images/model.svg",
                description,
                model_name,
                model_number,
              },
              key
            ) => (
              <Link
                href={`/dashboard/models/${key}`}
                key={key}
                className="flex gap-4 col-span-1 bg-[#121218] p-2 rounded-[8px]"
              >
                <Image alt="model" src={imgSrc} width={160} height={160} />
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                      <Avatar className="rounded-none !w-5 ">
                        <AvatarImage
                          className="!w-5 !h-5 rounded-full"
                          src="/images/model-avatar.png"
                        />
                      </Avatar>
                      <h2 className="font-[600] text-sm text-white">
                        {`tpu / ${model_name}`}
                      </h2>
                    </div>
                    <p className="font-[400] text-sm text-white">
                      {description}
                    </p>
                  </div>
                  <p className="font-[600] text-[#7D9EFF] text-sm">
                    {`${
                      model_number > 1000
                        ? (model_number / 1000).toFixed(1) + "K"
                        : model_number
                    } runs`}
                  </p>
                </div>
              </Link>
            )
          )}

        </div>
      </div>
    </ScrollArea>
  );
}
