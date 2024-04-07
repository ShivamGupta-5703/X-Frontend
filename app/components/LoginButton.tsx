"use client"

import React, { useCallback } from 'react'
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "../../graphql/query/user";
import { useQueryClient } from '@tanstack/react-query'
import { useGetCurrentUser } from "@/hooks/user";
import { CredentialResponse } from '@react-oauth/google';
import { GoogleLogin } from "@react-oauth/google";
import { toast } from 'react-hot-toast';


export const LoginButton = () => {

    const {user} = useGetCurrentUser();
    const queryClient = useQueryClient();
    //console.log(user);
    

    const handleLoginWithGoogle = useCallback(async (cred : CredentialResponse) => {
      const googleToken = cred.credential;
      if(!googleToken) return toast.error(`Google Token not found`);

      const {verifyGoogleToken} = await graphqlClient.request(
        verifyUserGoogleTokenQuery , {token : googleToken}
      );
      
      if(verifyGoogleToken){
          localStorage.setItem("x_token", verifyGoogleToken);
          toast.success('Verified Successfully');
      }
      await queryClient.invalidateQueries({queryKey: ["currentUser"]});

    },[queryClient])  

  return (
    !user && (
        <div className="sm:col-span-5 p-9">
          <div className="border border-gray-700 p-4 justify-center items-center rounded-lg w-72">
            <h1 className="font-extrabold text-2xl p-2">New to X?</h1>
            <p className="text-xs text-slate-500 pb-3">Sign up now to get your own personalized timeline!</p>
            <GoogleLogin
              onSuccess={handleLoginWithGoogle}
              onError={() => {
                console.log('Login Failed');
              }}
              shape="pill"
              size="large"
            />
            <p className="text-xs text-slate-500 pt-3">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
          </div>
        </div>
    )
  )
}