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
  const userId = "a1b2c3d4-e5f6-7890-1234-567890abcdef";

  const { data, loading, error, refetch } = useQuery<{
    paginatedBookRequests: PaginationData;
  }>(PAGINATED_BOOK_REQUESTS, {
    variables: {
      page: currentPage,
      perPage: 8,
      userId, // ここは実際のユーザーIDに置き換える
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          mb: 0,
        }}
      >
        <Button
          variant={isMyRequest ? "contained" : "outlined"}
          onClick={() => handleTabChange(true)}
          sx={{
            borderRadius: "4px",
            px: 4,
            py: 2,
            fontWeight: "bold",
            textTransform: "none",
            minWidth: "240px",
            mb: { xs: 2, sm: 0 },
            mr: { xs: 0, sm: 2 },
            backgroundColor: isMyRequest ? "primary.main" : "white",
            color: isMyRequest ? "white" : "primary.main",
            border: "1px solid",
            borderColor: "primary.main",
            "&:hover": {
              backgroundColor: isMyRequest ? "primary.dark" : "primary.light",
            },
          }}
        >
          リクエストした本
        </Button>
        <Button
          variant={!isMyRequest ? "contained" : "outlined"}
          onClick={() => handleTabChange(false)}
          sx={{
            borderRadius: "4px",
            px: 4,
            py: 2,
            fontWeight: "bold",
            textTransform: "none",
            minWidth: "240px",
            backgroundColor: !isMyRequest ? "primary.main" : "white",
            color: !isMyRequest ? "white" : "primary.main",
            border: "1px solid",
            borderColor: "primary.main",
            "&:hover": {
              backgroundColor: !isMyRequest ? "primary.dark" : "primary.light",
            },
          }}
        >
          リクエストされた本
        </Button>
      </Box>
      <Box mt={-2}>
        <BooksArea
          bookRequests={data?.paginatedBookRequests.bookRequests || []}
          loading={loading}
          userId={userId}
        />
      </Box>
      <Box mt={-4} display="flex" justifyContent="center">
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
