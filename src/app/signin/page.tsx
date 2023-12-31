"use client";

import { Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const SigninPage = () => {
  
  
  //form state
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSignIn = async () => {
    setLoading(true);
    if([formData.email, formData.password].includes("")){
    setError(`All fields are required`)
    setTimeout(() =>{
      setError("")
    },3000)
    }
    try {
      const res = await axios.post("/api/users/signin", formData);
      if (res) {
        router.push("/");
        router.refresh()
      }
    } catch (error: any) {
      setError(error.response.data.error);
      setTimeout(() =>{
        setError("")
      },3000)
      setFormData({
      email: "",
      password: "",
      })
    }
    setLoading(false);

  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center lg:grid lg:grid-cols-2 bg-black ">
        <Image
          src="https://helios-i.mashable.com/imagery/articles/078aX2gLMgAlz2tiIeZdVVL/hero-image.fill.size_1248x702.v1691114328.jpg"
          width={800}
          height={800}
          alt="XPicture"
          className="hidden w-[90%] h-[100%] lg:flex items-center justify-center m-auto  object-contain"
        />
        <div className="w-[100%] h-[80%] md:w-[80%] lg:w-[100%] lg:h-[55%] lg:m-auto  rounded-2xl lg:flex lg:flex-col items-center justify-center ">
          {error ? (
            <h6 className="w-[90%] text-[#f9070f] text-center font-thin text-md">
              {error}
            </h6>
          ) : (
            ""
          )}
          <div className="w-[90%] h-[95%] flex items-center justify-center flex-col">
            <h1 className="w-[80%] h-[10%] flex items-center justify-center text-3xl mb-4 font-semibold text-white m-1">
              Welcome to X-Clone
            </h1>
            {/* form section */}
            <div className="w-[90%] h-[40%] flex flex-col items-center justify-start">
              {/* email section */}
              <div className="w-[90%] h-[100px] rounded-md flex flex-col">
                <Input
                  className="text-white"
                  type="email"
                  variant={"underlined"}
                  label="Email"
                  value={formData.email}
                  placeholder="Enter your email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  color="default"
                />
              </div>
              {/* password section */}
              <div className="w-[90%] h-[100px] rounded-md flex flex-col">
                <Input
                  className="text-white"
                  type="password"
                  variant={"underlined"}
                  label="Password"
                  value={formData.password}
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  color="default"
                />
              </div>
            </div>
            <div className="w-[80%] h-[10%] flex items-center justify-between">
              <h2 className="text-white mr-1 text-sm">
                You have no account?{" "}
                <Link className="font-bold underline" href="/signup">
                  Register
                </Link>{" "}
              </h2>
              <button
                className="w-[30%] h-7 p-2 flex items-center justify-between bg-blue-700 rounded-md"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <h6 className="w-[80%] text-xs font-bold ">Log in with</h6>
                <FcGoogle className="w-[20%]" />
              </button>
            </div>
            <button
              type="submit"
              className="w-[80%] text-center text-blue-600 font-semibold text-xl rounded-full mt-5 p-1 border-solid border-1 border-blue-600
              hover:bg-blue-600 hover:text-white
              "
              onClick={onSignIn}
            >
              {loading ? (
                <div className="w-[100%] flex items-center justify-center">
                  <ThreeDots
                    height="30"
                    width="30"
                    radius="5"
                    color="rgb(59 130 246)"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                </div>
              ) : (
                <h6 className="">Login</h6>
              )}
            </button>
          </div>
          {/* //inner modal */}
        </div>
        {/* //modal */}
      </div>{" "}
      {/* //body */}
    </>
  );
};

export default SigninPage;
