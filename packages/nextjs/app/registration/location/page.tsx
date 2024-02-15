"use client";

import { useState } from "react";
import TextInput from "../../../components/scaffold-eth/Input/TextInput";
import { FormProvider, useForm } from "react-hook-form";

export default function Home() {
  const methods = useForm();
  const onSubmit = data => console.log(data);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setSelectedImage({
        imageFile: img,
        previewURL: URL.createObjectURL(img),
      });
    }
  };

  const handleSubmit = e => {
 
    // Form submission logic here
    console.log("Form data submitted",e);
    // Remember to handle the image upload process here
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="max-w-lg mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <TextInput name="name" label="Name" type="text" />
            <TextInput name="address" label="Address" type="text" />
            <TextInput name="city" label="City" type="text" />
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
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
                <p className="block text-gray-700 text-sm font-bold mb-2">Preview</p>
                <img src={selectedImage.previewURL} alt="Preview" className="max-w-xs max-h-64" />
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
            >
              Generate Proof
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
