"use client";

import { Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = ({ target }: any) => {
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="w-full h-screen flex items-center bg-black justify-center">
      <div className="w-[80%] h-[55%] p-5 bg-blue-100/10 rounded-2xl flex items-start justify-center ">
        <div className="w-[90%] h-full flex items-center justify-center flex-col my-auto">
          <h2 className="w-[80%] h-[10%] flex items-center justify-center text-3xl mb-8 font-semibold text-blue-100/30 m-3">
            Welcome back to X-Clone
          </h2>
          {/* form section */}
          <div className="w-[100%] h-[40%] flex flex-col items-center justify-start">
            {/* email section */}
            <div className="w-[80%] h-[100px] rounded-md flex flex-col">
              <Input
                type="email"
                variant={"underlined"}
                label="Email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleInputChange}
                color="default"
              />
            </div>
            {/* password section */}
            <div className="w-[80%] h-[100px] rounded-md flex flex-col">
              <Input
                type="password"
                variant={"underlined"}
                label="Password"
                value={formData.password}
                placeholder="Enter your password"
                onChange={handleInputChange}
                color="default"
              />
            </div>
          </div>
          <div className="w-[80%] h-[10%] flex p-1 items-center justify-start">
            <h2 className="text-blue-100/30 m-2 text-sm">
              You have no account? <Link 
              className="ml-3 font-bold underline"
              href="/signup">Register</Link>{" "}
            </h2>
          </div>
            <button
              className="w-[80%] text-center text-blue-100/30 font-semibold text-xl rounded-full p-1 border-solid border-1 border-blue-100/30 
              hover:bg-white/10
              "
            >
              {" "}
              Sign In
            </button>
        </div>
        {/* //inner modal */}
      </div>
      {/* //modal */}
    </div> //body
  );
};

export default SigninPage;
