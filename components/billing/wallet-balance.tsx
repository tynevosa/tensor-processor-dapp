import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Popup } from "./pop-up";
import Image from "next/image";

interface WalletBalanceProps {
  balance: number;
  total: number;
}

export const WalletBalance = (props: WalletBalanceProps) => {
  return (
    <div className="w-2/5  p-6 border border-[#242835] rounded-lg  ">
      <div className="flex justify-between items-center">
        <div className=" flex flex-col gap-3">
          <h1 className="text-sm font-medium font-chakra-petch text-[#A1ACC2] ">
            Total Wallet Balance
          </h1>
          <h1 className="text-white  font-chakra-petch font-semibold text-4xl ">
            {`$${props.balance?.toFixed(2)}`}
          </h1>
        </div>
        <Dialog>
          <DialogTrigger className="bg-[#97AEF3] hover:bg-[#8194ced5] py-3 px-3 rounded-lg flex gap-2 text-[#0C0C0C] text-lg font-semibold font-chakra-petch justify-center items-center ">
            <Image
              src="/images/billing/addSquare.svg"
              alt="add"
              width={24}
              height={24}
            />{" "}
            Top up
          </DialogTrigger>
          <DialogContent className="bg-[#0B0B0E] border-[#242835] rounded-none w-[668px]">
            <Popup />
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full flex gap-16  border-t border-[#1F1F28]  mt-11 pt-6  ">
        <div className="flex flex-col gap-3 ">
          <div className="text-[#A1ACC2] flex  items-center gap-2 text-sm font-chakra-petch font-medium ">
            Total Credit Utilized
            <Image
              src="/images/billing/infoCircle.svg"
              alt="info"
              width={24}
              height={24}
            />
          </div>
          <h1 className="text-[#EAEAF7] text-2xl font-semibold font-chakra-petch ">
          {`$${props.total?.toFixed(2)}`}
          </h1>
        </div>
        {/* <div className="flex flex-col gap-3 ">
          <div className="text-[#A1ACC2] flex  items-center gap-2 text-sm font-chakra-petch font-medium ">
            Last Bill
            <Image
              src="/images/billing/infoCircle.svg"
              alt="info"
              height={24}
              width={24}
            />
          </div>
          <h1 className="text-[#EAEAF7] text-2xl font-semibold font-chakra-petch ">
            $69.00
          </h1>
        </div> */}
      </div>
    </div>
  );
};
