"use client";

import TextInput from "../../components/scaffold-eth/Input/TextInput";
import { FormProvider, useForm } from "react-hook-form";

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
            <TextInput name="name" label="Name" type="text" />
            <TextInput name="homeTown" label="HomeTown" type="text" />
            <TextInput name="team" label="Team" type="text" />
            <TextInput name="country" label="Country" type="text" />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
