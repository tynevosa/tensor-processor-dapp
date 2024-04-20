import { BillingHistory } from "@/components/billing/billing-history";
import { BillingTokens } from "@/components/billing/billing-tokens";
import { WalletBalance } from "@/components/billing/wallet-balance";
import { ScrollArea } from "@/components/ui/scroll-area";

const page = () => {
  const billing_tokens = [
    {
      token: "USDT",
      image: "/images/billing/Tether.svg",
      amount: "208.78",
      value: "$208.880",
    },
    {
      token: "USDC",
      image: "/images/billing/USDC.svg",
      amount: "180.20",
      value: "$179.79",
    },
    {
      token: "DAI",
      image: "/images/billing/Dai.svg",
      amount: "100.10",
      value: "$101.02",
    },
  ];

  const billing_history = [
    {
      date: "Feb 13, 2024   19: 24: 00",
      transactionId: "0xde345hrt54645g343433...",
      description: "Top up",
      cost: 24.76,
      type: 1,
      token: "DAI",
      logo: "/images/billing/Dai.svg",
    },
    {
      date: "Feb 13, 2024   19: 24: 00",
      transactionId: "0xde345hrt54645g343433...",
      description: "RTX4090 - 20hrs",
      cost: 21.0,
      type: 0,
      token: "DAI",
      logo: "/images/billing/Dai.svg",
    },
    {
      date: "Feb 13, 2024   19: 24: 00",
      transactionId: "0xde345hrt54645g343433...",
      description: "Top up",
      cost: 24.76,
      type: 1,
      token: "USDC",
      logo: "/images/billing/USDC.svg",
    },
    {
      date: "Feb 13, 2024   19: 24: 00",
      transactionId: "0xde345hrt54645g343433...",
      description: "RTX4090 - 20hrs",
      cost: 10.0,
      type: 0,
      token: "USDT",
      logo: "/images/billing/Tether.svg",
    },
  ];

  return (
    <ScrollArea className="w-full justify-center items-center  ">
      <div className="text-white justify-center items-center flex flex-col w-full h-[982px]    ">
        <div className="flex w-4/5 gap-6 mb-16 ">
          {" "}
          <WalletBalance />
          <div className="w-3/5 gap-2 flex flex-col p-4 bg-[#0B0B0E] border border-[#242835] rounded-lg   ">
            {billing_tokens.map((token, index) => (
              <BillingTokens
                key={index}
                token={token.token}
                image={token.image}
                amount={token.amount}
                value={token.value}
              />
            ))}
          </div>
        </div>
        <div className="w-4/5 mb-6 ">
          <h1 className="text-2xl font-bold font-chakra-petch  ">
            Billing History
          </h1>
        </div>
        <div className="w-4/5 gap-2 flex border border-[#242835] rounded-lg flex-col">
          {" "}
          <div className=" w-full flex gap-6 py-5 px-6 items-start  border-b border-[#363D52] bg-[#121218]  ">
            <div className="flex-1 text-lg font-chakra-petch font-semibold text-[#CBCBCB] ">
              Date
            </div>
            <div className="flex-1 text-lg font-chakra-petch font-semibold text-[#CBCBCB] ">
              Transaction
            </div>
            <div className="flex-1 text-lg font-chakra-petch font-semibold text-[#CBCBCB] ">
              Description
            </div>
            <div className="flex-1 text-lg font-chakra-petch font-semibold text-[#CBCBCB] ">
              Cost
            </div>
            <div className="flex-1 text-lg font-chakra-petch font-semibold text-[#CBCBCB] ">
              token
            </div>
          </div>
          {billing_history.map((history, index) => (
            <BillingHistory
              key={index}
              date={history.date}
              transactionId={history.transactionId}
              description={history.description}
              cost={history.cost}
              type={history.type}
              token={history.token}
              logo={history.logo}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default page;
