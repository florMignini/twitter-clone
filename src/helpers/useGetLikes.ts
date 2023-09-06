import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetLikes = () => {
  const allLikesQuery = useQuery({
    queryKey: ["allLikes"],
    queryFn: async () => {
      const response = await axios.get("/api/likes/get");
      return response;
    },
  });
  // console.log(allTweetsQuery)
  return allLikesQuery;
};

export default useGetLikes;
