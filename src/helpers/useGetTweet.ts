import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetTweet = (tweetId: any) => {
  const singleTweetQuery = useQuery({
    queryKey: ["singleTweet"],
    queryFn: async () => {
      const response = await axios.get(`/api/tweets/getSingle/${tweetId}`);
      return response;
    },
  });
  // console.log(singleTweetQuery);
  return singleTweetQuery;
};

export default useGetTweet;
