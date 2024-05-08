import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";

import { CREATE_USER } from "@/features/mock/mutations";

const GqlPage: React.FC = () => {
  // ダミーデータ
  const [email, setEmail] = useState("gqltest@gql.com");
  const [password, setPassword] = useState("gqlpasswd");

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleClick = () => {
    createUser({
      variables: {
        request: {
          email,
          password,
        },
      },
    });
  };

  return (
    <>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Create User
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error :( Please try again</p>}
      {data && <p>User created successfully!</p>}
    </>
  );
};

export default GqlPage;
