import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetTweets = () => {
  const allTweetsQuery = useQuery({
    queryKey: ["allTweets"],
    queryFn: async () => {
      const response = await axios.get("/api/tweets/getAll");
      return response;
    },
  });
  // console.log(allTweetsQuery)
  return allTweetsQuery;
};

export default useGetTweets;
