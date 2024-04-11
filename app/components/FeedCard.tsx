import React from 'react'
import Image from 'next/image'

import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { CgInsights } from "react-icons/cg";
import { Tweet } from '@/gql/graphql';
import { FiMoreHorizontal } from 'react-icons/fi';
import Link from 'next/link';

interface FeedCardProps{
  data: Tweet
}

const FeedCard : React.FC<FeedCardProps> = (props) => {
  const { data } = props;
  return (
    <div className='border border-gray-600 border-l-0 border-r-0 border-t-0 p-3 hover:bg-slate-900 transition-all cursor-pointer'>
        <div className='grid grid-cols-12'>
            <div className='col-span-1 p-1'>
                { data.author?.profileImageURL &&
                  <Image 
                  className = "rounded-full" 
                  src={data.author.profileImageURL} 
                  alt='user-image' 
                  width={70} 
                  height={70}    
                 />
                }
            </div>
            <div className='col-span-11 px-1'>
              <span className="float-right py-1 text-gray-600">
                <FiMoreHorizontal />
              </span>
              <Link href={`/${data.author?.id}`}>
                <span className="font-semibold">
                  {data.author?.firstname} {data.author?.lastname}
                </span>
              </Link>
              <span className="mx-3 text-gray-600">@shivgupta5703</span>
              <p>{data.content}</p>
              {
                data.imageURL && <Image src={data.imageURL} alt='image' width={400} height={400}/>
              }
              <div className="flex justify-between mt-5 text-xl font-medium items-center p-2 w-[90%]">
                <div>
                  <BiMessageRounded />
                </div>
                <div>
                  <FaRetweet />
                </div>
                <div>
                  <AiOutlineHeart />
                </div>
                <div>
                  <CgInsights/>
                </div>
                <div className='flex gap-4'>
                  <BsBookmark />
                  <BiUpload />
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default FeedCard