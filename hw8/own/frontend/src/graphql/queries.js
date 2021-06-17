import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  query queryUser($name: String) {
    queryUser(name: $name) {
      id
      name
    }
  }
`;

export const CHATBOX_QUERY = gql`
  query queryChatBox(
    $name: String # chatboxName
  ) {
    queryChatBox(name: $name) {
      id
      name
      messages {
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

export const QUERY_MESSAGE = gql`
  query {
    queryMessage {
      id
      sender {
        id
        name
      }
      body
    }
  }
`;
