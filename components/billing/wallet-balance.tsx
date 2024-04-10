import React from "react";

export const WalletBalance = () => {
  return (
    <div className="w-[520px]  p-6 border border-[#242835] rounded-lg  ">
      <div className="flex justify-between ">
        <div className=" flex flex-col gap-3">
          <h1 className="text-sm font-medium font-chakra-petch text-[#A1ACC2] ">
            Total Wallet Balance
          </h1>
          <h1 className="text-white  font-chakra-petch font-semibold text-4xl ">
            $487.80
          </h1>
        </div>

        <div>
          <button className="bg-[#97AEF3] rounded-lg px-4 flex gap-2 py-3 text-[#0C0C0C] text-lg font-semibold font-chakra-petch justify-center items-center ">
            <img src="/images/billing/addSquare.svg" alt="add" /> Top up
          </button>
        </div>
      </div>

      <div className="w-full flex gap-16  border-t border-[#1F1F28]  mt-11 pt-6  ">
        <div className="flex flex-col gap-3 ">
          <div className="text-[#A1ACC2] flex  items-center gap-2 text-sm font-chakra-petch font-medium ">
            Total Credit Utilized
            <img src="/images/billing/infoCircle.svg" alt="info" />
          </div>
          <h1 className="text-[#EAEAF7] text-2xl font-semibold font-chakra-petch ">
            $1087.90
          </h1>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="text-[#A1ACC2] flex  items-center gap-2 text-sm font-chakra-petch font-medium ">
            Last Bill
            <img src="/images/billing/infoCircle.svg" alt="info" />
          </div>
          <h1 className="text-[#EAEAF7] text-2xl font-semibold font-chakra-petch ">
            $69.00
          </h1>
        </div>
      </div>
    </div>
  );
};
