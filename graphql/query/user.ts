import { graphql } from "@/gql";

export const verifyUserGoogleTokenQuery = graphql(
    `#graphql
    query VerifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }
`);


export const getCurrentUserQuery = graphql(
    `#graphql
    query GetCurrentUser{
        getCurrentUser {
          email
          firstname
          id
          lastname
          profileImageURL
          tweets{
            id
            content
            author{
              firstname
              lastname
              profileImageURL
            }
          }
        }
      }
`);

export const getUserByIdQuery = graphql(
  `#graphql
    query GetUserById($id : ID!){
      getUserById(id : $id){
        id
        firstname
        lastname
        profileImageURL
        tweets{
          content
          id
          imageURL
          author{
            firstname
            lastname
            profileImageURL
          }
        }
      }
    } 
`);

