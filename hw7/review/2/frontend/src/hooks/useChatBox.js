import { useState, useEffect } from "react"; 

const useChatBox = (prevChatBoxes) => {

  const [chatBoxes, setChatBoxes] = useState(prevChatBoxes);

  useEffect(() => {
    console.log(chatBoxes);
  }, [chatBoxes])
  
  const createChatBox = (friend, me) => {
    const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    const newChatBoxes = [...chatBoxes];
    const chatLog = [];
    newChatBoxes.push({ friend, key: newKey, chatLog });
    setChatBoxes(newChatBoxes);

    return newKey;
  };
  
  const removeChatBox = (activeKey, targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey)lastIndex = i - 1; 
    });
    const newChatBoxes = chatBoxes.filter((chatBox) => chatBox.key !== targetKey);
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key;
        } else { newActiveKey = newChatBoxes[0].key; }
      }
    } else newActiveKey = ""; // No chatBox left
    setChatBoxes(newChatBoxes);

    return newActiveKey;
  };
  
  const initChatBox = (key, chatLog) => {
    const i = chatBoxes.findIndex((chatBox) => chatBox.key === key);
    const newChatBoxes = [...chatBoxes];
    newChatBoxes[i].chatLog = chatLog;
    setChatBoxes(newChatBoxes);
  }
  
  const updateChatBox = (key, message) => {
    const i = chatBoxes.findIndex((chatBox) => chatBox.key === key);
    const newChatBoxes = [...chatBoxes];
    newChatBoxes[i].chatLog.push(message);
    setChatBoxes(newChatBoxes);
  }

  return { chatBoxes, createChatBox, removeChatBox, initChatBox, updateChatBox };
};
export default useChatBox;
