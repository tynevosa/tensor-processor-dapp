import { Icons } from "@/components/icons";

export type sideItem = {
  name: string;
  icon: keyof typeof Icons;
  href: string;
};
