import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { useSession } from "next-auth/react";
 
export default function Page() {
  //google session
  const { data: session } = useSession()
  console.log(session)
  //cookies session
  const cookieStore = cookies()
  
  const isSession = cookieStore.get('sessionToken')
  if (isSession || session) {
    redirect('/home')
  }else{
    redirect('/signin')
  }
}