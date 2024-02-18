import { useRouter } from "next/navigation";
import React, { ReactElement, use } from "react";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const NestedLayoutForWallet = ({ children }: { children: ReactElement }) => {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  const { data: myData } = useScaffoldContractRead({
    contractName: "UrbanOdyssey",
    functionName: "isRegistered",
    args: [address],
  });
  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    } else if (!myData) {
      router.push("/registration");
    }
  }, []);

  return <div>{children}</div>;
};

export default NestedLayoutForWallet;
