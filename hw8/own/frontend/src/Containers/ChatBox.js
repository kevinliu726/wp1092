import { useEffect, useRef } from "react";
import { Spin } from "antd";
import { CHATBOX_QUERY, CHATBOX_SUBSCRIPTION } from "../graphql";
import { useQuery } from "@apollo/react-hooks";
const ChatBox = ({ me, chatKey }) => {
  const messagesEndRef = useRef(null);
  const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY, {
    variables: {
      name: chatKey,
    },
  });

  useEffect(() => {
    try {
      subscribeToMore({
        document: CHATBOX_SUBSCRIPTION,
        variables: { name: chatKey },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.chatbox.data; //m.sender //m.body

          return Object.assign({}, prev, {
            queryChatBox: {
              messages: [...prev.queryChatBox.messages, newMessage],
            },
          });
        },
      });
    } catch (error) {
      console.log("error in Containers/ChatBox.js:", error);
    }
  }, [subscribeToMore, chatKey]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });
  if (loading)
    return (
      <Spin
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  if (error) return `Error! ${error}`;
  return (
    <>
      {data.queryChatBox.messages.map(({ body, sender }, i) => {
        let chat_class = "chat-message-group" + (me === sender.name ? " writer-user" : "");
        return (
          <div key={i} className="card-content chat-content">
            <div className="content">
              <div className={chat_class}>
                <div className="chat-messages">
                  <div className="message">{body}</div>
                  <div className="from">{sender.name}</div>
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
