import React, { useEffect, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import Image from "next/image";
import { DialogTrigger } from "@radix-ui/react-dialog";

export const Popup: React.FC = ({}) => {
  //   const { isConnected, address, chainId } = useAccount();

  const [step, setStep] = useState<
    "idle" | "initiating" | "waiting" | "complete" | "failed"
  >("idle");
  const [transactionUrl, setTransactionUrl] = useState("");
  const [transactionInitiated, setTransactionInitiated] = useState(false);
  const [txid, setTxid] = useState("");
  const timer = useRef<NodeJS.Timeout>();
  const [loading, setLoading] = useState(false);

  const [creditsAmount, setCreditsAmount] = useState("");
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreditsAmount(event.target.value);
  };

  const handleConfirm = async () => {
    if (!creditsAmount)
      return toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
    if (
      Number(creditsAmount) <
      Number(process.env.NEXT_PUBLIC_MIN_BUY_CREDIT_AMOUNT)
    )
      return toast({
        title: `Minimum Amount ${process.env.NEXT_PUBLIC_MIN_BUY_CREDIT_AMOUNT} USD`,
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
    setTransactionInitiated(true);
    setStep("initiating");
    setLoading(true);
    const res = await fetch("/api/credit/invoice", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: creditsAmount }),
    });
    if (!res.ok) {
      setStep("failed");
      toast({
        title: "Payment Failed",
        description: "Your payment has failed.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const data = await res.json();
    if (data.url) {
      setTransactionUrl(data.url);
      setTxid(data.tx);
      toast({
        title: "Complete Payment",
        description: "Please complete the payment in the new window.",
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    if (step !== "waiting") return;
    timer.current = setInterval(() => {
      axios
        .get(`/api/credit/invoice`)
        .then((res) => {
          if (res.data.status === "confirmed") {
            clearInterval(timer.current);
            setStep("complete");
            toast({
              title: "Payment Complete",
              description: "Your payment has been completed successfully.",
              duration: 9000,
            });
          } else if (res.data.status === "failed") {
            clearInterval(timer.current);
            setStep("failed");
            toast({
              title: "Payment Failed",
              description: "Your payment has failed.",
              duration: 9000,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching payment status:", error);
          // Handle error, possibly setting step to a 'error' state and showing a toast
        });
    }, 3000);

    // Cleanup function to clear the interval when the component unmounts or step changes
    return () => clearInterval(timer.current);
  }, [step]);

  //   if (!isConnected) {
  //     return (
  //       <div className="bg-black flex flex-col justify-evenly text-center items-center h-[336px] text-white">
  //         <div className="w-full">
  //           <h1 className="text-4xl font-bold">Connect your Wallet</h1>
  //           <p className="text-lg font-semibold text-neutral-500 py-3">
  //             Please Connect the wallet to proceed.
  //           </p>
  //         </div>
  //         <div className="w-full flex flex-col space-y-3">
  //           {/* <ConnectButton /> */}
  //         </div>
  //       </div>
  //     );
  //   }
  return (
    <div className="bg-[#0B0B0E] flex flex-col justify-evenly text-center items-center text-white w-full relative">
      <DialogTrigger className="absolute right-[-24px] top-[-84px] w-20 h-10 text-white z-50 flex items-center justify-end gap-2 cursor-pointer">
        <span>Close</span>
        <Image
          src={"/images/billing/remove-circle.svg"}
          alt="clsose"
          width={18}
          height={18}
        />
      </DialogTrigger>
      <div className="w-full">
        <h1 className="text-3xl font-bold">Top up Wallet</h1>
        <p className="text-lg font-semibold text-[#A1ACC2] py-3">
          Add credits to top up wallet balance
        </p>
      </div>
      <div className="w-full flex border-[#A6A6A6] relative items-center">
        <Input
          placeholder="Enter amount to topup"
          value={creditsAmount}
          type="number"
          onChange={handleAmountChange}
        />
        <span className="absolute right-3">USD</span>
      </div>
      <div className="w-full flex flex-col space-y-3 mt-4">
        {loading ? (
          <Button
            variant="outline"
            onClick={(e: any) => {
              e.preventDefault();
              setStep("waiting");
              window.open(transactionUrl, "_blank", "noopener,noreferrer");
            }}
            className="bg-[#2E2E2E] text-white outline-none border-none rounded-none"
          >
            <div className="flex space-x-2">Complete Payment</div>
          </Button>
        ) : step === "idle" ? (
          <button
            className="bg-[#97AEF3] text-black py-3 px-4 rounded-sm font-bold text-lg flex flex-row justify-center items-center gap-2"
            onClick={handleConfirm}
          >
            <Image
              alt="dollar"
              src={"/images/billing/dollar.svg"}
              width={24}
              height={24}
            />
            Top up
          </button>
        ) : transactionInitiated && step === "initiating" ? (
          <Button
            variant="outline"
            onClick={(e: any) => {
              e.preventDefault();
              setStep("waiting");
              window.open(transactionUrl, "_blank", "noopener,noreferrer");
            }}
            className="bg-[#2E2E2E] text-white outline-none border-none rounded-none"
          >
            Complete Payment
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={(e: any) => {
              e.preventDefault();
              setStep("waiting");

              window.open(transactionUrl, "_blank", "noopener,noreferrer");
            }}
            disabled
            className="bg-[#2E2E2E] text-white outline-none border-none rounded-none"
          >
            Waiting for Payment
          </Button>
        )}
      </div>
    </div>
  );
};
