import React from "react";

import { Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";

const BlackPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    color: "#000000",
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    backgroundColor: "#000000",
    color: "#FFFFFF",
  },
});

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  perPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const PaginationComponent: React.FC<PaginationProps> = ({
  totalCount,
  currentPage,
  perPage,
  onPageChange,
}) => {
  return (
    <BlackPagination
      count={Math.ceil(totalCount / perPage)}
      page={currentPage}
      onChange={onPageChange}
    />
  );
};
