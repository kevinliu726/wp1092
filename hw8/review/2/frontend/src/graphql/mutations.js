import {gql} from '@apollo/client'

export const CREATE_CHATBOX_MUTATION=gql`
    mutation createChatbox(
        $name1: String!
        $name2: String!
        ){
            createChatBox(name1:$name1,name2:$name2){
                name
                messages{
                    sender{
                        name
                    }
                    body
                }
            }
        }
        `;

export const CREATE_MESSAGE_MUTATION=gql`
    mutation createMessage(
        $sender: String!
        $body: String!
        $chatBox: String!
        ){
            createMessage(
                data:{
                    sender:$sender
                    body:$body
                    chatBox:$chatBox
                }
            ){
                sender{
                    name
                }
                body
            }
        }
`;