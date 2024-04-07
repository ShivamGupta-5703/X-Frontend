'use client';

import React, { useCallback } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import LeftSideBar from "./components/LeftSideBar";
import { Toaster } from 'react-hot-toast';
import {QueryProvider} from "./providers/QueryProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { LoginButton } from "./components/LoginButton";


const inter = Inter({ subsets: ["latin"] });

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            <div className={inter.className}>
              <div className="grid grid-cols-12 h-screen w-screen sm:px-28">
                <div className="col-span-2 sm:col-span-3 pt-1 sm:pl-5 flex sm:justify-end pr-4">
                  <LeftSideBar/>
                </div>  

                <div className="col-span-10 sm:col-span-5 border border-gray-800 border-l-[1px] border-r-[1px] h-screen overflow-scroll">
                  {children}
                </div>

                <div className="col-span-0 sm:col-span-3 p-5">
                  <LoginButton/>
                </div>
              </div>
            </div>
            <Toaster/>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}



