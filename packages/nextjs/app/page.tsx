"use client";

// import Link from "next/link";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const { isConnected } = useAccount();


  const handleSubmit = () => {
    console.log("clicked");
    // Check for the status of the user info and allow the user to play the game and set the navigation accordingly
  }
  return (
    <div className="text-black text-center pt-20 ">
  <h1 className="text-6xl">
    Welcome to Urban Odyssey
  </h1>

  {isConnected ? (
    <div className="mt-10 p-4  justify-center items-center h-screen">
    
      <button className="px-6 py-3 bg-blue-700 text-white rounded hover:bg-blue-800 transition duration-150 ease-in-out" onSubmit={handleSubmit}>
        Play Game
      </button>
    </div>
  ) : (
    <div className="mt-10 p-4  justify-center items-center h-screen ">
      <p className="text-xl">Please connect the wallet to play the game</p>
    </div>
  )}
</div>
  );
};

export default Home;
