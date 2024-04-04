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

const WhyteInktrap = localFont({
  src: "../../../public/fonts/WhyteInktrap.ttf",
});

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const host = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN;
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
      router.push("/dashboard/models");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex w-full h-screen items-stretch">
      <div className="lg:flex hidden w-1/2 bg-center bg-cover bg-auth flex-col items-stretch justify-stretch py-12">
        <div className="flex-grow flex flex-col justify-center items-center gap-12">
          <div className="flex gap-4 col-span-1 bg-[#121218] p-2 rounded-[8px] w-96 lg:mr-32">
            <Image alt="model" src={Model08} width={160} height={160} />
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
                    {`lucataco / xtts-v2`}
                  </h2>
                </div>
                <p className="font-[400] text-sm text-white">
                  Coqui XTTS-v2: Multilingual Text To Speech Voice Cloning
                </p>
              </div>
              <p className="font-[600] text-[#7D9EFF] text-sm">50K runs</p>
            </div>
          </div>

          <div className="flex gap-4 col-span-1 bg-[#121218] p-2 rounded-[8px] w-96 lg:ml-32 ">
            <Image alt="model" src={Model10} width={160} height={160} />
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
                    {`lucataco / xtts-v2`}
                  </h2>
                </div>
                <p className="font-[400] text-sm text-white">
                  Coqui XTTS-v2: Multilingual Text To Speech Voice Cloning
                </p>
              </div>
              <p className="font-[600] text-[#7D9EFF] text-sm">50K runs</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-white font-medium">
          <span>Rune and fine-tune open-source models</span>
          <span>Deploy custom models at scale. All with one line of code</span>
        </div>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center gap-6 bg-[#000510]">
        <div className="flex flex-col items-center gap-8">
          <Image src={Logo} alt="logo" />
          <div className="gap-3 flex flex-col justify-center items-center">
            <span
              className={cn(
                "text-4xl font-bold text-center bg-text-gradient bg-clip-text text-transparent",
                WhyteInktrap.className
              )}
            >
              Welcome back
            </span>
            <span className="text-white font-medium">
              Please enter your details
            </span>
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-6 w-96">
          <Form {...form}>
            <form className="flex flex-col gap-4 items-stretch">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      className="bg-[#101016] p-2 text-white font-medium h-[42px] rounded-sm border border-[#242835] !outline-none !ring-0 !ring-offset-0"
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
                      className="bg-[#101016] p-2 text-white font-medium h-[42px] rounded-sm border !border-[#242835] !outline-none !ring-0 !ring-offset-0"
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
                  className="text-sm font-medium p-0 h-fit text-[#97AEF3]"
                >
                  Forgot password
                </Button>
                <div className="flex gap-2 justify-end items-center">
                  <span className="text-sm font-medium text-white">
                    Don&apos;t have an account?
                  </span>
                  <Button
                    variant={"link"}
                    className="text-sm font-medium p-0 h-fit text-[#97AEF3]"
                  >
                    Sign up
                  </Button>
                </div>
              </div>
              <Button
                variant={"secondary"}
                type="submit"
                className="text-lg font-semibold py-[9px] h-[42px] rounded-sm !outline-none !ring-0 !ring-offset-0 !bg-[#97AEF3] hover:opacity-90 transition-all"
              >
                Sign in
              </Button>
            </form>
          </Form>
          <span className="text-white text-center text-sm font-medium">OR</span>

          {connectionStatus === "connected" ? (
            <Button
              onClick={() => login()}
              className="!text-lg !font-semibold py-[9px] !h-[42px] !rounded-sm !outline-none !ring-0 !ring-offset-0"
            >
              {"Sign in with Wallet"}
            </Button>
          ) : (
            <Button
              onClick={() => connect(metamaskConfig)}
              className="!text-lg !font-semibold py-[9px] !h-[42px] !rounded-sm !outline-none !ring-0 !ring-offset-0"
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
