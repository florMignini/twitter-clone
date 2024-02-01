import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


const useGetUserInfo = (userId:string) => {
  // console.log(userId)
    const userSessionQuery = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
      
          const response = await axios.get(`/api/users/info/${userId}`)
          return response
        },
      });
      // console.log(userSessionQuery.data?.data)
      return userSessionQuery.data?.data
}

export default useGetUserInfo