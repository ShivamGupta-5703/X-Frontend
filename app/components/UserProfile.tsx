"use client";
import Image from "next/image";
import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useGetUserById } from "@/hooks/user";

const UserProfile = ({ id }: { id: string }) => {
  console.log(id);
  
  const { user } = useGetUserById(id);
  console.log(user);
  
  

  return (
    <section className="mb-2 border-b border-gray-800">
        <nav className="flex items-center gap-3 py-1 px-2">
            <BsArrowLeftShort className="text-3xl mr-4" />
            <div>
                <h1 className="text-xl font-bold">{user?.firstname} {user?.lastname}</h1>
                <h1 className="text-xs text-slate-600">{user?.tweets?.length} Tweets</h1>
            </div>
        </nav>
      <Image
        src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
        width={800}
        height={250}
        alt="cover" 
        className="h-44 w-full object-cover"
      />
      <button className="float-right m-4 rounded-full bg-white px-4 py-2 font-bold text-black">Follow</button>
      <section className="mx-4 mb-2">
        <div className="-mt-24">
          {user?.profileImageURL && ( 
            <Image
              src={user?.profileImageURL}
              width={150}
              height={150}
              alt="profile image"
              className="rounded-full border-8 border-black"
            />
          )}
          <h3 className="text-2xl font-bold">
            {user?.firstname} {user?.lastname}
          </h3>
          {user && (
            <p className="text-gray-600">
              @{user?.firstname}
              {user?.lastname}
            </p>
          )}
        </div>
        <div className=" flex items-center gap-2 text-center mt-4">
          <button>
            {/* <span>{user?.following?.length} </span> */}
            <span className="text-sm font-bold">100  </span> <span className="text-sm text-gray-600"> Following </span>
          </button>
          <button>
            {/* <span>{user?.followers?.length} </span> */}
            <span className="text-sm font-bold">100  </span> <span className="text-sm text-gray-600"> Followers </span>
          </button>
        </div>
      </section>
    </section>
  );
};

export default UserProfile;