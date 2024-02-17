"use client";

import { NFTStorage } from "nft.storage";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "~~/components/scaffold-eth/Input/TextInput";

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

  const onSubmit = (data) => {
    console.log("Register button clicked");
    if (selectedImage) {
      const client = new NFTStorage({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || "",
      });
      client.storeBlob((selectedImage as any).imageFile).then((cid) => {
        // Cast selectedImage as any to avoid type error
        console.log("Image uploaded successfully", cid);
        data.ipfsCID = cid;
        console.log("Form data submitted", data);
      });
    } else {
      console.log("Form data submitted", data);
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
                  value="Ecoguards"
                  className="form-radio"
                />
                <span className="ml-2">Ecoguards</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...methods.register("team")}
                  type="radio"
                  value="Technomads"
                  className="form-radio"
                />
                <span className="ml-2">Technomads</span>
              </label>
            </div>

            <TextInput name="country" label="Country" type="text" />

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
              type="submit">
              Register
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
