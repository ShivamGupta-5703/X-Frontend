import { graphql } from "@/gql";

export const likeTweetMutation = graphql(`
  #graphql
  mutation LikeTweet($payload: LikeUnlikeTweetData!) {
    likeTweet(payload: $payload) {
      id
      content
      imageURL
      author {
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
export const unLikeTweetMutation = graphql(`
  #graphql
  mutation UnlikeTweet($payload: LikeUnlikeTweetData!) {
    unlikeTweet(payload: $payload) {
      id
      content
      imageURL
      author {
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