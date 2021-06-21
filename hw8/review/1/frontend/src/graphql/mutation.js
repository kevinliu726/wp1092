import {gql} from '@apollo/client';

const CREATE_CHATBOX_MUTATION = gql`
    mutation createChatBox(
        $userName: String!
        $friend: String!
    ){
        createChatBox(
            data:{
                userName: $userName
                friend: $friend
            }
        ){
            id
            chatBoxName
            messages
        }

    }
`;

export  {CREATE_CHATBOX_MUTATION};