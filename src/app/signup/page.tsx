"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { ThreeDots } from "react-loader-spinner";

interface FormType {
  username: string;
  email: string;
  password: string;
}
const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSignUp = async () => {
    setLoading(true);
    if ([formData.email, formData.password, formData.username].includes("")) {
      setError(`All fields are required`);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    try {
      const res = await axios.post("/api/users/signup", formData);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="w-full h-screen flex items-center justify-center lg:grid lg:grid-cols-2 bg-black ">
      <Image
        src="https://helios-i.mashable.com/imagery/articles/078aX2gLMgAlz2tiIeZdVVL/hero-image.fill.size_1248x702.v1691114328.jpg"
        width={800}
        height={1000}
        alt="XPicture"
        className="hidden w-[90%] lg:flex h-screen items-center justify-center m-auto object-contain"
      />
      <div className="w-[100%] h-[90%] md:w-[80%] lg:w-[100%] lg:h-[55%] lg:m-auto  rounded-2xl lg:flex lg:flex-col items-center justify-center ">
        {error ? (
          <h6 className="text-[#f9070f] text-center p-2 font-thin text-md">
            {error}
          </h6>
        ) : (
          ""
        )}
        <div className="w-[100%] h-[95%] flex items-center justify-center flex-col my-auto">
          <h1 className="w-[100%] h-[10%] flex items-center justify-center text-3xl mb-4 font-semibold text-white m-3">
            Join X-Clone
          </h1>
          {/* form section */}
          <div className="w-[90%] h-[65%] flex flex-col items-center justify-start">
            {/* email section */}
            <div className="w-[90%] h-[100px] rounded-md flex flex-col">
              <Input
                className="text-white"
                type="email"
                variant={"underlined"}
                value={formData.email}
                name="email"
                label="Email"
                placeholder="Enter your email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                color="default"
              />
            </div>
            {/* username section */}
            <div className="w-[90%] h-[100px] rounded-md flex flex-col">
              <Input
                className="text-white"
                type="text"
                variant={"underlined"}
                name="username"
                value={formData.username}
                label="Username"
                placeholder="Enter your username"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
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
                name="password"
                value={formData.password}
                label="Password"
                placeholder="Enter your password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                color="default"
              />
            </div>
          </div>
          <div className="w-[80%] h-[10%] flex items-center justify-between">
            <h2 className="text-white m-1 text-sm md:text-xs">
              Already registered?{" "}
              <Link className="font-bold underline" href="/signin">
                Sign in
              </Link>{" "}
            </h2>
          </div>
          <button
            className="w-[80%] text-center text-blue-600 font-semibold text-xl rounded-full mt-5 p-1 border-solid border-1 border-blue-600
              hover:bg-blue-600 hover:text-white
              "
            onClick={onSignUp}
          >
            {loading ? (
              <div className="w-[90%] flex items-center justify-center">
                <ThreeDots
                  height="40"
                  width="40"
                  radius="5"
                  color="rgb(59 130 246)"
                  ariaLabel="three-dots-loading"
                  visible={true}
                />
              </div>
            ) : (
              <h6 className="">Sign up</h6>
            )}
          </button>
        </div>
        {/* //inner modal */}
      </div>
      {/* //modal */}
    </div> //body
  );
};

export default LoginPage;
