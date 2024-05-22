// mutations.ts
import { gql } from "@apollo/client";

export const CREATE_BOOK_REQUEST = gql`
  mutation CreateBookRequest($request: CreateBookRequestInput!) {
    createBookRequest(request: $request) {
      isSuccess
      errorMessage
    }
  }
`;
