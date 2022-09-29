/* eslint-disable @next/next/no-img-element */

import { User } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Employee({
  email,
  name,
  occupation,
  refetch,
}: User & { refetch: Function }) {
  const [loading, setLoading] = useState(false);

  const removeEmployee = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/employees/${email}`);
      toast.success("Employee removed");
      refetch();
    } catch (err) {
      toast.error("Problem removing employee");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full p-3 bg-white items-center justify-center rounded-md flex flex-col gap-1.5">
      <img
        className="rounded-full w-28 h-28 border-2 border-blue-500"
        src={`https://avatars.dicebear.com/api/micah/${email}.svg`}
        alt={name}
      />
      <p className="text-center capitalize">{name}</p>
      <p className="text-gray-500 text-center lowercase">({email})</p>
      <p className="font-bold text-center">{occupation}</p>
      <button
        disabled={loading}
        onClick={removeEmployee}
        className="text-sm px-4 py-1.5 font-bold bg-red-500 text-white rounded-md disabled:opacity-50"
      >
        Remove
      </button>
    </div>
  );
}