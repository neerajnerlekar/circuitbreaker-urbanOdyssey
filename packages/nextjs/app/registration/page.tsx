"use client";

import TextInput from "../../components/scaffold-eth/Input/TextInput";
import { FormProvider, useForm } from "react-hook-form";

export default function Home() {
  const methods = useForm();
  const onSubmit = data => console.log(data);
  return (
    <div className="container mx-auto px-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <TextInput name="name" label="Name" type="text" />
          <TextInput name="homeTown" label="HomeTown" type="text" />
          <TextInput name="team" label="Team" type="text" />
          <TextInput name="country" label="Country" type="text" />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
