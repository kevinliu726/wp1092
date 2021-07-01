import '../App.css';
import {useEffect, useState} from 'react';
import {Tabs,Input,Tag} from 'antd';
import ChatModal from '../Components/ChatModal';
import useChatBox from '../Hooks/useChatBox';
import {useMutation } from '@apollo/react-hooks'
import {
    CREATE_MESSAGE_MUTATION,
    CREATE_CHATBOX_MUTATION,
} from '../graphql'
import ChatBox from '../Components/ChatBox'


const {TabPane}=Tabs;
const ChatRoom=({me,displayStatus})=>{
    const [messageInput, setMessageInput]=useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const {chatBoxes,createChatBox,removeChatBox} =useChatBox()

    const [startChat]=useMutation(CREATE_CHATBOX_MUTATION)
    const [sendMessage]=useMutation(CREATE_MESSAGE_MUTATION)
    const addChatBox = () => { setModalVisible(true); };

    return(
        <>
        <div className='App-title'>
            <h1>{me}'s Chat Room</h1>
        </div>
        <div className='App-messages'>
            <Tabs type='editable-card'
            activeKey={activeKey}
            onChange={(key)=>{setActiveKey(key)}}
            onEdit={(targetKey,action)=>{
                if (action==='add') addChatBox()
                else if (action==='remove') setActiveKey(removeChatBox(targetKey,activeKey))
            }}>
                {chatBoxes.map(({friend,key,chatLog})=>{
                    return (
                    <TabPane tab={friend} key={key} closable={true}>
                        { !key ?
                            (null):(<ChatBox friend={friend} me={me}/>)
                        }   
                    </TabPane>)})}
            </Tabs>
            <ChatModal visible={modalVisible}
                    onCreate={async({name})=>{
                        await startChat({
                            variables:{
                                name1:me,
                                name2:name,
                            }
                        })
                        let statusCreateChatBox=createChatBox(name,me)
                        if (!statusCreateChatBox){
                            displayStatus({
                                type:"error",
                                msg:`${name}'s chat box has already opened`
                            });
                        }
                        else{
                            setActiveKey(statusCreateChatBox);
                            setModalVisible(false)
                        }
                        
                    }}
                    onCancel={()=>{
                        setModalVisible(false)
                    }}/>
            
        </div>
        <Input.Search 
        value={messageInput}
        onChange={(e)=>setMessageInput(e.target.value)}
        enterButton='Send'
        placeholder='Enter message here...'
        onSearch={(msg)=>{
            if (!msg){
                displayStatus({
                    type:"error",
                    msg:"Please enter message"
                });
                return;
            }
            else if (activeKey===''){
                if (chatBoxes.length===0){
                    displayStatus({
                        type:"error",
                        msg:"Please add a chatbox first"
                    });
                }
                else{
                    displayStatus({
                        type:"error",
                        msg:"Please select a chatbox first"
                    });
                }
                setMessageInput('')
                return;
            }
            sendMessage({
                variables:{
                    sender: me,
                    body: messageInput,
                    chatBox: activeKey,
                }                
            })
            setMessageInput('')
        }}
        ></Input.Search>
        </>
    )
}
export default ChatRoom