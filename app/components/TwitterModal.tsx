"use client";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useGetCurrentUser } from "../../hooks/user";
import { BsImage } from "react-icons/bs";
import { AiOutlineFileGif, AiOutlineUnorderedList } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { MdEventRepeat } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { graphqlClient } from "@/clients/api";
import { useCreateTweet } from "@/hooks/tweet";
import { IoEarthSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import toast from "react-hot-toast";
import axios from "axios";
import { DocumentNode } from "graphql";
     

export const TweetModal = () => {
  const { user } = useGetCurrentUser();
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const {mutateAsync} = useCreateTweet();

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;

      const {getSignedURLForTweet} = await graphqlClient.request(
        getSignedURLForTweetQuery as DocumentNode,
        {
          imageName: file.name,
          imageType: file.type,
        }
      ) as { getSignedURLForTweet: string };

      //console.log(getSignedURLForTweet);
      

      if (getSignedURLForTweet) {
        toast.loading("Uploading...", { id: "2" });
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        toast.success("Upload Completed", { id: "2" });
        const url = new URL(getSignedURLForTweet);
        //console.log(url);
        
        const myFilePath = `${url.origin}${url.pathname}`;
        //console.log(myFilePath);
        //console.log(typeof(myFilePath));
        setImageURL(myFilePath);
        //console.log(imageURL);
      }
    };
  }, [imageURL]);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handlerFn = handleInputChangeFile(input);
    //console.log(handlerFn);
    

    input.addEventListener("change", handlerFn);

    input.click();
  }, [handleInputChangeFile]);

  const handleCreateTweet = useCallback(async () => {
    await mutateAsync({
      content,
      imageURL,
    });
    setContent("");
    setImageURL("");
  }, [mutateAsync, content, imageURL]);

  return (
    <section>
      <div className='flex items-center justify-evenly bg-black border-b border-gray-800'>
        <div className='cursor-pointer hover:bg-gray-900 w-full text-center px-3 py-3'>
          <h1 className='font-bold  text-md'>For you</h1>
        </div>  
        <div className='cursor-pointer hover:bg-gray-900 w-full text-center px-3 py-3'>
          <h1 className='font-bold  text-md'>Following</h1>  
        </div>
        <div className="flex items-center text-xl cursor-pointer hover:bg-gray-800 rounded-full p-2">
          <IoSettingsOutline />
        </div>
      </div>

      <div className="h-min-48 grid grid-cols-12 gap-2 border-b-[0.5px] border-b-gray-800 p-4 pb-0">
      {user?.profileImageURL && (
        <Image
          src={user?.profileImageURL}
          width={60}
          height={60}
          alt={"profile image"}
          className="col-span-1 row-span-4 rounded-full"
        />
      )}
      <div className="col-span-11 flex flex-col gap-2 border-b border-b-gray-800 p-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?!"
          className="bg-black text-xl resize-none"
          rows = {3}
        />
        {imageURL && (
          <Image
            src={imageURL}
            alt="Uploaded tweet image"
            height={200}
            width={300}
          />
        )}
        <span className="text-sky-500 flex gap-1 text-sm font-bold mt-1"><IoEarthSharp className="mt-0.5"/>Everyone can reply</span>
      </div>
      <div className="col-span-11 flex justify-between">
        <div className="flex cursor-pointer gap-4 p-2 text-lg font-bold text-sky-500">
          <BsImage onClick={handleSelectImage} />
          <AiOutlineFileGif />
          <AiOutlineUnorderedList />
          <BsEmojiSmile />
          <MdEventRepeat />
          <HiOutlineLocationMarker />
        </div>
        <button
          className="h-8 w-16 cursor-pointer rounded-full bg-blue-500 text-sm font-semibold"
          onClick={handleCreateTweet}
        >
          Post
        </button>
      </div>
      </div>
    </section>
  );
};