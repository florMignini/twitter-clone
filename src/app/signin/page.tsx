"use client"

import { Input } from "@nextui-org/react"
import Link from "next/link"
import { useState } from "react"

const SigninPage = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  return (
    <div className='w-full h-screen flex items-center justify-center bg-white/10'>
        <div className="w-[80%] h-[55%] p-5 bg-blue-100/10 rounded-2xl flex items-start justify-center ">
          <div className="w-[90%] h-full flex items-center justify-start flex-col my-auto">
          <h2 className="w-[80%] h-[10%] flex items-center justify-center text-3xl mb-8 font-semibold text-white m-3">Welcome back to X-Clone</h2>
          {/* form section */}
          <div className="w-[100%] h-[40%] flex flex-col items-center justify-start">
            {/* email section */}
          <div className="w-[80%] h-[100px] rounded-md flex flex-col">
          <Input type="email" variant={"underlined"} label="Email" placeholder="Enter your email" />
          </div>
          {/* password section */}
          <div className="w-[80%] h-[100px] rounded-md flex flex-col">
          <Input type="password" variant={"underlined"} label="Password" placeholder="Enter your password" />
          </div>
          </div>
          <div className="w-[80%] h-[20%] flex flex-col p-1 items-start">
              <h2 className="text-white ml-2 mb-3 text-xl">Not Registered?</h2>
              <Link
              href='/login'
              className="w-full text-center rounded-full p-2 border-solid border-1 border-white 
              hover:bg-white/20
              "> Sign Up</Link>
          </div>
          </div>{/* //inner modal */}
        </div>{/* //modal */}
    </div>//body
  )
}

export default SigninPage