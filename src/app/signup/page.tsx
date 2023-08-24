"use client"

import { Input } from "@nextui-org/react"
import Link from "next/link"
import { ReactEventHandler, useState } from "react"

interface FormType {
username: string,
email:string,
password:string,
}
const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = ({target}:any) => {
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className='w-full h-screen flex items-center justify-center bg-black backdrop-blur-lg '>
        <div className="w-[80%] h-[55%] p-5 bg-blue-100/10 rounded-2xl flex items-start justify-center ">
          <div className="w-[90%] h-full flex items-center justify-center flex-col my-auto">
          <h2 className="w-[80%] h-[10%] flex items-center justify-center text-3xl mb-8 font-semibold text-blue-100/30 m-3">Join X-Clone Today</h2>
          {/* form section */}
          <div className="w-[100%] h-[50%] flex flex-col items-center justify-start">
            {/* email section */}
          <div className="w-[80%] h-[100px] rounded-md flex flex-col">
          <Input type="email" variant={"underlined"}
          value={formData.email}
          label="Email" placeholder="Enter your email" 
          onChange={handleInputChange}
          color="default"
          />
          </div>
          {/* username section */}
          <div className="w-[80%] h-[100px] rounded-md flex flex-col">
          <Input type="text" variant={"underlined"}
          value={formData.username}
          label="Username" placeholder="Enter your username" 
          onChange={handleInputChange}
          color="default"
          />
          </div>
          {/* password section */}
          <div className="w-[80%] h-[100px] rounded-md flex flex-col">
          <Input type="password" variant={"underlined"}
          value={formData.password}
          label="Password" placeholder="Enter your password" 
          onChange={handleInputChange}
          color="default"
          />
          </div>
          </div>
          <div className="w-[80%] h-[10%] flex p-1 items-center justify-start">
            <h2 className="text-blue-100/30 m-2 text-sm">
              already registered? <Link 
              className="ml-3 font-bold underline"
              href="/signin">Sign In</Link>{" "}
            </h2>
          </div>
            <button
              className="w-[80%] text-center text-blue-100/30 font-semibold text-xl rounded-full p-1 border-solid border-1 border-blue-100/30 
              hover:bg-white/10
              "
            >
              {" "}
              Sign Up
            </button>
          </div>{/* //inner modal */}
        </div>{/* //modal */}
    </div>//body
  )
}

export default LoginPage