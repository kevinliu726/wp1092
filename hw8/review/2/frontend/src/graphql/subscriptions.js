import {gql} from '@apollo/client'

export const CHATBOX_SUBSCRIPTION=gql`
    subscription subscriptionChatbox(
        $chatBoxName: String!
    ){
        chatBox(
            chatBoxName: $chatBoxName
        ){
            mutation
            data{
                name
                messages{
                    sender{
                        name
                    }
                    body
                }
            }
        }
    }
`