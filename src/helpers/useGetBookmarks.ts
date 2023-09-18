import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetBookmarks = () => {
  const allBookmarksQuery = useQuery({
    queryKey: ["allBookmarks"],
    queryFn: async () => {
      const response = await axios.get("/api/bookmarks/get");
      return response;
    },
  });
//   console.log(allBookmarksQuery?.data?.data)
  return allBookmarksQuery;
};

export default useGetBookmarks;
