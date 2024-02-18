"use client";

import { Wallet, hashMessage } from "ethers";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "~~/components/scaffold-eth/Input/TextInput";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function Home() {
  const methods = useForm();

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "UrbanOdyssey",
    functionName: "registerPlayer",
    args: ["", "", "0x", "0x", 1],
    onBlockConfirmation: (txnReceipt) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Register button clicked");
    const msg = `Register`;
    const msgHash = hashMessage(msg);
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || "";
    const wallet = new Wallet(privateKey);
    console.log("Address corresponding to private key:", wallet.address);
    const signature = await wallet.signMessage(arrayify(msgHash));
    console.log({
      msgHash: msgHash,
      signature: signature,
    });

    if (msgHash && signature) {
      writeAsync({
        args: [
          data.name,
          data.homeTown,
          msgHash as `0x${string}`,
          signature as `0x${string}`,
          1,
        ],
      });
      console.log("Data submitted", data);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-lg mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            {/* Existing TextInput fields */}
            <TextInput name="name" label="Name" type="text" />
            <TextInput name="homeTown" label="HomeTown" type="text" />

            <div className="mb-4">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Team
              </span>
              <label className="inline-flex items-center mr-4">
                <input
                  {...methods.register("team")}
                  type="radio"
                  value="EcoGuardian"
                  className="form-radio"
                />
                <span className="ml-2">EcoGuardian</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...methods.register("team")}
                  type="radio"
                  value="TechnoMad"
                  className="form-radio"
                />
                <span className="ml-2">TechnoMad</span>
              </label>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
              disabled={isLoading}>
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>Register</>
              )}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

function arrayify(msgHash: string): Uint8Array {
  return new Uint8Array(Buffer.from(msgHash.slice(2), "hex"));
}
