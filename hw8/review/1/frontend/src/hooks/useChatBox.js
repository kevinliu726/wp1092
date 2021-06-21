import {useState} from 'react';

const useChatBox = (userName,activeKey) =>{
    const [chatBoxes, setChatBoxes] = useState([
        {friend: 'Mary', key:'MaryChatBox',chatLog:[]},
        {friend: 'Peter', key:'PeterChatBox',chatLog:[]},
      ]); 

    const createChatBox = (friend) => {
        const newKey = userName <= friend ? `${userName}_${friend}`:`${friend}_${userName}`;
        if (chatBoxes.some(({key})=>key === newKey)) throw new Error(`${friend}'s chat box has already opened.`);
        const newChatBoxes = [...chatBoxes];
        const chatLog = [];
        newChatBoxes.push({friend,key:newKey,chatLog});
        setChatBoxes(newChatBoxes);
        return newKey;
    }
    
    const removeChatBox = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({key},index)=>{
      if (key === targetKey) lastIndex = index-1;
      const newChatBoxes = chatBoxes.filter((chatBox)=>chatBox.key !== targetKey);
      if (newChatBoxes.length){
        if (newActiveKey === targetKey){
          if (lastIndex >= 0 ){
            newActiveKey = newChatBoxes[lastIndex].key;
          } else {
            newActiveKey = newChatBoxes[0].key;
          }
        } 
      } else newActiveKey = '';
      setChatBoxes(newChatBoxes);
      return newActiveKey;
    });
  }

  return {chatBoxes, createChatBox, removeChatBox}
};

export default useChatBox;