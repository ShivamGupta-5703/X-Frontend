"use client";
import React, { useCallback, useMemo, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useLikeTweet, useUnlikeTweet } from "../../hooks/like";
import { Likes } from "@/gql/graphql";
import { useGetCurrentUser } from "../../hooks/user";

export const LikeButton = ({
  tweetId,
  likes,
}: {
  tweetId: string;
  likes: Likes[];
}) => {
  const [totalLikes, setTotalLikes] = useState(likes);
  const { mutateAsync: likeMutation } = useLikeTweet();
  const { mutateAsync: unlikeMutation } = useUnlikeTweet();
  const { user } = useGetCurrentUser();

  const isLikedByMe = useMemo(() => {
    return totalLikes?.findIndex(
      (element) => user?.id === element.liker?.id,
    ) !== -1
      ? true
      : false;
  }, [totalLikes, user]);

  const handleLikeTweet = useCallback(async () => {
    const tweet = await likeMutation({
      tweetId: tweetId,
    }) as any;
    setTotalLikes(tweet.likeTweet?.likes as Likes[]);
  }, [likeMutation, totalLikes]);

  const handleUnikeTweet = useCallback(async () => {
    const tweet = await unlikeMutation({
      tweetId: tweetId,
    }) as any;
    setTotalLikes(tweet.likeTweet?.likes as Likes[]);
  }, [unlikeMutation, totalLikes]);

  return isLikedByMe ? (
    <button
      className="flex cursor-pointer items-center gap-2 text-pink-600"
      onClick={handleUnikeTweet}
    >
      <FcLike />
      <span className="text-sm">{totalLikes?.length}</span>
    </button>
  ) : (
    <button
      className="flex cursor-pointer items-center gap-2"
      onClick={handleLikeTweet}
    >
      <AiOutlineHeart />
      <span className="text-sm">{totalLikes?.length}</span>
    </button>
  );
};
