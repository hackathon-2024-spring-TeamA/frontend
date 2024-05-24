import { gql } from "@apollo/client";

export const SAVE_BOOK_MUTATION = gql`
  mutation SaveBook(
    $user_id: String!
    $isbn_number: String!
    $title: String!
    $author: String!
    $published_date: String
    $description: String
    $image_path: String
  ) {
    saveBook(
      user_id: $user_id
      isbn_number: $isbn_number
      title: $title
      author: $author
      published_date: $published_date
      description: $description
      image_path: $image_path
    ) {
      book {
        id
        user_id
        book_information {
          book_information_id
          title
          author
        }
      }
      error
    }
  }
`;
