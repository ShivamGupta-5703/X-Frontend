import { graphql } from "@/gql";

 
export const createTweetMutation = graphql(`
    #graphql
    mutation createTweet($payload: CreateTweetData!) {
        createTweet(payload: $payload){
            id
        }
    }
`)