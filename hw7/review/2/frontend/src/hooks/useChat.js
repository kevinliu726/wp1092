const client = new WebSocket('ws://localhost:4000');
client.onopen = () => console.log('Listening on port 4000');

const useChat = (initChatBox, updateChatBox) => {
  
  client.onmessage = (byteString) => {
    const { type, data } = JSON.parse(byteString.data)
    console.log(`type: ${type}, data: ${JSON.stringify(data)}`);
    switch (type) {
      case "INIT": {
        initChatBox(data.key, data.messages);
        break;
      }
      case "MESSAGE": {
        updateChatBox(data.key, data.message);
        break;
      }
      default: break;
    }
  }

  const sendMessage = (type, payload) => { 
    sendData({type: type, data: payload});
  }

  const sendData = async (data) => {
    await client.send(JSON.stringify(data));
  };


  return { sendMessage };
};

export default useChat;
