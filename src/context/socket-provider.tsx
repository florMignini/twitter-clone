"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
  message: string;
};

const SocketContext = createContext({
  socket: null,
  isConnected: false,
  message: ""
});

// socket provider hook
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
      }
    );

    setSocket(socketInstance);
    
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (


    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        message
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
