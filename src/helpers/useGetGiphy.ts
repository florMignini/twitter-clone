import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetGiphy = (query?: string) => {
  const gifsQuery = useQuery({
    queryKey: ["Gifs"],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/trending?api_key=8T3Rr73UIIGUQdnSXo5YOX7BqLpb5Jyd&limit=8&offset=0&rating=g&bundle=messaging_non_clips`
      );
      return response;
    },
  });
  console.log(gifsQuery?.data?.data?.data);
  return gifsQuery;
};

export default useGetGiphy;
