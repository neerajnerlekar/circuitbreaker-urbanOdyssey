"use client";

import { useFormContext } from "react-hook-form";

const TextInput = ({ label, name, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        {...register(name, { required: "This field is required" })}
        {...rest}
      />
      {errors[name] && <p className="text-red-500 text-xs italic">{errors[name].message}</p>}
    </div>
  );
};

export default TextInput;
