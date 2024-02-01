import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetUserInfo = (userId: string) => {
  const userSessionQuery = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const response = await axios.get(`/api/users/info/${userId}`);

      return response;
    },
  });

  return userSessionQuery.data?.data;
};

export default useGetUserInfo;
