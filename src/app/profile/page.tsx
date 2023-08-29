import axios from 'axios'
import React from 'react'

const profile = () => {
    
    const getUserSessionData = async() =>{
       const userData = await axios.get('/api/users/profile')
       console.log(userData.data)
    }
  return (
    <div
    className='w-full h-screen bg-black'
    >

    </div>
  )
}

export default profile