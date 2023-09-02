"use client";

import { Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import Image from "next/image";

const SigninPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  
  const onSignIn = async () => {
    try {
      const res = await axios.post("/api/users/signin", formData);
      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen grid grid-cols-2 bg-black ">
      <Image
      src='https://images.pexels.com/photos/13240228/pexels-photo-13240228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      width={800}
      height={800}
      alt="XPicture"
      className="w-[90%] h-[90%] flex items-center justify-center m-auto  object-contain"
      />
      <div className="w-[100%] md:w-[80%] h-[45%] m-auto bg-blue-100/10 rounded-2xl flex items-start justify-center ">
        <div className="w-[90%] h-[85%] flex items-center justify-center flex-col my-auto">
          <h2 className="w-[80%] h-[10%] flex items-center justify-center text-2xl mb-4 font-semibold text-blue-100/30 m-1">
            Welcome back to X-Clone
          </h2>
          {/* form section */}
          <div className="w-[100%] h-[40%] flex flex-col items-center justify-start">
            {/* email section */}
            <div className="w-[80%] h-[100px] rounded-md flex flex-col">
              <Input
                className="text-white"
                type="email"
                variant={"underlined"}
                label="Email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                color="default"
              />
            </div>
            {/* password section */}
            <div className="w-[80%] h-[100px] rounded-md flex flex-col">
              <Input
                className="text-white"
                type="password"
                variant={"underlined"}
                label="Password"
                value={formData.password}
                placeholder="Enter your password"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                color="default"
              />
            </div>
          </div>
          <div className="w-[80%] h-[10%] flex p-1 items-center justify-start">
            <h2 className="text-blue-100/30 m-1 text-sm">
              You have no account?{" "}
              <Link className="ml-3 font-bold underline" href="/signup">
                Register
              </Link>{" "}
            </h2>
          </div>
          <button
            type="submit"
            className="w-[80%] text-center text-blue-100/30 font-semibold text-xl rounded-full p-1 border-solid border-1 border-blue-100/30 
              hover:bg-white/10
              "
            onClick={onSignIn}
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
