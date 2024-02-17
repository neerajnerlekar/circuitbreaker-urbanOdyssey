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

        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>
        <div className="w-2/3">
          <DynamicMap />
        </div>
      </div>
    </>
  );
};

export default Home;
