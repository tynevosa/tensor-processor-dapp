import { sideItem } from "@/types/type";

export const sideItems: sideItem[] = [
  {
    href: "/dashboard/models",
    icon: "boxes",
    name: "Models",
  },
  {
    href: "/dashboard/marketplace",
    icon: "trendingUp",
    name: "Marketplace",
  },
  {
    href: "/dashboard/editor",
    icon: "layoutDashboard",
    name: "editor",
  },
  {
    href: "/dashboard/instance",
    icon: "layoutDashboard",
    name: "Instance",
  },
];

export const gpuItems: string[] = ["any", "0x", "1x", "2x", "4x", "8x", "8x+"];
