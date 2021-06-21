import '../../App.css'
import { useState } from 'react'
import useChatBox from '../../hooks/useChatBox'
import useChat from '../../hooks/useChat'
import { Tabs, Input } from 'antd'

import ChatModal from '../../components/ChatModal/ChatModal'
import './ChatRoom.css'
const { TabPane } = Tabs

const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [activeKey, setActiveKey] = useState('')
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox()
  const { messages, sendMessage, startChat } = useChat()

  const addChatBox = () => {
    setModalVisible(true)
  }

  return (
    <>
      <div className='App-title'>
        <h1>{me}'s Chat Room</h1>
      </div>
      <div className='App-messages'>
        <Tabs
          type='editable-card'
          activeKey={activeKey}
          onChange={key => {
            setActiveKey(key)
          }}
          onEdit={(targetKey, action) => {
            if (action === 'add') addChatBox()
            else if (action === 'remove') setActiveKey(removeChatBox(targetKey, activeKey))
          }}
        >
          {chatBoxes.map(({ friend, key }) => {
            return (
              <TabPane tab={friend} key={key} closable={true}>
                <p>{friend}'s chatbox.</p>{' '}
              </TabPane>
            )
          })}
        </Tabs>
        <div>
          {messages.map(msg =>
            msg.name === me ? (
              <div key={msg.id} className='message-me'>
                <div className='message-body'>{msg.body}</div>
                <div className='message-name'>{msg.name}</div>
              </div>
            ) : (
              <div key={msg.id} className='message-you'>
                <div className='message-name'>{msg.name}</div>
                <div className='message-body'>{msg.body}</div>
              </div>
            )
          )}
        </div>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            // startChat
            startChat(me, name)

            setActiveKey(createChatBox(name, me))
            setModalVisible(false)
          }}
          onCancel={() => {
            setModalVisible(false)
          }}
        />
      </div>
      <Input.Search
        value={messageInput}
        onChange={e => setMessageInput(e.target.value)}
        enterButton='Send'
        placeholder='Enter message here...'
        onSearch={msg => {
          if (!msg) {
            displayStatus({
              type: 'error',
              msg: 'Please enter message.',
            })
            return
          } else if (activeKey === '') {
            displayStatus({
              type: 'error',
              msg: 'Please add a chatbox first.',
            })
            setMessageInput('')
            return
          }
          const [name1, name2] = activeKey.split('_')
          const name = me === name1 ? name1 : name2
          const to = me !== name1 ? name1 : name2

          sendMessage({ name, to, body: msg })
          setMessageInput('')
        }}
      ></Input.Search>
    </>
  )
}

export default ChatRoom
