"use client"

import React from 'react';
import { useGetCurrentUser } from "@/hooks/user";
import Image from 'next/image';
import Link from 'next/link';

export const RecommendationCard = () => {

    const {user} = useGetCurrentUser();
    //console.log(user?.recommendedUsers);

  return (
    <div className="sm:col-span-5 p-5">
            {user && user.recommendedUsers && (
                <div className="p-4 justify-center items-center rounded-lg w-[350px] bg-zinc-900">
                    <h1 className="font-extrabold text-2xl px-2">You might like</h1>
                    {user.recommendedUsers.map((el) => (
                        <div key={el?.id} className="bottom-2 flex hover:bg-gray-800 rounded-full p-3 w-full gap-3 py-1 mt-5 h-fit items-center">
                            {el?.profileImageURL && (
                                <Image
                                    className="rounded-full"
                                    src={el?.profileImageURL}
                                    alt="profile image"
                                    height={35}
                                    width={35}
                                />
                            )}
                            <div className="hidden sm:block flex-col">
                                <h3 className="text-md font-semibold">{el?.firstname} {el?.lastname}</h3>
                                <p className="text-gray-600">@{el?.firstname}{el?.lastname}</p>
                            </div>
                            <div className="ml-auto">
                                <Link href={`/${el?.id}`} className="rounded-full bg-white py-1 px-5 font-bold text-black">View</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
  )
}