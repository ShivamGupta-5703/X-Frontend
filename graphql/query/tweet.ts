import { graphql } from "@/gql";

export interface Tweet {
    id: string;
    content: string;
    imageURL: string;
    author: {
        id : string;
        firstName: string;
        lastName: string;
        profileImageURL: string;
    };
}

export const getAllTweetsQuery = graphql(
    `#graphql
    query GetAllTweets{
        getAllTweets {
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
`);

export const getSignedURLForTweetQuery = graphql(`
  query GetSignedURL($imageName: String!, $imageType: String!) {
    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)
  }
`);