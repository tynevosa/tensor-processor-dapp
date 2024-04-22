import React from "react";
interface BillingHistoryProps {
  created_at: string;
  transactionId: string;
  description: string;
  cost: number;
  type: number;
  token: string;
  logo: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};

export const BillingHistory: React.FC<BillingHistoryProps> = ({
  created_at,
  transactionId,
  description,
  cost,
  type,
  token,
  logo,
}) => {
  const formattedDate = formatDate(created_at);
  return (
    <div className="px-6 flex font-chakra-petch py-8 border-b  border-[#1A1A22] w-full ">
      <div className="flex-1 text-lg font-semibold text-white">
        {formattedDate}
      </div>
      <div className=" flex-1 text-ellipsis pr-5 text-lg text-[#97AEF3] overflow-hidden font-semibold ">
        0xde345hrt54645g343433...
      </div>
      <div className="flex-1 text-lg font-semibold">RTX4090 - 20hrs</div>
      <div
        className={`flex-1 text-lg font-semibold  ${
          type === 1 ? "text-[#BBF7D0]" : "text-[#FECACA]"
        } `}
      >
        {type === 1 ? "+" : "-"}
        {cost?.toFixed(2)} USD
      </div>
      <div className="flex-1 flex gap-2 items-center ">
        <img
          src={"/images/billing/Tether.svg"}
          alt="logo"
          width={22}
          height={22}
        />
        <h1 className="text-base font-semibold ">{token}</h1>
      </div>
    </div>
  );
};
