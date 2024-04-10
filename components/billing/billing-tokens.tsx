import React from "react";

interface BillingTokensProps {
  token: string;
  image: string;
  amount: string;
  value: string;
}

export const BillingTokens: React.FC<BillingTokensProps> = ({
  token,
  image,
  amount,
  value,
}) => {
  return (
    <div className="flex w-full gap-4 bg-[#121218] hover:bg-[#262633c0] p-4 justify-center rounded-[4px] ">
      <div className="flex-1 flex gap-2 items-center    w-full h-full ">
        <img src={image} alt="token" />
        <h1 className="text-lg font-semibold font-chakra-petch "> {token} </h1>
      </div>
      <div className="flex-1 py-1 ">
        {" "}
        <h1 className="text-base font-semibold font-chakra-petch ">
          {" "}
          {amount}{" "}
        </h1>{" "}
      </div>
      <div className="flex-1 flex justify-end py-1 ">
        <h1 className="text-base text-[#BBF7D0] font-semibold font-chakra-petch ">
          {" "}
          {value}{" "}
        </h1>
      </div>
    </div>
  );
};
