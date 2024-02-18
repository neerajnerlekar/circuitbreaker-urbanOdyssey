"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useAccount } from "wagmi";
import NestedLayoutForWallet from "~~/components/NestedLayoutForWallet";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

// Define the type for the place object
type Place = {
  registeredBy: string;
  level: number;
  placeName: string;
  placeType: string;
  faction: number;
};

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

  const { data: myPlacesData } = useScaffoldContractRead({
    contractName: "UrbanOdyssey",
    functionName: "getAllLocations",
  });
  const handleMyPlaces = () => {
    const placesRegisterByUser = myPlacesData?.filter(
      (place: Place) => place.registeredBy == address
    );
    setPlaces(placesRegisterByUser as unknown as Place[]);
  };
  const [places, setPlaces] = React.useState<Place[] | null>(null);

  const { data: allPlacesData } = useScaffoldContractRead({
    contractName: "UrbanOdyssey",
    functionName: "getAllLocations",
  });
 
  const handleAllPlaces = () => {
    const allPlaces = allPlacesData?.filter(
      (place: Place) =>
        place.registeredBy != "0x0000000000000000000000000000000000000000"
    );
    setPlaces(allPlaces as unknown as Place[]);
  };

  const router = useRouter();
  const handleNewPlaceSubmit = () => {
    router.push("/location");
  };
  return (
    <NestedLayoutForWallet>
      <div className="flex h-screen text-black">
        <div className="w-64 flex flex-col p-4 ">
          <button
            className="flex items-center justify-center h-12 w-full bg-blue-500 mb-4"
            onClick={handleNewPlaceSubmit}
          >
            New Place
          </button>
          <button
            className="flex items-center justify-center h-12 w-full bg-blue-500 mb-4"
            onClick={handleMyPlaces}
          >
            My Places
          </button>
          <button
            className="flex items-center justify-center h-12 w-full bg-blue-500 mb-4"
            onClick={handleAllPlaces}
          >
            All Places
          </button>
        </div>

        <div className="flex-1 overflow-auto ">
          <div className="flex justify-around p-4">
            <div className="flex flex-col items-center">
              <span className="icon lightning-bolt"></span>
              <span className="text-black text-3xl">EcoGuardian</span>
              <p className="mt-8 text-1xl font-bold">
                {faction == 0 &&
                  `Your ENERGY Balance is: ${energyBalance?.toString()}`}
              </p>
            </div>
            <div className="flex items-center flex-col justify-start">
              <span className="icon lightning-bolt"></span>
              <span className="text-black text-3xl">TechnoMad</span>
              <p className="mt-39 text-1xl font-bold">
                {faction == 1 &&
                  `Your CHIPS Balance is:${chipsBalance?.toString()} `}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 p-4 ">
            {places?.map((place, index) => {
              const baseIfpsUrl = "https://ipfs.io/ipfs/";
              const { registeredBy, level, placeName, placeType, faction } =
                place;
              return (
                <div
                  className="card w-64 bg-base-100 shadow-xl mb-6 m-10"
                  key={index}
                >
                  <figure>
                    <Image
                      src={`${baseIfpsUrl}bafkreietcrmhbmbutgglkg4g2mg2dep5b4d3ngdkbte4n3s53rzrxwihti`}
                      alt={placeName}
                      width={500}
                      height={150}
                      className="rounded-lg"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-sm">
                      Registered By: <Address address={registeredBy} />
                    </h2>
                    <h2 className="card-title text-xs">
                      Location: {placeName.toLocaleUpperCase()}
                    </h2>
                    <p className="text-sm">
                      Location Type: {placeType.toUpperCase()}
                    </p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">Level: {level}</div>
                      <div className="badge badge-outline">
                        {faction == 0 ? "EcoGuardian" : "TechnoMad"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </NestedLayoutForWallet>
  );
};

export default Page;
