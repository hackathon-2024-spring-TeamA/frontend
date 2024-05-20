import React from "react";

import { TextField, InputAdornment } from "@mui/material";
// import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <TextField
      fullWidth
      placeholder="フリーワードを入力"
      value={searchQuery}
      onChange={onSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{/* <FaSearch /> */}</InputAdornment>
        ),
      }}
    />
  );
};
