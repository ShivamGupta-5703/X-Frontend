import { graphql } from "@/gql";

export interface Tweet {
    id: string;
    content: string;
    imageURL: string;
    author: {
        id : string;
        firstname: string;
        lastname: string;
        profileImageURL: string;
    };
    likes: {
        liker: {
          id : string;
          firstname: string;
          lastname: string;
        }
    }
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
            likes {
                liker {
                  id
                  firstname
                  lastname
                }
            }
        }
      }
`);

export const getSignedURLForTweetQuery = graphql(`
  query GetSignedURL($imageName: String!, $imageType: String!) {
    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)
  }
`);