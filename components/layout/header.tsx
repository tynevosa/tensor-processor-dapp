"use client";
import Image from "next/image";
import logo from "@/public/logo.png";
import logoText from "@/public/logo-text.png";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { navItems } from "@/constants/constant";
import ProfileSvg from "/images/navbar/profile.svg";

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
        { "side-item-hover": focused }
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
  return (
    <div className="bg-[#000510] text-white py-4 px-8 justify-between items-center flex border-b border-[#242835] w-full">
      <div className="flex gap-3 justify-start items-center w-3/12">
        <Image src={logo} alt="Logo" priority />
        <Image src={logoText} alt="Logo Text" />
      </div>
      <div className="hidden lg:flex flex-row w-6/12 justify-center gap-7">
        {navItems.map((item, idx) => (
          <NavbarItem
            key={idx}
            title={item.name}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </div>
      <div className="w-3/12 justify-end flex">
        <Button
          className="text-lg font-semibold px-8 py-6"
          variant={"secondary"}
        >
          Profile
          <Image
            src={profile}
            width={20}
            height={30}
            style={{ width: "auto", height: "auto" }}
            className="ml-1"
            alt="profile"
            priority
          />
          {/* <ProfileSvg /> */}
        </Button>
      </div>
    </div>
  );
};
