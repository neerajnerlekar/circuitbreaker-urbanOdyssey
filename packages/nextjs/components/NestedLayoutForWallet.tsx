import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React, { ReactElement, use } from "react";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const NestedLayoutForWallet = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      localStorage.getItem("isRegistered") == "true" &&
      pathname == "/registration"
    ) {
      router.push("/dashboard");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{children}</div>;
};

export default NestedLayoutForWallet;
