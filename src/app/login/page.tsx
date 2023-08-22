"use client"

import { Input } from "@nextui-org/react"
import Link from "next/link"
import { useState } from "react"

const LoginPage = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    username: ''
  })
  return (
    <div className='w-full h-screen flex items-center justify-center bg-white/10'>
        <div className="w-[80%] h-[55%] p-5 bg-blue-100/10 rounded-2xl flex items-start justify-center ">
          <div className="w-[90%] h-full flex items-center justify-start flex-col my-auto">
          <h2 className="w-[80%] h-[10%] flex items-center justify-center text-3xl mb-8 font-semibold text-white m-3">Join X-Clone Today</h2>
          {/* form section */}
          <div className="w-[100%] h-[50%] flex flex-col items-center justify-start">
            {/* email section */}
          <div className="w-[80%] h-[100px] rounded-md flex flex-col">
          <Input type="email" variant={"underlined"} label="Email" placeholder="Enter your email" />
          </div>
          {/* username section */}
          <div className="w-[80%] h-[100px] rounded-md flex flex-col">
          <Input type="text" variant={"underlined"} label="Username" placeholder="Enter your username" />
          </div>
          {/* password section */}
          <div className="w-[80%] h-[100px] rounded-md flex flex-col">
          <Input type="password" variant={"underlined"} label="Password" placeholder="Enter your password" />
          </div>
          </div>
          <div className="w-[80%] h-[30%] flex flex-col p-1 items-start justify-center">
              <h2 className="text-white ml-2 mb-3 text-xl">Already member?</h2>
              <Link
              href='/signin'
              className="w-full text-center rounded-full p-2 border-solid border-1 border-white 
              hover:bg-white/20
              "> Sign In</Link>
          </div>
          </div>{/* //inner modal */}
        </div>{/* //modal */}
    </div>//body
  )
}

export default LoginPage