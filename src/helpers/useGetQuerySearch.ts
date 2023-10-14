import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetQuerySearch = (query:string) => {
  const querySearch = useQuery({
    queryKey: ["querySearch"],
    queryFn: async () => {
      const response = await axios.get(`/api/users/search/${query}`);
      return response;
    },
  });

  return querySearch;
};

export default useGetQuerySearch;
