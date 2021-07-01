import {Tag} from 'antd';
import { useQuery} from '@apollo/react-hooks'
import { useEffect } from 'react'
import {CHATBOX_SUBSCRIPTION,
    CHATBOX_QUERY
} from '../graphql'

const ChatBox=({friend,me})=>{
    const localkey=[friend, me].sort().join('_');
    const {loading,error,data,subscribeToMore}=useQuery(CHATBOX_QUERY,{ variables: { chatBoxName: localkey } })
    
    useEffect(()=>{
        subscribeToMore({
            document: CHATBOX_SUBSCRIPTION,
            variables: { chatBoxName: localkey},
            updateQuery: (prev,{subscriptionData})=>{
                if (!subscriptionData.data) return prev
                return subscriptionData.data
            }
        }) 
    },[subscribeToMore])
    //if (!loading) return <p>Loading ...</p>;
    return(
        <div className="App-message">
            {!data?(<p>Loading ...</p>):
            (data.chatBox.messages.length===0 ?
                (<p style={{ color: '#ccc' }}>No messages...</p>):
                (data.chatBox.messages.map(({sender,body},i)=>{
                    if(sender.name!==me){
                        return (
                            <div className="bubbleWrapper" key={i}>
                                <div className="inlineContainer">
                                    <div className='other name'>{sender.name}</div>
                                    <div className="otherBubble other">{body}</div>
                                </div>
                            </div>)
                    }
                    else{
                        return (
                            <div className="bubbleWrapper" key={i}>
                                <div className="inlineContainer own">
                                    <div className='own name'>{sender.name}</div>
                                    <div className="ownBubble own">{body}</div>
                                </div>
                            </div>)
                    }
                })
                )
            )}
        </div>
    )
}

export default ChatBox