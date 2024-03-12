import { Icons } from "@/components/icons";

export type sideItem = {
  name: string;
  icon: keyof typeof Icons;
  href: string;
};

export type GPUType = "ask" | "reserved" | "bid";

export type GPUNumberRange = {
  gte?: number;
  lte?: number;
};
