import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox($name1: String!, $name2: String!) {
    createChatBox(name1: $name1, name2: $name2) {
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

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($name: String!, $sender: String!, $body: String!) {
    createMessage(chatBoxName: $name, sender: $sender, body: $body) {
      id
      sender {
        id
        name
      }
      body
    }
  }
`;
