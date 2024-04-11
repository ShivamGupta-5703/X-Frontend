

import { useQuery } from '@tanstack/react-query';
import { getCurrentUserQuery, getUserByIdQuery } from './../graphql/query/user';
import { graphqlClient } from "@/clients/api"


export const useGetCurrentUser = () => {
    const query = useQuery({
      queryKey: ["currentUser"],
      queryFn: () => graphqlClient.request(getCurrentUserQuery),
    });
    return { ...query, user: query.data?.getCurrentUser };
};
 

export const useGetUserById = (id: string) => {
  const query = useQuery({
    queryKey: ["getUserById"],
    queryFn: () => graphqlClient.request(getUserByIdQuery, { id }),
  });

  //console.log(query.data);
  
  return { ...query, user: query.data?.getUserById };
};