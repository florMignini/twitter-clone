import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
export default function Page() {
  const cookieStore = cookies()
  const isSession = cookieStore.get('sessionToken')
  if (isSession) {
    redirect('/home')
  }
}