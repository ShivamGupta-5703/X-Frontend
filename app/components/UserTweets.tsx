"use client";
import React from "react";
import FeedCard from "./FeedCard";
import { Tweet } from "@/clients/gql/graphql";
import { useGetUserById } from "@/hooks/user";

const UserTweets = ({ id }: { id: string }) => {
  const { user } = useGetUserById(id);
  const tweets = user?.tweets;
  return (
    <>
      {tweets?.map((tweet:any) =>
        tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null,
      )}
    </>
  );
};

export default UserTweets;