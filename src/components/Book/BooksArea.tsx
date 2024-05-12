import React from "react";

import { Grid, Box } from "@mui/material";

import { BookCard } from "./BookCard";

import { BookRequest } from "@/types/interface";

interface BooksAreaProps {
  bookRequests: BookRequest[];
  loading: boolean;
}

export const BooksArea: React.FC<BooksAreaProps> = ({
  bookRequests,
  loading,
}) => {
  return (
    <Box py={12}>
      <Box maxWidth="lg" mx="auto" px={4}>
        <Box bgcolor="grey.100" p={4}>
          <Grid
            container
            spacing={4}
            sx={{ overflowY: "auto", maxHeight: "70vh", pr: 2 }}
          >
            {bookRequests.map((bookRequest, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <BookCard
                  bookInfo={bookRequest.book.book_information}
                  loading={loading}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
