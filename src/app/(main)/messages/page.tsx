"use client";

import { useSocket } from '@/context';
import React, { useEffect } from 'react'

const Messages = () => {
    const {isConnected, socket, message}:any = useSocket();

    useEffect(() => {
        if(!socket){
        return
        }

      }, [socket])
 if(!isConnected){
    return (
    <h1 className='text-6xl text-red-600'> Not Connected</h1>
        )
}




return (
    <h1 className='text-6xl text-emerald-600'> Hello</h1>
        )
}


export default Messages;
