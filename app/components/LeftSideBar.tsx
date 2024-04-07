import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Image from 'next/image'

//Icons
import { BsTwitterX } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { PiBell } from "react-icons/pi";
import { LuMail } from "react-icons/lu";
import { LuSquareSlash } from "react-icons/lu";
import { LuMenuSquare } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { CiCircleMore } from "react-icons/ci";
import { useGetCurrentUser } from "@/hooks/user";
import { FiMoreHorizontal } from "react-icons/fi";
import { useMemo } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter ",
  description: "Generated by create next app",
};

interface TwitterSideBarIcons{
    title : string,
    icon : React.ReactNode,
    link : string,
}
  
const LeftSideBar = () => {
  const {user} = useGetCurrentUser();
  //console.log(user);
  //console.log(user?.id);
  
  const sideBarItems : TwitterSideBarIcons[] = [
    {
      title : "Home",
      icon : <GoHomeFill />,
      link : '/',
    },
    {
      title : "Explore",
      icon : <FiSearch />,
      link : '/',
    },
    {
      title : "Notifications",
      icon : <PiBell />,
      link : '/',
    },
    {
      title : "Messages",
      icon : <LuMail />,
      link : '/',
    },
    {
      title : "Grok",
      icon : <LuSquareSlash />,
      link : '/',
    },
    {
      title : "Lists",
      icon : <LuMenuSquare />,
      link : '/',
    },
    {
      title : "Premium",
      icon : <BsTwitterX />,
      link : '/',
    },
    {
      title : "Profile",
      icon : <CiUser />,
      link : `/${user?.id}`,
    },
    {
      title : "More",
      icon : <CiCircleMore />,
      link : '/',
    }
  ];

  return (
    <div className="flex-col">
        <div className="text-3xl h-fit w-fit hover:bg-gray-900 rounded-full p-5 transition-all delay-75 cursor-pointer">
          <BsTwitterX />
        </div>
        <div> 
          <ul>
            {sideBarItems.map((item)=>(
              <li key={item.title}>
                <Link href={item.link} className="flex justify-start items-center gap-4 py-2 m-2 w-fit hover:bg-gray-900 px-4 rounded-full cursor-pointer transition-all delay-75">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-lg hover:font-semibold hidden sm:inline">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul> 
          <button className="hidden sm:block justify-start items-center gap-3 px-28 py-3 h-fit font-bold bg-[#1A8CD8] rounded-full cursor-pointer">Post</button>
          <button className="block sm:hidden justify-start items-center gap-3 ml-5 px-2 py-2 h-fit font-bold bg-[#1A8CD8] rounded-full cursor-pointer"><BsTwitterX /></button>

        </div>
        { user && (
          <div className="bottom-2 flex gap-3 px-4 py-1 mt-8 h-fit items-center hover:bg-slate-900 rounded-full">
            {user && user.profileImageURL && (
              <Image
                className = "rounded-full "
                src = {user?.profileImageURL}
                alt = "profile image"
                height = {35}
                width = {35}
              />
            )}
            <div className="hidden sm:block flex-col">
              <h3 className="text-md font-semibold">{user.firstname} {user.lastname}</h3>
              <p className="text-gray-600">@shivgupta5703</p>            
            </div>
            <div className="hidden sm:block h-full ml-8 text-xl cursor-pointer">
					    <FiMoreHorizontal />
				    </div>
          </div>
        )}
    </div>
  )
}

export default LeftSideBar