"use client";
import { useSocket } from '@/providers/socket-provider';
import React from 'react'

const Messages = () => {
    const {isConnected} = useSocket();

 if(!isConnected){
    return (
    <h1 className='text-6xl text-red-600'> Not Connected</h1>
        )
}

return (
    <h1 className='text-6xl text-emerald-600'> Connected</h1>
        )
}


export default Messages;
