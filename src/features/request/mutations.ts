import { gql } from "@apollo/client";

export const UPDATE_BOOK_REQUEST_STATUS = gql`
  mutation UpdateBookRequestStatus($requestId: String!, $status: String!) {
    updateBookRequestStatus(requestId: $requestId, status: $status) {
      id
      status
    }
  }
`;
