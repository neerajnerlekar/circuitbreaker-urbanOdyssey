"use client"

import React from "react";

const page = () => {
  const handleNewPlaceSubmit = () => {
    console.log("clicked");
    // router.push("/dashboard");
    // Check for the status of the user info and allow the user to play the game and set the navigation accordingly
  };
  return (
    <div className="flex h-screen text-black">
      <div className="w-64 flex flex-col p-4">
        <button
          className="flex items-center justify-center h-12 w-full bg-blue-500 mb-4"
          onClick={handleNewPlaceSubmit}
          
        >
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
          <div className="flex items-center">
            <span className="icon lightning-bolt"></span>
            <span className="text-black text-3xl">My Solarpunk places</span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="icon lightning-bolt"></span>
            <span className="text-black text-3xl">My Cyberpunk places</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
