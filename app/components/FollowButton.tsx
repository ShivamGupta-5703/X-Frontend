import React, { HTMLAttributes, useCallback, useMemo } from "react";
import { useGetCurrentUser } from "../../hooks/user";
import { graphqlClient, queryClient } from "@/clients/api";
import {
  followUserMutation,
  unfollowUserMutation,
} from "@/graphql/mutation/user";
import { User } from "@/gql/graphql";

interface FollowButtonProps extends HTMLAttributes<HTMLButtonElement> {
  user: User;
}

const FollowButton: React.FC<FollowButtonProps> = ({ className, user }) => {
  const { user: currentUser } = useGetCurrentUser();

  const flag = user?.id !== currentUser?.id;

  const amIFollowing = useMemo(() => {
    if (!user) return false;
    return (
      (currentUser?.following?.findIndex(
        (el) => el?.id === user?.id
      ) ?? -1) >= 0
    );
  }, [currentUser?.following, user]);

  const handleFollow = useCallback(async () => {
    if (!user?.id) return;
    await graphqlClient.request(followUserMutation, { to: user.id });

    // refresh currentUser and currently followed user
    await queryClient.invalidateQueries({queryKey: ["currentUser"],});
    await queryClient.invalidateQueries({queryKey: ["getUserById"]});
  }, [user?.id]);

  const handleUnfollow = useCallback(async () => {
    if (!user?.id) return;
    await graphqlClient.request(unfollowUserMutation, { to: user.id });

    // refresh currentUser and previously followed user
    await queryClient.invalidateQueries({queryKey: ["currentUser"],});
    await queryClient.invalidateQueries({queryKey: ["getUserById"]});
  }, [user?.id]);

  return flag ? (
    amIFollowing ? (
      <button
        className={`${className} rounded-full bg-white p-1 px-2 font-bold text-black`}
        onClick={handleUnfollow}
      >
        Unfollow
      </button>
    ) : (
      <button
        className={`${className} rounded-full bg-white p-1 px-2 font-bold text-black`}
        onClick={handleFollow}
      >
        Follow
      </button>
    )
  ):(<></>);
};

export default FollowButton;