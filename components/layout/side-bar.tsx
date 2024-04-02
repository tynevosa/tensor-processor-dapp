"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.png";
import logoText from "@/public/logo-text.png";
import { Icons } from "../icons";
import { Separator } from "../ui/separator";
import { sideItems } from "@/constants/constant";
import { cn } from "@/lib/utils";

import "@/styles/style.css";
import { useAddress } from "@thirdweb-dev/react";

type SidebarItemProps = {
  title: string;
  icon: keyof typeof Icons;
  href: string;
  selected?: boolean;
};

const SidebarItem = ({
  title,
  icon,
  href,
  selected = false,
}: SidebarItemProps) => {
  const path = usePathname();
  const Icon = Icons[icon];

  const focused = selected || path.includes(href);

  return (
    <div
      className={cn(
        "relative side-item transition-all transition-duration-500 ",
        { "side-item-hover": focused }
      )}
    >
      <Link href={href}>
        <div
          className={cn("w-full flex gap-2 items-center p-4", {
            "bg-item-gradient": focused,
          })}
        >
          <Icon color={focused ? "#97AEF3" : "white"} size={24} />
          <span className="font-semibold text-md leading-6 text-white">
            {title}
          </span>
        </div>
      </Link>
    </div>
  );
};

export const Sidebar = () => {
  const address = useAddress();

  const normalizeAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="h-screen  lg:flex hidden gap-0">
      <div className="flex flex-col h-full w-64 p-8 gap-24 bg-[#000510]">
        <div className="flex gap-3 items-center">
          <Image src={logo} alt="Logo" priority />
          <Image src={logoText} alt="Logo Text" />
        </div>
        <div className="flex-grow flex flex-col gap-6 items-stretch">
          {sideItems.map((item, idx) => (
            <SidebarItem
              key={idx}
              title={item.name}
              icon={item.icon}
              href={item.href}
            />
          ))}
        </div>

        <SidebarItem
          title={address ? normalizeAddress(address) : "Loading ..."}
          icon="userRound"
          href="/dashboard"
          selected
        />
      </div>
      <Separator orientation="vertical" className="bg-gray-800" />
    </div>
  );
};
