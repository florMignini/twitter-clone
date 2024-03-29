"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

const TweetContext = createContext({});
// Tweet provider hook
export const useTweet = () => {
  return useContext(TweetContext);
};
export const TweetProvider = ({ children }: { children: React.ReactNode }) => {
  //socket import

  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState<any>([]);
  const [tweetsByUser, setTweetsByUser] = useState<any>([]);
  const [bookmarksByUser, setBookmarksByUser] = useState<any>([]);
  const [notificationsByUser, setNotificationsByUser] = useState<any>([]);
  const [tweet, setTweet] = useState({});
  const [userProfile, setUserProfile] = useState();

  //@GET USER INFORMATION
  const getUserInfo = async (userId: string) => {
    try {
      const { data } = await axios.get(`/api/users/info/${userId}`);
      setUserProfile(data.profileInfo);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // @POST UPDATE USER INFO
  const updateUserInfo = async ({ tweetContentData, userId }: any) => {
    try {
      const { data }: any = await axios.post(
        `/api/users/updateProfile/${userId}`,
        {
          tweetContentData,
        }
      );
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // @POST UPDATE SEEN INFO
  const updateUserSeen = async ({ notificationId, userId }: any) => {
    try {
      const { data }: any = await axios.post(
        `/api/notification/updateSeen/${userId}`,
        { notificationId }
      );

      // update state once notification is edited
      const updatedNotifications = notificationsByUser.map(
        (notificationToUpdate: any) =>
          notificationToUpdate._id === data._id ? data : notificationToUpdate
      );

      setNotificationsByUser(updatedNotifications);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //@GET ALL TWEETS
  const getAllTweets = async () => {
    try {
      const { data } = await axios.get("/api/tweets/getAll");
      setTweets(data);
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

  //@GET SINGLE TWEET
  const getSingleTweet = async (tweetId: string) => {
    try {
      const { data } = await axios.get(`/api/tweets/getSingle/${tweetId}`);

      setTweet(data.singleTweet);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //@GET BOOKMARS BY USER
  const getBookmarsByUser = async (userId: string) => {
    try {
      const { data } = await axios.get(`/api/bookmarks/getAllByUser/${userId}`);

      setBookmarksByUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  //@GET NOTIFICATIONS BY USER
  const getNotificationsByUser = async (userId: string) => {
    try {
      const { data } = await axios.get(
        `/api/notification/getAllByUser/${userId}`
      );

      setNotificationsByUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //@CREATE TWEET
  const createTweet = async (tweetContentData: any) => {
    try {
      const { data } = await axios.post(
        "/api/tweets/publish",
        tweetContentData
      );

      // update state once project is added
      setTweets([...tweets, data]);
      setTweet({});
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
      const updatedTweets = tweets.map((tweetToLike: any) => {
        const stateToUpdate = { ...tweetToLike };
        tweetToLike._id === data.tweetId
          ? stateToUpdate.likes.unshift(data)
          : stateToUpdate;
        return stateToUpdate;
      });
      setTweets(updatedTweets);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //@UNLIKE TWEETS
  const unLikeTweet = async ({ userId, tweetId }: any) => {
    try {
      const { data }: any = await axios.post("/api/likes/unlike", {
        userId,
        tweetId,
      });

      // update state once tweet is booked
      const updatedTweets = tweets.map((tweetToUnlike: any) =>
        tweetToUnlike._id === data._id ? data : tweetToUnlike
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
      const { data } = await axios.post("/api/bookmarks/add", {
        userId,
        tweetId,
      });
      console.log(data);
      // update state once tweet is booked
      const updatedTweets = bookmarksByUser.map((tweetToBook: any) =>
        tweetToBook._id === data._id ? data : tweetToBook
      );

      setBookmarksByUser(updatedTweets);
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
      const updatedTweets = bookmarksByUser.map((tweetToUnBook: any) =>
        tweetToUnBook._id === data._id ? data : tweetToUnBook
      );

      setBookmarksByUser(updatedTweets);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllBookmarks = async ({ userId }: any) => {
    try {
      const { data } = await axios.post("/api/bookmarks/deleteAllBookmarks", {
        userId,
      });

      // update state once tweet is booked
      const updatedTweets = bookmarksByUser.map((tweetToUnBook: any) =>
        tweetToUnBook._id === data._id ? data : tweetToUnBook
      );

      setBookmarksByUser(updatedTweets);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAllNotifications = async ({ userId }: any) => {
    try {
      await axios.post(
        `/api/notification/clearAllNotificationByUser/${userId}`
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const createComment = async (commentContentData: any) => {
    try {
      const { data } = await axios.post(
        "/api/comments/publish",
        commentContentData
      );
      // update state once tweet is booked
      const updatedTweets = tweets.map((tweetToLike: any) => {
        const stateToUpdate = { ...tweetToLike };
        tweetToLike._id === data.tweetId
          ? stateToUpdate.comments.unshift(data.tweetId)
          : stateToUpdate;
        return stateToUpdate;
      });
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
        notificationsByUser,
        bookmarksByUser,
        tweetsByUser,
        userProfile,
        //actions
        updateUserSeen,
        deleteAllBookmarks,
        getUserInfo,
        updateUserInfo,
        createTweet,
        getAllTweets,
        likeTweet,
        unLikeTweet,
        addBookmark,
        deleteBookmark,
        getBookmarsByUser,
        getNotificationsByUser,
        getAllTweetsByUser,
        createComment,
        getSingleTweet,
        deleteAllNotifications,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
