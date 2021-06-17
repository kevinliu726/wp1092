import { gql } from "@apollo/client";

export const CHATBOX_SUBSCRIPTION = gql`
  subscription chatbox($name: String!) {
    chatbox(name: $name) {
      mutation
      data {
        id
        sender {
          id
          name
        }
        body
      }
    }
  }
`;
