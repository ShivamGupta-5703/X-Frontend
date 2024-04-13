"use client"

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllTweetsQuery } from '@/graphql/query/tweet';
import { graphqlClient } from '@/clients/api';
import {Tweet} from '@/graphql/query/tweet';
import { DocumentNode } from 'graphql';
import { createTweetMutation } from '@/graphql/mutation/tweet';
import { CreateTweetData } from '@/gql/graphql';
import toast from 'react-hot-toast';


export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["getAllTweets"],
    queryFn: () => graphqlClient.request<{ getAllTweets: Tweet[] }>(getAllTweetsQuery as DocumentNode),
  });

  //console.log(query.isSuccess);
  
  return { ...query, tweets: query.data?.getAllTweets };  
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn : (payload : CreateTweetData) => graphqlClient.request(createTweetMutation as DocumentNode, {payload}),
    onMutate : (payload) => toast.loading("Creating Tweet ...", {id : '1'} ),
    onSuccess: async (payload) =>{
      await queryClient.invalidateQueries({queryKey: ["getAllTweets"]}),  // on success refetch all tweets
        toast.success("Tweet Created Successfully", {id : '1'})
      }
    });

  return mutation;
}
