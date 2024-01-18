"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useSocket } from ".";
import axios from "axios";

const TweetContext = createContext({});
// Tweet provider hook
export const useTweet = () => {
  return useContext(TweetContext);
};
export const TweetProvider = ({ children }: { children: React.ReactNode }) => {
  //socket import
  const { socket } = useSocket();
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState<any>([]);
  const [tweet, setTweet] = useState({});




  //@GET ALL TWEETS
  const getAllTweets = async () => {
    try {
      
      const {data}  = await axios.get("/api/tweets/getAll");

      setTweets(data.allTweets);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //@CREATE TWEET
  const createTweet = async (tweetContentData: any) => {
    try {
      const {data} = await axios.post("/api/socket/tweets", tweetContentData);

      setTweet({});
      //SOCKET IO
      //  socket?.emit("new tweet",  data)

      // update state once project is added
      setTweets([...tweets, data]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TweetContext.Provider
      value={{
        //states
        tweet,
        tweets,
        //actions
        createTweet,
        getAllTweets,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
