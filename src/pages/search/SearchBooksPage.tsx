import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import { Box, Grid, CircularProgress } from "@mui/material";

import { PaginationComponent } from "../../components/Common/Pagination";
import { SearchInput } from "../../components/Common/SearchInput";
import { SearchBookCard } from "../../components/Search/SearchBookCard";

import { SEARCH_BOOKS } from "@/features/search/queries";
import { SearchPaginationData } from "@/types/interface";

import "@aws-amplify/ui-react/styles.css";

const SearchBooksPage: React.FC<WithAuthenticatorProps> = ({ user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(user);

  const { data, loading, error } = useQuery<{
    searchBooks: SearchPaginationData;
  }>(SEARCH_BOOKS, {
    variables: {
      page: currentPage,
      perPage: 8,
      searchQuery: searchQuery,
    },
  });

  if (error) return <p>Error: {error.message}</p>;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <Box py={4}>
      <Box maxWidth="xl" mx="auto" px={4}>
        <Box mb={4}>
          <SearchInput
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </Box>
        <Box bgcolor="grey.100" p={4} borderRadius="10px">
          <Grid container spacing={4}>
            {loading ? (
              <Grid item xs={12} display="flex" justifyContent="center">
                <CircularProgress />
              </Grid>
            ) : (
              data?.searchBooks.books.map((book, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <SearchBookCard book={book} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
      <Box mt={4} display="flex" justifyContent="center">
        <PaginationComponent
          totalCount={data?.searchBooks.totalCount || 0}
          currentPage={currentPage}
          perPage={data?.searchBooks.perPage || 12}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default withAuthenticator(SearchBooksPage);
