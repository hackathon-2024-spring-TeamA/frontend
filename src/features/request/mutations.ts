import { gql } from "@apollo/client";

export const UPDATE_BOOK_REQUEST_STATUS = gql`
  mutation UpdateBookRequestStatus(
    $requestId: String!
    $status: String!
    $userId: String
    $bookId: Int
  ) {
    updateBookRequestStatus(
      requestId: $requestId
      status: $status
      userId: $userId
      bookId: $bookId
    ) {
      id
      status
    }
  }
`;
