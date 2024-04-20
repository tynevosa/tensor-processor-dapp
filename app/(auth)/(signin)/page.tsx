"use client";
import Image from "next/image";
import localFont from "next/font/local";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import Logo from "@/public/logo.png";
import Model08 from "@/public/images/model08.png";
import Model10 from "@/public/images/model10.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  metamaskWallet,
  useAddress,
  useAuth,
  useConnect,
  useConnectionStatus,
  useLogin,
  useUser,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { CardCarousel } from "@/components/auth/card-carousel";

const WhyteInktrap = localFont({
  src: "../../../public/fonts/WhyteInktrap.ttf",
});

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// const host = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN;
const metamaskConfig = metamaskWallet();

const Page = () => {
  const router = useRouter();
  const connect = useConnect();
  const connectionStatus = useConnectionStatus();
  const { login } = useLogin();
  const { isLoggedIn } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard/playground");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex items-stretch w-full h-screen">
      <div className="bg-[url(/backgrounds/auth-left.jpg)] lg:flex flex-col justify-stretch items-stretch hidden bg-cover bg-center py-12 w-1/2">
        <div className="flex flex-col flex-grow justify-center items-center gap-12">
          <CardCarousel />
        </div>
        <div className="flex flex-col justify-center items-center font-medium text-white">
          <span>Rune and fine-tune open-source models</span>
          <span>Deploy custom models at scale. All with one line of code</span>
        </div>
      </div>
      <div className="flex flex-col flex-grow justify-center items-center gap-6 bg-[#000510] bg-[url(/backgrounds/auth.png)]">
        <div className="flex flex-col items-center gap-8">
          <Image src={Logo} alt="logo" />
          <div className="flex flex-col justify-center items-center gap-3">
            <span
              className={cn(
                "text-4xl font-bold text-center bg-text-gradient bg-clip-text text-transparent",
                WhyteInktrap.className
              )}
            >
              Welcome back
            </span>
            {/* <span className="font-medium text-white">
              Please enter your details
            </span> */}
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-6 w-96">
          {/* <Form {...form}>
            <form className="flex flex-col items-stretch gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      className="border-[#242835] bg-[#101016] p-2 border rounded-sm h-[42px] font-medium text-white !outline-none !ring-0 !ring-offset-0"
                      placeholder="Email address"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      className="!border-[#242835] bg-[#101016] p-2 border rounded-sm h-[42px] font-medium text-white !outline-none !ring-0 !ring-offset-0"
                      placeholder="Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                )}
              />

              <div className="flex justify-between items-center">
                <Button
                  variant={"link"}
                  className="p-0 h-fit font-medium text-[#97AEF3] text-sm"
                >
                  Forgot password
                </Button>
                <div className="flex justify-end items-center gap-2">
                  <span className="font-medium text-sm text-white">
                    Don&apos;t have an account?
                  </span>
                  <Button
                    variant={"link"}
                    className="p-0 h-fit font-medium text-[#97AEF3] text-sm"
                  >
                    Sign up
                  </Button>
                </div>
              </div>
              <Button
                variant={"secondary"}
                type="submit"
                className="!bg-[#97AEF3] hover:opacity-90 py-[9px] rounded-sm h-[42px] font-semibold text-lg transition-all !outline-none !ring-0 !ring-offset-0"
              >
                Sign in
              </Button>
            </form>
          </Form> */}
          {/* <span className="font-medium text-center text-sm text-white">OR</span> */}

          {connectionStatus === "connected" ? (
            <Button
              onClick={() => login()}
              className="!bg-gradient-to-b from-[#fff] to-[#B3B3B3] py-[9px] !rounded-sm !h-[42px] !font-semibold !text-black !text-lg !outline-none !ring-0 !ring-offset-0"
            >
              {"Sign in with Wallet"}
            </Button>
          ) : (
            <Button
              onClick={() => connect(metamaskConfig)}
              className="!bg-gradient-to-b from-[#fff] to-[#B3B3B3] py-[9px] !rounded-sm !h-[42px] !font-semibold !text-black !text-lg !outline-none !ring-0 !ring-offset-0"
            >
              {"Connect Wallet"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
