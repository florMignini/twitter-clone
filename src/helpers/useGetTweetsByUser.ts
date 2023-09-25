import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetTweetsByUser = (tweetId: string) => {
  const tweetsByUserQuery = useQuery({
    queryKey: ["tweetsByUser"],
    queryFn: async () => {
      const response = await axios.get(`/api/tweets/getAllByUser/${tweetId}`);
      return response;
    },
  });
//   console.log(tweetsByUserQuery);
  return tweetsByUserQuery?.data?.data.tweetsByUser;
};

export default useGetTweetsByUser;
