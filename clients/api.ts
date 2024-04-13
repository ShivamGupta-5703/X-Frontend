"use client"

import { QueryClient } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

// check if authentication is done in client side
const isClient = typeof window !== 'undefined';

export const graphqlClient = new GraphQLClient('https://d329pn2dc1px4y.cloudfront.net/graphql',{

    // if authentication is done in client side then only set the token. 
    // [Security check because nextjs sometimes renders the page in server side but authentication is done in client side]
    headers : () => ({ Authorization: isClient ? `Bearer ${localStorage.getItem('x_token')}` : "" }),

});



export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
  });
  




    