import { gql } from "@apollo/client";

export const GET_USER_NICKNAME = gql`
  query GetUserNickname($userId: String!) {
    getUserNickname(userId: $userId)
  }
`;
