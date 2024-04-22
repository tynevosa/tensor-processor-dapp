"use client";

import { BillingHistory } from "@/components/billing/billing-history";
import { BillingTokens } from "@/components/billing/billing-tokens";
import { WalletBalance } from "@/components/billing/wallet-balance";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TBillingSchema } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const ITEMS_PER_PAGE = 4;

export default function Page() {
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

  const {
    data: billingHistory,
    fetchStatus: isPending,
    error,
  } = useQuery({
    queryKey: ["billing-history"],
    queryFn: () => axios.get("/api/credit/history").then((res) => res.data),
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(billingHistory?.length / ITEMS_PER_PAGE);

  // Calculate the indices of the first and last items on the current page
  const firstItemIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const lastItemIndex = firstItemIndex + ITEMS_PER_PAGE;

  // Slice the billingHistory array to only include items for the current page
  const currentItems = billingHistory?.slice(firstItemIndex, lastItemIndex);

  // Function to change page
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <ScrollArea className="w-full justify-center items-center">
      <div className="text-white items-center flex flex-col w-full h-[982px] mt-20">
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
          <div>
            {currentItems?.map((history: any, index: string) => (
              <BillingHistory
                key={index}
                created_at={history?.created_at}
                transactionId={history?.transactionId}
                description={history?.description}
                cost={history?.cost}
                type={history?.type}
                token={history?.token}
                logo={history?.logo}
              />
            ))}

            {/* Pagination Controls */}
            <div className="flex justify-end items-center gap-2 my-4 mr-4">
              <button
                className={`px-4 py-2 text-sm font-medium text-white bg-[#121218] rounded-md ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#121218]"
                }`}
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`px-3 py-1 text-sm font-medium rounded-md ${
                      currentPage === pageNumber
                        ? "bg-[#121218] text-white"
                        : "text-[#97aef3] bg-[#121218] hover:bg-[#121218] hover:text-white"
                    }`}
                    onClick={() => goToPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              )}

              <button
                className={`px-4 py-2 text-sm font-medium text-white bg-[#121218] rounded-md ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#121218]"
                }`}
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
