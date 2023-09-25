import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetBookmarks = (userId:string) => {
  const allBookmarksQuery = useQuery({
    queryKey: ["allBookmarks"],
    queryFn: async () => {
      const response = await axios.get(`/api/bookmarks/getAllByUser/${userId}`);
      return response;
    },
  });

  return allBookmarksQuery;
};

export default useGetBookmarks;
