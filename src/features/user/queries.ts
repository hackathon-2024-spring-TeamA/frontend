import { gql } from "@apollo/client";

export const GET_USER_NICKNAME = gql`
  query GetUserNickname($userId: String!) {
    getUserNickname(userId: $userId)
  }
`;

export const GET_USER_BOOK_LOANS = gql`
  query GetUserBookLoans($userId: String!) {
    getUserBookLoans(userId: $userId) {
      id
      book {
        book_information {
          title
        }
      }
      rent_date
      due_date
    }
  }
`;
