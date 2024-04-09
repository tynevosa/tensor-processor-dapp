import Image from "next/image";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Props = {};

export const CardCarousel = (props: Props) => {
  return (
    <div className="bg-[url(/backgrounds/card.png)] bg-cover bg-center p-4 rounded-[16px] w-[344px]">
      <div className="flex flex-col gap-3">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 2500,
            }),
          ]}
        >
          <CarouselContent className="">
            {[1, 2, 3]?.map((item) => (
              <CarouselItem key={item}>
                <div className="relative">
                  <Image
                    alt="model"
                    src="/images/model/model-1.png"
                    width={312}
                    height={264}
                  />
                  <span className="top-1 right-4 absolute font-semibold text-white text-xl leading-6">
                    50K runs
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold text-white text-xl leading-6">
                    Cooperate Detective Cat
                  </h1>
                  <p className="font-semibold text-[#ABB5C9] text-sm leading-6">
                    Investigator detective cat, officially solving money
                    laundering cases
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};
