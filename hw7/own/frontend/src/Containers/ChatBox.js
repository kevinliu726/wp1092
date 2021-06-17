import { useEffect, useRef } from "react";
import { Tag, Typography } from "antd";
const { Text } = Typography;
const ChatBox = ({ me, chatKey, chatLog }) => {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <>
      {chatLog.map(({ body, name }, i) => {
        let chat_class = "chat-message-group" + (me === name ? " writer-user" : "");
        return (
          <div key={i} class="card-content chat-content">
            <div class="content">
              <div class={chat_class}>
                <div class="chat-messages">
                  <div class="message">{body}</div>
                  <div class="from">{name}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </>
  );
};
export default ChatBox;
