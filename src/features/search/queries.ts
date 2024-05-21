// queries.ts
import { gql } from "@apollo/client";

export const SEARCH_BOOKS = gql`
  query SearchBooks($page: Int!, $perPage: Int!, $searchQuery: String) {
    searchBooks(page: $page, perPage: $perPage, searchQuery: $searchQuery) {
      totalCount
      currentPage
      perPage
      books {
        id
        user_id
        donation_date
        book_information {
          book_information_id
          isbn_number
          title
          author
          published_date
          description
          image_path
        }
        latest_book_loan {
          id
          user_id
          book_id
          rent_date
          due_date
          return_date
          is_held
        }
        latest_book_request {
          id
          book {
            id
          }
          requester_id
          holder_id
          request_date
          status
        }
      }
    }
  }
`;
