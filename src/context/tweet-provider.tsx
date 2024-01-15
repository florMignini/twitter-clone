import { ReactNode, createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client"
import { DefaultEventsMap } from "@socket.io/component-emitter";
import axios from "axios";

const TweetContext = createContext({});

export const TweetProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TweetContext.Provider value={{}}>
        {children}
    </TweetContext.Provider>
  )
}
