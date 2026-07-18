import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

type UserProfileQuery = {
  me: {
    __typename: "User";
    username: string
    avatarUrl: string
    id: string
  };
};

type GetUserProfileQueryVariables = Record<string, never>;


const USER_PROFILE_QUERY : TypedDocumentNode<
  UserProfileQuery,
  GetUserProfileQueryVariables
  > = gql`
 query UserProfile {
  me {
    username
    avatarUrl
    id
  }
 }`

export function useUserProfile() {
  return useQuery(USER_PROFILE_QUERY);
}

