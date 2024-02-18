"use client";

import TextInput from "../../components/scaffold-eth/Input/TextInput";
import dynamic from "next/dynamic";
import Image from "next/image";
import { NFTStorage } from "nft.storage";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import NestedLayoutForWallet from "~~/components/NestedLayoutForWallet";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const DynamicMap = dynamic(() => import("~~/components/Map"), {
  ssr: false,
});

export default function Home() {
  const methods = useForm();

  const [selectedImage, setSelectedImage] = useState<{
    imageFile: File | null;
    previewURL: string | null;
  } | null>(null);

  const [location, setLocation] = useState({
    coords: { latitude: 0, longitude: 0 },
  });

  const handleImageChange = (e: any) => {
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
    functionName: "registerAndVerifyPlace",
    args: ["", "", ""],
    value: BigInt(0),
    onBlockConfirmation: (txnReceipt) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const onSubmit = (formData: any) => {
    let ipfsCID = ""; // IPFS Content Identifier

    const handleSubmission = () => {
      console.log("handling write");
      console.log("Form data submitted", formData);
      console.log("IPFS CID", ipfsCID);

      writeAsync({
        args: [formData.name, formData.place, ipfsCID],
      });
    };

    if (selectedImage && selectedImage.imageFile) {
      const client = new NFTStorage({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || "",
      });
      client
        .storeBlob((selectedImage as any).imageFile)
        .then((cid) => {
          ipfsCID = cid;
          console.log("IPFS CID", ipfsCID);
          handleSubmission();
        })
        .catch((error) => {
          console.error("Error storing blob:", error);
        });
    } else {
      handleSubmission();
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      console.log(e);
      setLocation(e);
    });
  }, []);

  return (
    <NestedLayoutForWallet>
      <div className="container mx-auto px-4 py-8">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="max-w-lg mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <TextInput name="name" label="Name" type="text" />
              <TextInput name="place" label="Type of Place" type="text" />
              {location?.coords?.latitude !== 0 && (
                <DynamicMap
                  position={[
                    location?.coords?.latitude,
                    location?.coords?.longitude,
                  ]}
                />
              )}
              <br />
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  PlaceImage
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
              {selectedImage && selectedImage.previewURL && (
                <div className="mb-4">
                  <p className="block text-gray-700 text-sm font-bold mb-2">
                    Preview
                  </p>
                  <Image
                    src={selectedImage.previewURL}
                    alt="Preview"
                    className="max-w-xs max-h-64"
                    width={200}
                    height={200}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                type="submit"
                disabled={isLoading}>
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>Generate Proof</>
                )}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </NestedLayoutForWallet>
  );
}
