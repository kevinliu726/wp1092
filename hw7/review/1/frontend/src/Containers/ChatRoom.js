import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input, Button, Tag, Space } from "antd";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
// import useChat from "../hooks/useChat";
import useWebSocket from "../hooks/useWebSocket";
import WarningModal from "../Components/WarningModal";
import axios from '../api';

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [warningVisible, setWarningVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
    const [firstFetch, setFirstFetch] = useState(true);
    const { sendEvent, messages, lastFriends, lastActiveKey } = useWebSocket();

    // const FirstFetch = async () => {
    //     const { data } = await axios.get('/last', { params: { name: me } })
    //     console.log(data)
    //     console.log(data.friends)
    //     console.log(data.activeKey)
    //     setActiveKey(data.activeKey)
    //     console.log("friends: "+data.friends)
    //     console.log("activeKey: "+data.activeKey)
    //     data.friends.forEach((name)=>{
    //         const newKey = createChatBox(name, me);
    //         console.log("CREATE BOX: "+newKey)
    //         if (newKey===data.activeKey) {
    //             console.log("STARTCHAT:"+name)
    //             startChat(me, name);
    //         }
    //     })
    //     setFirstFetch(false)
    // };

    // useEffect(() => {
    //     // FirstFetch()
    //     setActiveKey(local[me].activeKey)
    //     local[me].friends.forEach((name)=>{
    //         const newKey = createChatBox(name, me);
    //         console.log("CREATE BOX: "+newKey)
    //         if (newKey===data.activeKey) {
    //             console.log("STARTCHAT:"+name)
    //             startChat(me, name);
    //         }
    //     })
    // }, [])

    // const updateCache = async() => {
    //     console.log("updating")
    //     const friends = []
    //     chatBoxes.forEach(({friend, key}) => {
    //         friends.push(friend);
    //     })

    //     const {
    //         data: {message}
    //     } = await axios.post('/last', {
    //         name:me,
    //         friends,
    //         activeKey,
    //     });

    //     console.log("message: "+message)
    // }

    // useEffect(() => {
    //     if(!firstFetch)
    //         updateCache()
    // }, [activeKey])

    const addChatBox = () => {
        setModalVisible(true);
    };

    const startChat = (name, to) => {
        console.log("startChat: "+name+', '+to)
        sendEvent({
          type: 'CHAT',
          data: { name, to },
        });
    };

    const sendMessage = ({theKey, body}) => {
        chatBoxes.forEach(({ key }, i) => {
            if (key === theKey) {
                sendEvent({
                    type: 'MESSAGE',
                    data: { to: chatBoxes[i].friend, name: me, body },
                });
                // console.log(me + " sent message 2 " + chatBoxes[i].friend + ':' + body)
            }
        }); 
    };

    const clearMessages = () => {
        console.log("cleared messages")
        sendEvent({
            type: 'CLEAR_MESSAGES',
            data: {},
        });
    }

    const buildChatLine = (name, body, i) => {
        if (name===me) {
            return (
                <p
                    key={i}
                    style={{
                        textAlign: "right", 
                    }}
                >
                    <Space align="start"
                        className="App-message"
                        style={{ 
                            backgroundColor: "#2196f3"
                        }}>{body}</Space>
                </p>
            )
        }
        return (
            <p 
                key={i}
            >
                <Space align="start">
                    {name}<p
                            className="App-message"
                            >{body}</p>
                </Space>
                
            </p>)
    }

    const openWarning = () => {
        setWarningVisible(true);
    }

    return (
        <>
            <div className="App-title">
                <h1>{me}'s Chat Room</h1>
                <Button 
                    type="primary" 
                    danger
                    onClick={openWarning}
                >Clear Messages</Button>
                <WarningModal
                    visible={warningVisible}
                    onOk={() => {
                        clearMessages();
                        setWarningVisible(false);
                    }}
                    onCancel={() => {
                        setWarningVisible(false);
                    }}
                />
            </div>
            <div className="App-messages">
                <Tabs 
                    type="editable-card"
                    activeKey={activeKey}
                    onChange={(newKey) => { 
                        setActiveKey(newKey);
                        chatBoxes.forEach(({ key }, i) => {
                            if (key === newKey) {
                                startChat(me, chatBoxes[i].friend);
                            }
                        }); 
                        // updateCache();
                    }}
                    onEdit={(targetKey, action) => {
                        if (action === "add") {
                            addChatBox();
                        } else if (action === "remove") {
                            const newkey = removeChatBox(targetKey, activeKey)
                            setActiveKey(newkey);
                            chatBoxes.forEach(({ key }, i) => {
                                if (key === newkey) {
                                    startChat(me, chatBoxes[i].friend);
                                }
                            }); 
                            // updateCache();
                        }
                    }}
                >
                    {chatBoxes.map((
                        {friend, key, chatLog}) => {
                            return (
                                <TabPane
                                    tab={friend}
                                    key={key}
                                    closable={true}
                                >
                                    {
                                        messages.length ===0 ? ("No message yet..."):(
                                        messages.map(({name, body}, i) => (
                                            buildChatLine(name, body, i)
                                        ))
                                        )
                                    }
                                </TabPane>
                            );
                        }
                    )}
                </Tabs>
                <ChatModal
                    visible={modalVisible}
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(name, me));
                        startChat(me, name);
                        setModalVisible(false);
                        // updateCache();
                    }}
                    onCancel={() => {
                        setModalVisible(false);
                    }}
                />
            </div>
            <Input.Search
                value={messageInput}
                onChange={(e => 
                    setMessageInput(e.target.value))}
                enterButton="Send"
                placeholder="Enter message here..."
                onSearch={(msg) => {
                    if(!msg) {
                        console.log(chatBoxes)
                        console.log(activeKey)
                        displayStatus({
                            type: "error",
                            msg: "Please enter message.",
                        });
                        return;
                    } else if (activeKey === "") {
                        displayStatus({
                            type: "error",
                            msg: "Please add a chat box first.",
                        });
                        setMessageInput("");
                        return;
                    }
                    sendMessage({ theKey: activeKey, body: msg });
                    setMessageInput("");
                }}
            ></Input.Search>
        </>
    );
};

export default ChatRoom;
