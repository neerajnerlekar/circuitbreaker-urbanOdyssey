"use client";

import DynamicMap from "../../components/Map";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { data: myData } = useScaffoldContractRead({
    contractName: "UrbanOdyssey",
    functionName: "players",
    args: [address],
  });
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        {isConnected && (
          <h1 className="text-2xl font-bold">
            Player INfo {myData?.toString()}
            <br />
            {address}
          </h1>
        )}

        <div className="w-2/3">
          <DynamicMap />
        </div>
      </div>
    </>
  );
};

export default Home;
