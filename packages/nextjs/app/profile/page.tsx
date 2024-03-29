"use client";

import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import NestedLayoutForWallet from "~~/components/NestedLayoutForWallet";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const DynamicMap = dynamic(() => import("~~/components/Map"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [location, setLocation] = useState({
    coords: { latitude: 0, longitude: 0 },
  });

  const { address, isConnected } = useAccount();
  const { data: playerData } = useScaffoldContractRead({
    contractName: "UrbanOdyssey",
    functionName: "players",
    args: [address],
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      console.log(e);
      setLocation(e);
    });
  }, []);

  return (
    <NestedLayoutForWallet>
      <div className="flex items-center flex-col flex-grow pt-10">
        {isConnected && playerData && (
          <div className="bg-gray-200 p-4">
            <h1 className="text-2xl font-bold">Player Info</h1>
            <div className="flex space-x-4">
              <div className="">
                {playerData[5] === 1 ? (
                  <Image
                    src="/technoMadLogo.jpg"
                    alt="technoMadLogo"
                    width={150}
                    height={150}
                  />
                ) : (
                  <Image
                    src="/ecoGuardianLogo.jpg"
                    alt="ecoGuardianLogo"
                    width={150}
                    height={150}
                  />
                )}
              </div>
              <div className="mb-1">
                <div className="mb-1">
                  <div className="mb-2">
                    <h4 className="mb-1">
                      <strong>Name:</strong> {String(playerData[3])}
                    </h4>
                  </div>
                  <div className="mb-2">
                    <h4 className="mb-1">
                      <strong>Hometown:</strong> {String(playerData[4])}
                    </h4>
                  </div>
                  <div className="mb-2">
                    <h4 className="mb-1">
                      <strong>Verified Places:</strong> {String(playerData[0])}
                    </h4>
                  </div>
                  <div className="mb-2">
                    <h4 className="mb-1">
                      <strong>Registered Places:</strong>{" "}
                      {String(playerData[1])}
                    </h4>
                  </div>
                  <div className="mb-2">
                    <h4 className="mb-1">
                      <strong>Is Verified:</strong>{" "}
                      {Boolean(playerData[2]) ? "Yes" : "No"}
                    </h4>
                  </div>
                  <div>
                    <h4 className="mb-1">
                      <strong>Faction:</strong>{" "}
                      {playerData[5] === 1 ? "TechnoMad" : "EcoGuardian"}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="w-2/3 mt-6">
          {location?.coords?.latitude !== 0 && (
            <DynamicMap
              position={[
                location?.coords?.latitude,
                location?.coords?.longitude,
              ]}
            />
          )}
        </div>
      </div>
    </NestedLayoutForWallet>
  );
};

export default Home;
