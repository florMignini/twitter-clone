import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


const useGetSessionData = () => {
    const userSessionQuery = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
      
          const response = await axios.get("/api/users/profile")
          return response
        },
      });

      return userSessionQuery.data?.data?.profileInfo
}

export default useGetSessionData