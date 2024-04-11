"use client";
import React from "react";
import { useGetAllTweets } from "../../hooks/tweet";
import FeedCard from "./FeedCard";
import { Tweet } from "@/gql/graphql";

interface FeedProps {
  tweets?: Tweet[];
}

export default function Feed(props: FeedProps) {

    // for getting tweets on client side
    const {tweets = props.tweets as Tweet[] } = useGetAllTweets(); 

    //console.log(props);
    //console.log(tweets);
    
    return (
    <>
      {tweets?.map((tweet) =>
        tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null,
      )}
    </>
  );
};


//to server side render the tweets
// export const getServerSideProps : GetServerSideProps<FeedProps> = async (context) => {
//   const allTweets = await  graphqlClient.request<{ getAllTweets: Tweet[] }>(getAllTweetsQuery as DocumentNode);
//   console.log(allTweets);
  
//   return{
//     props : {
//       tweets : allTweets.getAllTweets as Tweet[],
//     }
//   }
// }