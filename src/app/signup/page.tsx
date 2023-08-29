"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Image from "next/image"

interface FormType {
username: string,
email:string,
password:string,
}
const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const onSignUp = async() =>{
      try {
        const res = await axios.post("/api/users/signup", formData);
        console.log(res.data)
        router.push('/signup')
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <div className='w-full h-screen grid grid-cols-2 bg-black '>
        <Image
      src='https://images.pexels.com/photos/13240228/pexels-photo-13240228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      width={800}
      height={1000}
      alt="XPicture"
      className="w-[90%] h-screen flex items-center justify-center m-auto  object-contain"
      />
        <div className="w-[100%] md:w-[80%] h-[90%] m-auto bg-blue-100/10 rounded-2xl flex items-start justify-center ">
          <div className="w-[90%] h-full flex items-center justify-center flex-col my-auto">
          <h2 className="w-[80%] h-[10%] flex items-center justify-center text-3xl mb-8 font-semibold text-blue-100/30 m-3">Join X-Clone</h2>
          {/* form section */}
          <div className="w-[100%] h-[50%] flex flex-col items-center justify-start">
            {/* email section */}
          <div className="w-[80%] h-[100px] rounded-md flex flex-col">
          <Input
          className="text-white"
          type="email" variant={"underlined"}
          value={formData.email}
          name="email"
          label="Email" placeholder="Enter your email" 
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          color="default"
          />
          </div>
          {/* username section */}
          <div className="w-[80%] h-[100px] rounded-md flex flex-col">
          <Input
          className="text-white"
          type="text" variant={"underlined"}
          name="username"
          value={formData.username}
          label="Username" placeholder="Enter your username" 
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          color="default"
          />
          </div>
          {/* password section */}
          <div className="w-[80%] h-[100px] rounded-md flex flex-col">
          <Input
          className="text-white"
          type="password" variant={"underlined"}
          name="password"
          value={formData.password}
          label="Password" placeholder="Enter your password" 
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          color="default"
          />
          </div>
          </div>
          <div className="w-[80%] h-[10%] flex p-1 items-center justify-start">
            <h2 className="text-blue-100/30 m-1 text-sm">
              Already registered? <Link 
              className="ml-3 font-bold underline"
              href="/signin">Sign In</Link>{" "}
            </h2>
          </div>
            <button
              className="w-[80%] text-center text-blue-100/30 font-semibold text-xl rounded-full p-1 border-solid border-1 border-blue-100/30 
              hover:bg-white/10
              "
              onClick={onSignUp}
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