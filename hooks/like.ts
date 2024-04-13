import { graphqlClient } from "@/clients/api";
import { LikeUnlikeTweetData } from "@/gql/graphql";
import {
  likeTweetMutation,
  unLikeTweetMutation,
} from "@/graphql/mutation/like";
import { useMutation } from "@tanstack/react-query";
import { DocumentNode } from "graphql";

export const useLikeTweet = () => {
  const mutation = useMutation({
    mutationFn: (payload: LikeUnlikeTweetData) =>
      graphqlClient.request(likeTweetMutation as DocumentNode, { payload }),
  }) as any ;
  //console.log("hiiiiiiiiiiiiiiii");
  
  //console.log(mutation);
  
  return mutation;
};
export const useUnlikeTweet = () => {
  const mutation = useMutation({
    mutationFn: (payload: LikeUnlikeTweetData) =>
      graphqlClient.request(unLikeTweetMutation as DocumentNode, { payload }),
  }) as any;
  return mutation;
};