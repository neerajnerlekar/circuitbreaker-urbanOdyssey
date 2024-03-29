"use client";

import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { useAccount } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useDarkMode } from "~~/hooks/scaffold-eth/useDarkMode";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(
    (state) => state.setNativeCurrencyPrice
  );
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const pathName = usePathname();
  const { data: myData } = useScaffoldContractRead({
    contractName: "UrbanOdyssey",
    functionName: "isRegistered",
    args: [address],
  });

  useEffect(() => {
    if (pathName == "/debug") {
      router.push("/debug");
    } else if (isConnected) {
      if (myData) {
        localStorage.setItem("isRegistered", "true");
      }
    } else {
      localStorage.clear();
      // // Redirect to the new page if the wallet is disconnected
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, router]);
  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-[url('../public/b1.png')]  bg-cover ">
        <Header />
        <main className="relative flex flex-col flex-1 ">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export const ScaffoldEthAppWithProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <WagmiConfig config={wagmiConfig}>
      <ProgressBar />
      <RainbowKitProvider
        chains={appChains.chains}
        avatar={BlockieAvatar}
        theme={isDarkMode ? darkTheme() : lightTheme()}>
        <ScaffoldEthApp>{children}</ScaffoldEthApp>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
