import React from "react";

import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";

import { BooksArea } from "../../components/Book/BooksArea";
import { PaginationComponent } from "../../components/Common/Pagination";

import { PAGINATED_BOOK_REQUESTS } from "@/features/request/queries";
import { PaginationData } from "@/types/interface";

const RequestBooksPage: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, loading, error, refetch } = useQuery<{
    paginatedBookRequests: PaginationData;
  }>(PAGINATED_BOOK_REQUESTS, {
    variables: {
      page: currentPage,
      perPage: 12,
    },
  });

  if (error) return <p>Error: {error.message}</p>;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
    refetch({
      page: page,
      perPage: 12,
    });
  };

  return (
    <Box>
      <BooksArea
        bookRequests={data?.paginatedBookRequests.bookRequests || []}
        loading={loading}
      />
      <Box mt={4} display="flex" justifyContent="center">
        <PaginationComponent
          totalCount={data?.paginatedBookRequests.totalCount || 0}
          currentPage={currentPage}
          perPage={data?.paginatedBookRequests.perPage || 12}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default RequestBooksPage;
