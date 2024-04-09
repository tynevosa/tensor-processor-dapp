import Image from "next/image";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Props = {};

const carouselItems = [
  {
    runs: "50K",
    name: "Cooperate Detective Cat",
    desc: "Investigator detective cat, officially solving money laundering cases",
  },
  {
    runs: "32K",
    name: "Space Monkey - Scientist",
    desc: "hi fidelity image, space monkey, investigator, NFt image",
  },
  {
    runs: "110K",
    name: "Pixel Art - Cyberpunk",
    desc: "cyberpunk alien attack on new york city, pixel art",
  },
  {
    runs: "20K",
    name: "Abstract Pisces",
    desc: "underwater world, imaginative creatures, pisces of different shape, planet and lifestyle",
  },
  {
    runs: "89K",
    name: "Asgard Defender",
    desc: "abstract thor, god of ligthning, asgard throne, warriors and defenders of asgard nation",
  },
  {
    runs: "5K",
    name: "Futuristic Starbucks Stor",
    desc: "abstract futuristic starbucks store, autobot delivery process, drone use",
  },
  {
    runs: "98K",
    name: "Mars Armageddon",
    desc: "mars eclipse, thunderstorm, sandstorm, thunder rumbling,lightning, armageddon day on Mars",
  },
  {
    runs: "13K",
    name: "Red haired Hero",
    desc: "Indian jones, demi god, tooth sayer, red haired warriors",
  },
  {
    runs: "8K",
    name: "Japanese Samurai Family",
    desc: "Japanese family, inheritance, samurai ninja generation, snow filled house cold weather",
  },
  {
    runs: "46K",
    name: "Bumble Bee, Cypherpunked",
    desc: "bumble bee, transformers cybepunk styled theme.",
  },
];

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
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent className="">
            {carouselItems?.map((item, i) => (
              <CarouselItem key={i} className="flex flex-col gap-4">
                <div className="relative">
                  <Image
                    alt="model"
                    src={`/images/model/model-${i + 1}.png`}
                    width={312}
                    height={264}
                  />
                  <span className="top-1 right-4 absolute font-semibold text-white text-xl leading-6">
                    {item.runs} runs
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold text-white text-xl leading-6">
                    {item.name}
                  </h1>
                  <p className="font-semibold text-[#ABB5C9] text-sm leading-6">
                    {item.desc}
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
