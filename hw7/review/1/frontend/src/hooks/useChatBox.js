import { useState } from 'react'
import displayStatus from './useDisplayStatus';

const useChatBox = () => {
    const [chatBoxes, setChatBoxes] = useState([]);

    const createChatBox = (friend, me) => {
        const newKey = me <= friend? `${me}_${friend}`:`${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
            displayStatus({
                type: "error",
                msg: friend + "'s chat box has already opened.",
            });
            // throw new Error(friend + "'s chat box has already opened.");
            return newKey;
        }
        const newChatBoxes = [...chatBoxes];
        const chatLog = [];
        newChatBoxes.push({ friend, key: newKey, chatLog });
        setChatBoxes(newChatBoxes);

        return newKey;
    };

    const removeChatBox = (targetKey, activeKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        chatBoxes.forEach(({ key }, i) => {
            if (key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newChatBoxes = chatBoxes.filter(
            (chatBox) => chatBox.key !== targetKey
        );
        if (newChatBoxes.length) {
            if (newActiveKey === targetKey) {
                if (lastIndex >= 0) {
                    newActiveKey = newChatBoxes[lastIndex].key;
                } else {
                    newActiveKey = newChatBoxes[0].key;
                }
            }
        } else {
            newActiveKey = ""; // No chatBox left
        }
        setChatBoxes(newChatBoxes);

        return newActiveKey;
    }
    
    return { chatBoxes, createChatBox, removeChatBox };
}

export default useChatBox
