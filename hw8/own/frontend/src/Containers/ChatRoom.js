import "../App.css";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import { useState } from "react";
import { Tabs, Input } from "antd";
import ChatBox from "./ChatBox";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from "../graphql";
const { TabPane } = Tabs;

const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  const [modalVisible, setModalVisible] = useState(false);
  const addChatBox = () => {
    setModalVisible(true);
  };
  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  return (
    <>
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>{" "}
      </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") setActiveKey(removeChatBox(activeKey, targetKey));
          }}
        >
          {chatBoxes.map(({ friend, key, chatLog }) => {
            return (
              <TabPane tab={friend} key={key} closable={true}>
                <ChatBox me={me} chatKey={key} />
              </TabPane>
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={async ({ name }) => {
            await startChat({
              variables: {
                name1: me,
                name2: name,
              },
            });
            try {
              const activeKey = createChatBox(me, name);
              setActiveKey(activeKey);
              setModalVisible(false);
            } catch (e) {
              window.alert(e);
            }
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
          displayStatus={displayStatus}
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
            setMessageInput("");
            return;
          }
          sendMessage({
            variables: { name: activeKey, sender: me, body: msg },
          });
          setMessageInput("");
        }}
      ></Input.Search>
    </>
  );
};
export default ChatRoom;
