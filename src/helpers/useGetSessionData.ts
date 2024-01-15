import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetSessionData = () => {
  const userSessionQuery = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await axios.get("/api/users/profile");
      console.log(response)
      return response;
    },
  });

  return userSessionQuery.data?.data?.profileInfo;
};

export default useGetSessionData;
