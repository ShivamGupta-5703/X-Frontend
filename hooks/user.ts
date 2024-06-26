

import { useMutation, useQuery } from '@tanstack/react-query';
import { getCurrentUserQuery, getUserByIdQuery } from '@/graphql/query/user';
import { graphqlClient } from "@/clients/api"
import { followUserMutation } from '@/graphql/mutation/user';


export const useGetCurrentUser = () => {
    const query = useQuery({
      queryKey: ["currentUser"],
      queryFn: () => graphqlClient.request(getCurrentUserQuery),
    });
    //console.log(query.isSuccess);
    //console.log("asdfghjk");
    
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

export const useFollowUser = (id: string) => {
  const mutation = useMutation({
    mutationKey: [`follow-${id}`],
    mutationFn: () => graphqlClient.request(followUserMutation, { to: id }),
  });
  return mutation;
};