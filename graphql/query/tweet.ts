import { graphql } from "@/gql";

export interface Tweet {
    id: string;
    content: string;
    imageURL: string;
    author: {
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
                firstname
                lastname
                profileImageURL
            }
        }
      }
`);

