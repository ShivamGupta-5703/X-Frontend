"use client";
import React from "react";
import { useGetAllTweets } from "../../hooks/tweet";
import FeedCard from "./FeedCard";
import { Tweet } from "@/gql/graphql";

interface FeedProps {
  tweets?: Tweet[];
}

export default function Feed(props: FeedProps) {
    const {tweets = props.tweets as Tweet[] } = useGetAllTweets(); 
    return (
    <>
      {tweets?.map((tweet) =>
        tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null,
      )}
    </>
  );
};