import React from "react";

import { Grid, Box } from "@mui/material";

import { BookCard } from "./BookCard";
import { StatusDisplay } from "./StatusDisplay";

import { BookRequest } from "@/types/interface";

interface BooksAreaProps {
  bookRequests: BookRequest[];
  loading: boolean;
  userId: string;
}

export const BooksArea: React.FC<BooksAreaProps> = ({
  bookRequests,
  loading,
  userId,
}) => {
  return (
    <Box py={8}>
      <Box maxWidth="xl" mx="auto" px={4}>
        <Box bgcolor="grey.100" p={4}>
          <Grid
            container
            spacing={4}
            sx={{ overflowY: "auto", maxHeight: "70vh", pr: 2 }}
          >
            {bookRequests.map((bookRequest, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Box>
                  <BookCard bookRequest={bookRequest} loading={loading} />
                  <Box sx={{ py: 1 }} />
                  <StatusDisplay bookRequest={bookRequest} userId={userId} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
