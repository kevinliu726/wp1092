import { useState } from 'react'

const server = new WebSocket('ws://localhost:8080');
server.onopen = () => {
    console.log('WebSocket Server connected.');
    
}

const useWebSocket = () => {
    const sendEvent = (e) => server.send(JSON.stringify(e));
    const [messages, setMessages] = useState([])

    const onEvent = (e) => {
        const { type } = e;
    
        switch (type) {
          case 'CHAT': {
            // messages = e.data.messages;
            setMessages(e.data.messages)
            break;
          }
          case 'MESSAGE': {
            // messages.push(e.data.message);
            setMessages([...messages, e.data.message])
            break;
          }
          case 'CLEAR_MESSAGES': {
            // console.log('CLEAR_MESSAGES !')
            setMessages([])
            break;
          }
          default:
            break;
        }
    };

    server.onmessage = (m) => {
        onEvent(JSON.parse(m.data));
    };

    return {sendEvent, messages}
}

export default useWebSocket
