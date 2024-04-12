import { graphql } from "@/clients/gql";

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
          recommendedUsers{
            id
            firstname
            lastname
            profileImageURL
          }
          followers{
            id
            firstname
            lastname
            profileImageURL
          }
          following{
            id
            firstname
            lastname
            profileImageURL
          }
          tweets{
            id
            content
            imageURL
            author{
              id
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
        followers{
          id
          firstname
          lastname
          profileImageURL
        }
        following{
          id
          firstname
          lastname
          profileImageURL
        }
        tweets{
          content
          id
          imageURL
          author{
            id
            firstname
            lastname
            profileImageURL
          }
        }
      }
    } 
`);

