'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { Database } from '@/lib/supabase.types'
import AuthModal from './ui/modal/AuthModal'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from '@nextui-org/react'
import { MailIcon } from './ui/modal'
import {Avatar, AvatarIcon} from "@nextui-org/react";
import { toast } from 'react-toastify'

export default function Login() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  const router = useRouter()
  //modal stateHandler
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    //getting session
    supabase.auth.getSession().then((res) => {
      //if there is not session open modal for authentication step
      if (!res.data.session) {
        onOpen()
      }
    })
  }, [])


  const handleSignUp = async () => {

    //checking in db if the user exist
    const { data, error } = await supabase.from('profiles').select().eq('username', username.trim())

    data && data?.length > 0 ? toast.error("the username already exist", {
      position: toast.POSITION.TOP_CENTER
    }) :
      console.log(username)
    await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        data: {
          username,
        },
      },
    })
    router.refresh()
  }

  /*  const handleSignIn = async () => {
     const { data, error } = await supabase.auth.signInWithOtp({
       email: 'example@email.com',
       options: {
         data: {
           username,
         },
       },
     })
     router.refresh()
   } */

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop='blur'
        className='bg-black w-full h-[60%]'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center justify-center text-3xl mt-2  gap-1">Log in on Twitter</ModalHeader>
              <ModalBody className='backdrop-blur-md flex justify-center items-center'>

                <div className='flex flex-col w-full h-full items-center justify-evenly'>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-3xl w-9 h-10 text-black/80 rounded-full p-1 mb-3 bg-gradient-to-br from-[#FFB457] to-[#FF705B] pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  className='text-blue-500'
                  onChange={({ target }) => setEmail(target.value)}
                />
                <Input
                  label="Username"
                  endContent={
                    <Avatar
        icon={<AvatarIcon />}
        classNames={{
          base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] flex items-center justify-center mb-3 ",
          icon: "text-black/80",
        }}
      />
                  }
                  placeholder="Enter your username"
                  type="text"
                  variant="bordered"
                  className='text-blue-500'
                  onChange={({ target }) => setUsername(target.value)}
                />
                </div>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={handleSignOut} onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleSignUp} onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}