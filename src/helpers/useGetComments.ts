import axios from "axios";
import { useQuery } from "@tanstack/react-query";
//le tengo que mandar el tweetID
const useGetComments = (tweetId:string) => {
  const allCommentsQuery = useQuery({
    queryKey: ["allComments"],
    queryFn: async () => {
      const response = await axios.get(`/api/comments/get/${tweetId}`);
      return response;
    },
  });
//   console.log(allCommentsQuery?.data)
  return allCommentsQuery?.data;
};

export default useGetComments;
