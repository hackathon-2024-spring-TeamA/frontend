import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import { Box, Button } from "@mui/material";

import { BooksArea } from "../../components/Book/BooksArea";
import { PaginationComponent } from "../../components/Common/Pagination";

import { PAGINATED_BOOK_REQUESTS } from "@/features/request/queries";
import { PaginationData } from "@/types/interface";

const RequestBooksPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMyRequest, setIsMyRequest] = useState(true);

  const { data, loading, error, refetch } = useQuery<{
    paginatedBookRequests: PaginationData;
  }>(PAGINATED_BOOK_REQUESTS, {
    variables: {
      page: currentPage,
      perPage: 12,
      userId: "a1b2c3d4-e5f6-7890-1234-567890abcdef", // ここは実際のユーザーIDに置き換える
      isMyRequest: isMyRequest,
    },
    fetchPolicy: "network-only",
  });

  if (error) return <p>Error: {error.message}</p>;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  const handleTabChange = (myRequest: boolean) => {
    setIsMyRequest(myRequest);
    setCurrentPage(1);
    refetch({
      page: 1,
      perPage: 12,
      userId: "your_user_id",
      isMyRequest: myRequest,
    });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Button
          variant={isMyRequest ? "contained" : "outlined"}
          onClick={() => handleTabChange(true)}
          sx={{ mr: 2 }}
        >
          リクエスト
        </Button>
        <Button
          variant={!isMyRequest ? "contained" : "outlined"}
          onClick={() => handleTabChange(false)}
        >
          要対応
        </Button>
      </Box>
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
