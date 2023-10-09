import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetUsers = () => {
  const allUsersQuery = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await axios.get("/api/users/getAll");
      return response;
    },
  });

  return allUsersQuery;
};

export default useGetUsers;
