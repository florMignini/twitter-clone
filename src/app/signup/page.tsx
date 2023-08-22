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
    <div className='w-full h-screen flex items-center justify-center bg-white/10'>
        <div className="w-[80%] h-[55%] p-5 bg-blue-100/10 rounded-2xl flex items-start justify-center ">
          <div className="w-[90%] h-full flex items-center justify-center flex-col my-auto">
          <h2 className="w-[80%] h-[10%] flex items-center justify-center text-3xl mb-8 font-semibold text-blue-600 m-3">Join X-Clone Today</h2>
          {/* form section */}
          <div className="w-[100%] h-[50%] flex flex-col items-center justify-start">
            {/* email section */}
          <div className="w-[80%] h-[100px] rounded-md flex flex-col">
          <Input type="email" variant={"underlined"}
          value={formData.email}
          label="Email" placeholder="Enter your email" 
          onChange={handleInputChange}
          color="primary"
          />
          </div>
          {/* username section */}
          <div className="w-[80%] h-[100px] rounded-md flex flex-col">
          <Input type="text" variant={"underlined"}
          value={formData.username}
          label="Username" placeholder="Enter your username" 
          onChange={handleInputChange}
          color="primary"
          />
          </div>
          {/* password section */}
          <div className="w-[80%] h-[100px] rounded-md flex flex-col">
          <Input type="password" variant={"underlined"}
          value={formData.password}
          label="Password" placeholder="Enter your password" 
          onChange={handleInputChange}
          color="primary"
          />
          </div>
          </div>
          <div className="w-[80%] h-[30%] flex flex-col p-1 items-start justify-center">
              <h2 className="text-blue-600 ml-2 mb-3 text-xl">Already member?</h2>
              <Link
              href='/signin'
              className="w-full text-center text-blue-600 text-xl font-semibold rounded-full p-1 border-solid border-1 border-blue-600 
              hover:bg-white/10
              "
              type="submit"
              > Sign In</Link>
          </div>
          </div>{/* //inner modal */}
        </div>{/* //modal */}
    </div>//body
  )
}

export default LoginPage