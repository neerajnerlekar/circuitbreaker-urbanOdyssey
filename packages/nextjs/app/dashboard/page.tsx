"use client";

import { log } from "console";
import { useRouter } from "next/navigation";
import React from "react";
import { useAccount } from "wagmi";
import NestedLayoutForWallet from "~~/components/NestedLayoutForWallet";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Page = () => {
  const { address, isConnected } = useAccount();
  const { data: myData } = useScaffoldContractRead({
    contractName: "UrbanOdyssey",
    functionName: "players",
    args: [address],
  });

  const { data: energyBalance } = useScaffoldContractRead({
    contractName: "UrbanOdyssey",
    functionName: "getENERGYBalance",
    args: [address],
  });

  const { data: chipsBalance } = useScaffoldContractRead({
    contractName: "UrbanOdyssey",
    functionName: "getCHIPSBalance",
    args: [address],
  });

  const faction = myData?.[5];
  faction == 0 ? chipsBalance : energyBalance;

  const router = useRouter();
  const handleNewPlaceSubmit = () => {
    console.log("clicked");
    router.push("/location");
  };
  return (
    <NestedLayoutForWallet>
      <div className="flex h-screen text-black">
        <div className="w-64 flex flex-col p-4">
          <button
            className="flex items-center justify-center h-12 w-full bg-blue-500 mb-4"
            onClick={handleNewPlaceSubmit}>
            New Place
          </button>
          <button className="flex items-center justify-center h-12 w-full bg-blue-500 mb-4">
            My Places
          </button>
          <button className="flex items-center justify-center h-12 w-full bg-blue-500 mb-4">
            All Places
          </button>
        </div>

        <div className="flex-1 flex flex-col ">
          <div className="flex justify-around p-4">
            <div className="flex flex-col items-center">
              <span className="icon lightning-bolt"></span>
              <span className="text-black text-3xl">My Solarpunk places</span>
              <p className="mt-8 text-1xl font-bold">
                {faction == 1
                  ? `Your CHIPS Balance is:${chipsBalance?.toString()} `
                  : `Your ENERGY Balance is: ${energyBalance?.toString()}`}
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="icon lightning-bolt"></span>
              <span className="text-black text-3xl">My Cyberpunk places</span>
            </div>
          </div>
        </div>
      </div>
    </NestedLayoutForWallet>
  );
};

export default Page;
