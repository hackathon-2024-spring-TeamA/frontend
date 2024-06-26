import React, { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import { Box, Grid, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { PaginationComponent } from "../../components/Common/Pagination";
import { SearchInput } from "../../components/Common/SearchInput";
import { SearchBookCard } from "../../components/Search/SearchBookCard";

import AlertSnackbar from "@/components/SnackBar/AlertSnackBar";
import { SEARCH_BOOKS } from "@/features/search/queries";
import { GET_USER_NICKNAME } from "@/features/user/queries";
import { SearchPaginationData } from "@/types/interface";
import "@aws-amplify/ui-react/styles.css";

const SearchBooksPage: React.FC<WithAuthenticatorProps> = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.donationSuccess) {
      setSnackbarOpen(true);
      // Clear the state after showing the snackbar
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  console.log(user?.userId);

  const { data: userNicknameData } = useQuery(GET_USER_NICKNAME, {
    variables: { userId: user?.userId },
  });

  const nickname = userNicknameData?.getUserNickname;
  console.log(nickname);

  const { data, loading, error, refetch } = useQuery<{
    searchBooks: SearchPaginationData;
  }>(SEARCH_BOOKS, {
    variables: {
      page: currentPage,
      perPage: 8,
      searchQuery: searchQuery,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  if (error) return <p>Error: {error.message}</p>;

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  if (!user) {
    return <div>Hello</div>;
  }

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
                  <SearchBookCard book={book} userId={user?.userId || ""} />
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
      <AlertSnackbar
        open={snackbarOpen}
        message="We are grateful for your donation!!!!🎊"
        severity="success"
        onClose={handleSnackbarClose}
      />
    </Box>
  );
};

const SearchBooksPageWithAuthenticator = withAuthenticator(SearchBooksPage);

export default SearchBooksPageWithAuthenticator;
