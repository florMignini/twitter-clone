'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { Database } from '@/lib/supabase.types'
import AuthModal from './ui/modal/AuthModal'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from '@nextui-org/react'
import { MailIcon, LockIcon } from './ui/modal'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  //modal stateHandler
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const supabase = createClientComponentClient<Database>()

 useEffect(() => {
    //getting session
  supabase.auth.getSession().then((res) => {
    //if there is not session open modal for authentication step
    if ( !res.data.session) {
      onOpen()
    }
  })
 }, [])
 

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    /*  <>
       <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
       <input
         type="password"
         name="password"
         onChange={(e) => setPassword(e.target.value)}
         value={password}
       />
       <button onClick={handleSignUp}>Sign up</button>
       <button onClick={handleSignIn}>Sign in</button>
       <button onClick={handleSignOut}>Sign out</button>
     </> */
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody className='backdrop-blur-md'>

               <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  className='text-black'
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  className='text-black'
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
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