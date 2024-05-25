import { gql } from "@apollo/client";

export const UPDATE_USER_NICKNAME = gql`
  mutation UpdateUserNickname($userId: String!, $nickname: String!) {
    updateUserNickname(userId: $userId, nickname: $nickname)
  }
`;
