"use client";

import { FormProvider, useForm } from "react-hook-form";
import TextInput from "~~/components/scaffold-eth/Input/TextInput";

export default function Home() {
  const methods = useForm();
  const onSubmit = data => console.log(data);

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
              <span className="block text-gray-700 text-sm font-bold mb-2">Team</span>
              <label className="inline-flex items-center mr-4">
                <input {...methods.register("team")} type="radio" value="Ecoguards" className="form-radio" />
                <span className="ml-2">Ecoguards</span>
              </label>
              <label className="inline-flex items-center">
                <input {...methods.register("team")} type="radio" value="Technomads" className="form-radio" />
                <span className="ml-2">Technomads</span>
              </label>
            </div>

            <TextInput name="country" label="Country" type="text" />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
