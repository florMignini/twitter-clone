"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
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
      const { data } = await axios.get("/api/tweets/getAll");
      setTweets(data?.allTweets);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //@CREATE TWEET
  const createTweet = async (tweetContentData: any) => {
    try {
      const { data } = await axios.post("/api/socket/tweets", tweetContentData);

      setTweet({});
      // update state once project is added
      setTweets([...tweets, data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //@LIKE TWEETS
  const likeTweet = async ({ userId, tweetId }: any) => {
    try {
      const { data }: any = await axios.post("/api/likes/like", {
        userId,
        tweetId,
      });

      // update state once tweet is liked
      const updatedTweets = tweets.map((tweetToLike: any) =>
        tweetToLike._id === data._id ? data : tweetToLike
      );

      setTweets(updatedTweets);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //@UNLIKE TWEETS
  const unLikeTweet = async ({ userId, tweetId }: any) => {
    try {
      const { data }: any = axios.post("/api/likes/unlike", {
        userId,
        tweetId,
      });

      // update state once tweet is unliked
      const updatedTweets = tweets.map((tweetToUnlike: any) =>
        tweetToUnlike?._id === data?._id ? data : tweetToUnlike
      );
      setTweets(updatedTweets);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //@BOOKMARK TWEETS
  const addBookmark = async ({ userId, tweetId }: any) => {
    try {
      const { data }: any = await axios.post("/api/bookmarks/add", {
        userId,
        tweetId,
      });

      // update state once bookmark is added
      const updatedTweets = tweets.map((tweetToBookmark: any) =>
        tweetToBookmark?._id === data?._id ? data : tweetToBookmark
      );
      setTweets(updatedTweets);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBookmark = async ({ userId, tweetId }: any) => {
    try {
      const { data }: any = await axios.post("/api/bookmarks/deleteBookmark", {
        userId,
        tweetId,
      });
console.log(data);
      // update state once bookmark is deleted
      const updatedTweets = tweets.map((tweetToUnbookmark: any) =>
        tweetToUnbookmark?._id === data?._id ? data : tweetToUnbookmark
      );
      setTweets(updatedTweets);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TweetContext.Provider
      value={{
        //states
        loading,
        tweet,
        tweets,
        //actions
        createTweet,
        getAllTweets,
        likeTweet,
        unLikeTweet,
        addBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
