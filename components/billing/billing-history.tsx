import React from "react";
interface BillingHistoryProps {
  date: string;
  transactionId: string;
  description: string;
  cost: number;
  type: number;
  token: string;
  logo: string;
}

export const BillingHistory: React.FC<BillingHistoryProps> = ({
  date,
  transactionId,
  description,
  cost,
  type,
  token,
  logo,
}) => {
  return (
    <div className="px-6 flex font-chakra-petch py-8 border-b border-[#1A1A22] w-full ">
      <div className="flex-1 text-lg font-semibold  ">{date}</div>
      <div className=" flex-1 text-ellipsis pr-5 text-lg text-[#97AEF3] overflow-hidden font-semibold ">
        {transactionId}
      </div>
      <div className="flex-1 text-lg font-semibold">{description}</div>
      <div
        className={`flex-1 text-lg font-semibold  ${
          type === 1 ? "text-[#BBF7D0]" : "text-[#FECACA]"
        } `}
      >
        {type === 1 ? "+" : "-"}
        {cost.toFixed(2)} USD
      </div>
      <div className="flex-1 flex gap-2 items-center ">
        <img src={logo} alt="logo" width={22} height={22} />
        <h1 className="text-base font-semibold ">{token}</h1>
      </div>
    </div>
  );
};
