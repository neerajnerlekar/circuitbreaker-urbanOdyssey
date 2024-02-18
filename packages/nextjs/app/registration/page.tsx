"use client";

import { Wallet, hashMessage } from "ethers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import NestedLayoutForWallet from "~~/components/NestedLayoutForWallet";
import TextInput from "~~/components/scaffold-eth/Input/TextInput";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function Home() {
  const methods = useForm();
  const router = useRouter();
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [extractedWords, setExtractedWords] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmission = () => {
    setIsSubmitting(true);

    setProgress(0);
    const words = text.match(/@\w+/) || [];

    setExtractedWords(words as string[]);
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        }
        clearInterval(intervalId);
        return prevProgress;
      });
    }, 100);

    setTimeout(() => {
      clearInterval(intervalId);
      setIsSubmitting(false);
    }, 10000);
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "UrbanOdyssey",
    functionName: "registerPlayer",
    args: ["", "", "0x", "0x", 1],
    onBlockConfirmation: (txnReceipt) => {
      setShowModal(true);
    },
  });

  const onSubmit = async (data: any) => {
    const msg = `Register`;
    const msgHash = hashMessage(msg);
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || "";
    const wallet = new Wallet(privateKey);
    const signature = await wallet.signMessage(arrayify(msgHash));
   
    if (msgHash && signature) {
      writeAsync({
        args: [
          data.name,
          data.homeTown,
          msgHash as `0x${string}`,
          signature as `0x${string}`,
          parseInt(data.team),
        ],
      });
      
    }
  };

  return (
    <NestedLayoutForWallet>
      <div className="container mx-auto px-4 py-8">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="max-w-lg mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <TextInput name="name" label="Name" type="text" />
              <TextInput name="homeTown" label="HomeTown" type="text" />

              <div className="mb-4">
                <span className="block text-gray-700 text-sm font-bold mb-2">
                  Faction
                </span>
                <label className="inline-flex items-center mr-4">
                  <input
                    {...methods.register("team")}
                    type="radio"
                    value="0"
                    className="form-radio"
                    checked
                  />
                  <span className="ml-2">EcoGuardian</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    {...methods.register("team")}
                    type="radio"
                    value="1"
                    className="form-radio"
                  />
                  <span className="ml-2">TechnoMad</span>
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              {!showModal ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>Register</>
                  )}
                </button>
              ) : (
                <>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => {
                      router.push("/dashboard");
                    }}
                  >
                    <>Go to Dashboard</>
                  </button>
                </>
              )}
            </div>
            {showModal && (
              <div className="bg-gray-800 p-8 rounded-lg mt-10">
                <div className="mb-4">
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    rows={4}
                    placeholder="Drop Email text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSubmission}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>Submit</>
                    )}
                  </button>
                </div>

                {isSubmitting && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${progress}%`,
                        transition: "width 100ms linear",
                      }}
                    ></div>
                  </div>
                )}
                {progress === 100 && extractedWords.length > 0 && (
                  <div className="text-white">{extractedWords[0]}</div>
                )}
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </NestedLayoutForWallet>
  );
}

function arrayify(msgHash: string): Uint8Array {
  return new Uint8Array(Buffer.from(msgHash.slice(2), "hex"));
}
