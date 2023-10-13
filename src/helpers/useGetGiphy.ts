import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetGiphy = (q?: string) => {
  const query = q ? q : "laugh"
  const gifsQuery = useQuery({
    queryKey: ["Gifs"],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY!}&q=${query}&limit=10&offset=0&rating=g&bundle=messaging_non_clips`
      );
      return response;
    },
  });
  console.log(gifsQuery?.data?.data?.data);
  return gifsQuery;
};

export default useGetGiphy;
