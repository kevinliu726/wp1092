import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "../components/ChatModal"
import Message from "../components/Message"
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";

const { TabPane } = Tabs;

const LOCALSTORAGE_KEY = "save-chatBoxes-hw7";

const ChatRoom = ({ me, displayStatus }) => {
  
  const savedChatBoxes = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox, initChatBox, updateChatBox } = useChatBox(savedChatBoxes !== null && savedChatBoxes.me === me ? savedChatBoxes.chatBoxes : []);
  const { sendMessage } = useChat(initChatBox, updateChatBox);
  
  const addChatBox = () => { setModalVisible(true); };

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({me: me, chatBoxes: chatBoxes}));
  }, [chatBoxes])

  useEffect(() => {
    if(savedChatBoxes !== null && savedChatBoxes.me === me && savedChatBoxes.chatBoxes.length !== 0){
      setActiveKey(savedChatBoxes.chatBoxes[0].key);
    }
  }, [])

  return (
    <> 
      <div className="App-title">
        <h1>{me}'s Chat Room</h1> 
      </div>
      <div className="App-messages">
        <Tabs 
          type="editable-card" 
          className="my-ant-tabs"
          onEdit={(targetKey, action) => {
            if (action === "add") 
              addChatBox();
            else if (action === "remove") 
              setActiveKey(removeChatBox(activeKey, targetKey));
          }}
          activeKey={activeKey}
          onChange={(key) => { setActiveKey(key); }}
        >
          {chatBoxes.map(({ friend, key, chatLog }) => {
            return (
              <TabPane tab={friend} key={key} closable={true}>
                {chatLog.length === 0 ? <p>No message in {friend}'s chatbox.</p> :
                  chatLog.map((msg, i) => <Message me={me} author={msg.name} text={msg.body} key={i}/>)
                }
              </TabPane> 
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          displayStatus={displayStatus}
          onCreate={({ name }) => {
            if(chatBoxes.findIndex(chatBox => chatBox.friend === name) !== -1){
              displayStatus({
                type: 'error',
                msg: `Chat Room with ${name} has been opened`,
              })
              return;
            }
            const newKey = createChatBox(name, me)
            setActiveKey(newKey);
            setModalVisible(false);
            sendMessage('INIT', { name: me, to: name });
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder="Enter message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter message.",
            });
            return;
          } else if (activeKey === "") {
            displayStatus({
              type: "error",
              msg: "Please add a chatbox first.",
            });
            return;
          }
          const tmp = activeKey.split('_');
          const friend = tmp[0] === me ? tmp[1] : tmp[0];
          sendMessage('MESSAGE', {name: me, to: friend, body: msg})
          setMessageInput("");
        }}
      ></Input.Search>
    </>
  );
};
export default ChatRoom;
