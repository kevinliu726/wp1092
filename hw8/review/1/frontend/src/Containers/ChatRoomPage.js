import react from 'react';
import '../App.css';
import useChatBox from '../hooks/useChatBox';
import { useState } from "react";
import { Tabs, Input } from "antd";
import ChatModal from '../Components/chatModal';
import useChat from '../hooks/useChat';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CHATBOX_MUTATION, USER_QUERY } from './graphql';

const {TabPane} = Tabs;
const ChatRoomPage = ({userName,displayStatus}) => {


  const [messageInput, setMessageInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState('');
  const {chatBoxes,createChatBox, removeChatBox} = useChatBox(userName,activeKey);
  const { sendMessage} = useChat();
  const addChatBox = () => setModalVisible(true)

  const {loading, error, data, subscribeToMore} = useQuery(USER_QUERY);
  const [createNewChatBox, {data:mutationData}] = useMutation(CREATE_CHATBOX_MUTATION);
  console.log('mutationData is: ');
  console.log(mutationData);
  console.log('---')

  return( 
  <>
    <div className='App-title'><h1>{userName}'s Chat Room</h1></div>
    <div className='App-messages'>
      <Tabs
        type='editable-card'
        activeKey={activeKey}
        onChange={(key)=>{setActiveKey(key)}}
        onEdit = {(targetKey, action) => {
          if (action === 'add') addChatBox();
          else if (action === 'remove') setActiveKey(removeChatBox(targetKey));
          }}>
        {chatBoxes.map(({friend,key,chatLog})=>{
          return (
            <TabPane tab={friend} key={key} closable={true}>{friend}'s ChatBox.</TabPane>
          );
        })}
      </Tabs>
      <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name));
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
    </div>
    <Input.Search
        value={messageInput}
        onChange={(e) => 
          setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder=
          "Enter message here..."
        onSearch={(msg) => {
          if (!msg){
            displayStatus({
              type: 'error',
              msg: 'please enter message.',
            });
            return ; 
          } else if (activeKey === ''){
            displayStatus({
              type: 'error',
              msg: 'please add a chatbox first.',
            });
            setMessageInput('');
            return ;
          }
          sendMessage({key:activeKey,body:msg})
           setMessageInput(""); }}
      ></Input.Search> 
  </>
  );
};

export default ChatRoomPage;
  
 
