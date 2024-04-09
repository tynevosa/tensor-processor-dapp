"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navItems } from "@/constants/constant";
import { cn } from "@/lib/utils";
import logoText from "@/public/logo-text.png";
import logo from "@/public/logo.png";
import {
  useAddress,
  useLogout,
  useSetIsWalletModalOpen,
  useSetWalletModalConfig,
} from "@thirdweb-dev/react";
import { Copy, Power } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

type NavbarItemProps = {
  title: string;
  icon: string;
  href: string;
  selected?: boolean;
};

const NavbarItem = ({
  title,
  icon,
  href,
  selected = false,
}: NavbarItemProps) => {
  const path = usePathname();
  const focused = selected || path.includes(href);

  return (
    <div
      className={cn(
        "relative side-item transition-all transition-duration-500 ",
        { "side-item-hover": focused },
      )}
    >
      <Link href={href}>
        <div
          className={cn("w-full flex gap-2 items-center p-4", {
            // "bg-item-gradient": focused,
          })}
        >
          {/* <span className="text-white"> */}
          <Image
            src={icon}
            alt="image"
            height={25}
            width={25}
            style={{
              width: "auto",
              height: "auto",
              filter: focused
                ? "invert(92%) saturate(10000%) hue-rotate(203deg)"
                : "none",
            }}
          />
          {/* </span> */}
          <span
            className={cn("font-semibold text-md leading-6 text-gray-400", {
              "text-white": focused,
            })}
          >
            {title}
          </span>
        </div>
      </Link>
    </div>
  );
};

export const Header = () => {
  const profile = "/images/navbar/profile.svg";
  const address = useAddress();
  const copy = (str: string) => {
    navigator.clipboard.writeText(str);
  };
  const { logout, isLoading } = useLogout();
  const router = useRouter();
  return (
    <div className="flex justify-between items-center border-[#242835] bg-[#000510] px-8 py-4 border-b w-full text-white">
      <div className="flex justify-start items-center gap-3 w-3/12">
        <Image src={logo} alt="Logo" priority />
        <Image src={logoText} alt="Logo Text" />
      </div>
      <div className="lg:flex flex-row justify-center gap-7 hidden w-6/12">
        {navItems.map((item, idx) => (
          <NavbarItem
            key={idx}
            title={item.name}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </div>
      <div className="flex justify-end w-3/12">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="px-8 py-6 font-semibold text-lg"
              variant={"secondary"}
            >
              {address?.substring(0, 6) +
                "..." +
                address?.substring(address.length - 4)}
              <Image
                src={profile}
                width={20}
                height={30}
                style={{ width: "auto", height: "auto" }}
                className="ml-1"
                alt="profile"
                priority
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-3 border-[#242835] bg-[#01050E] p-4 border rounded-[12px] w-56">
            <p className="flex justify-between items-center font-semibold text-[#A1ACC2] text-base leading-6">
              {address?.substring(0, 6) +
                "..." +
                address?.substring(address.length - 4)}
              <Copy
                size={16}
                className="text-white translate-y-[-1px] cursor-pointer"
                onClick={() => copy(address as string)}
              />
            </p>
            <DropdownMenuSeparator className="bg-[#181D24]" />
            <p className="hover:bg-[#0E1117] px-3 py-2 rounded-[4px] font-semibold text-[#DADFEA] text-base leading-6">
              Billing
            </p>
            <p
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="flex items-center gap-[5px] hover:bg-[#0E1117] px-3 py-2 rounded-[4px] font-semibold text-[#DADFEA] text-base leading-6 cursor-pointer"
            >
              <Power size={16} className="translate-y-[-1px]" /> Log out
            </p>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
