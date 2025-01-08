import { gql } from 'apollo-angular';

export const GET_IMAGES = gql`
  query GetImages($first: Int, $after: String, $title: String) {
    images(first: $first, after: $after, title: $title) {
      edges {
        cursor
        node {
          id
          title
          author
          price
          likesCount
          liked
          picture
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

// Mutación para like/unlike
export const LIKE_IMAGE = gql`
  mutation LikeImage($input: LikeImageInput!) {
    likeImage(input: $input) {
      image {
        liked
        likesCount
      }
    }
  }
`;