import { gql } from "@apollo/client";

export const PAGINATED_BOOK_REQUESTS = gql`
  query PaginatedBookRequests($page: Int!, $perPage: Int!) {
    paginatedBookRequests(page: $page, perPage: $perPage) {
      totalCount
      currentPage
      perPage
      bookRequests {
        id
        book {
          id
          user_id
          book_information {
            book_information_id
            isbn_number
            title
            author
            published_date
            description
            image_path
          }
          donation_date
        }
        requester_id
        holder_id
        request_date
        status
      }
    }
  }
`;
