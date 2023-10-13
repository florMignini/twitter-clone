import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
type Props = {
  placeholder: string;
  section: string;
};
interface FormData {
  q: string;
}
export const Search = ({ placeholder, section }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    q: "",
  });

  return (
    <div className="sticky h-15 top-0 rounded-full bg-slate-900 backdrop-blur-lg text-gray-600 mt-1">
      <div className="h-full w-full relative grid grid-cols-[10%,90%] gap-4 p-3 text-sm">
        <label
          htmlFor="searchItem"
          className="flex items-center justify-center"
        >
          <BsSearch className="w-5 h-5" />
        </label>

        <input
          type="text"
          placeholder={placeholder}
          className="bg-transparent outline-none flex border-none items-center justify-center
                  w-full
                  "
          name="q"
          value={formData.q}
          autoComplete="off"
          onChange={(e) => setFormData({ ...formData, q: e.target.value })}
        />
      </div>
    </div>
  );
};
