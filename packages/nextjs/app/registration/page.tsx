"use client";

import { Wallet } from "ethers";
import { NFTStorage } from "nft.storage";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "~~/components/scaffold-eth/Input/TextInput";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import keccak256 from "keccak256";
async function signMessageWithEthers(privateKey, message) {
  const wallet = new Wallet(privateKey);
  const signature = await wallet.signMessage(message);
  return signature;
}

export default function Home() {
  const methods = useForm();
  const [selectedImage, setSelectedImage] = useState<any>(null); // Provide type any for selectedImage

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setSelectedImage({
        imageFile: img,
        previewURL: URL.createObjectURL(img),
      });
    }
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "UrbanOdyssey",
    functionName: "registerPlayer",
    args: ["", "", undefined, undefined, 1],
    onBlockConfirmation: (txnReceipt) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Register button clicked");
    if (selectedImage) {
      const client = new NFTStorage({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || "",
      });
      client.storeBlob((selectedImage as any).imageFile).then(async (cid) => {
        data.ipfsCID = cid;
        const messageKey = await signMessageWithEthers(
          process.env.NEXT_PUBLIC_PRIVATE_KEY,
          `Register ${data.name} from ${data.homeTown} for team 1`
        );

     
        const signatureKey = await signMessageWithEthers(
          process.env.NEXT_PUBLIC_PRIVATE_KEY,
          "Hello from Signature For the team"
        );
console.log("Signature Key", signatureKey);
        if (messageKey && signatureKey) {
          writeAsync({
            args: [data.name, data.homeTown, messageKey, signatureKey, 1],
          });
          console.log("Data submitted", data);
        }
      });
    } else {
      const messageKey = keccak256(Buffer.from("Register "));
      const signatureKey = await signMessageWithEthers(
        process.env.NEXT_PUBLIC_PRIVATE_KEY,
        "Hello from Signature For the team"
      );
      console.log("Message Key", Buffer.from(messageKey.buffer).toString());
      console.log("Signature Key", signatureKey);
      if (messageKey && signatureKey) {
        writeAsync({
          args: [data.name, data.homeTown, messageKey, signatureKey, 2],
        });
        console.log("Data submitted", data);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-lg mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
              />
            </div>
            {/* Image Preview */}
            {selectedImage && (
              <div className="mb-4">
                <p className="block text-gray-700 text-sm font-bold mb-2">
                  Preview
                </p>
                <img
                  src={selectedImage.previewURL}
                  alt="Preview"
                  className="max-w-xs max-h-64"
                />
              </div>
            )}
          </div>
          <div className="flex justify-center">
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
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
