"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
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
  const [tweetsByUser, setTweetsByUser] = useState<any>([]);
  const [bookmarksByUser, setBookmarksByUser] = useState<any>([]);
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
  //@GET ALL TWEETS BY USER
  const getAllTweetsByUser = async (userId: string) => {
    try {
      const { data } = await axios.get(`/api/tweets/getAllByUser/${userId}`);
      setTweetsByUser(data?.tweetsByUser);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  //@GET BOOKMARS BY USER
  const getBookmarsByUser = async (userId: string) => {
    try {
      const { data } = await axios.get(`/api/bookmarks/getAllByUser/${userId}`);

      setBookmarksByUser(data.bookmarkByUser);
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
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //@BOOKMARK TWEETS
  const addBookmark = async ({ userId, tweetId }: any) => {
    try {
      const { data } = await axios.post("/api/bookmarks/add", {
        userId,
        tweetId,
      });

      // update state once tweet is booked
      const updatedTweets = tweets.map((tweetToBook: any) =>
        tweetToBook._id === data._id
          ? bookmarksByUser[0]?.tweets.unshift(tweetId)
          : tweetToBook
      );
      setTweets(updatedTweets);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBookmark = async ({ userId, tweetId }: any) => {
    try {
      const { data } = await axios.post("/api/bookmarks/deleteBookmark", {
        userId,
        tweetId,
      });
      // update state once tweet is booked
      const updatedTweets = tweets.map((tweetToUnbook: any) =>
        tweetToUnbook._id === data._id
          ? bookmarksByUser[0]?.tweets.shift(tweetId)
          : tweetToUnbook
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
        bookmarksByUser,
        tweetsByUser,
        //actions
        createTweet,
        getAllTweets,
        likeTweet,
        unLikeTweet,
        addBookmark,
        deleteBookmark,
        getBookmarsByUser,
        getAllTweetsByUser,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};