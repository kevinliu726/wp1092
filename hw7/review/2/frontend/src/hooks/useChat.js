import { useState } from 'react'

const client = new WebSocket('ws://localhost:8080')
client.sendEvent = e => client.send(JSON.stringify(e))
client.onopen = () => console.log('Server connected.')

const useChat = () => {
  //const [status, setStatus] = useState({}) // { type, msg }
  const [messages, setMessages] = useState([])

  const startChat = (name, me) => {
    // if (!name.value || !me.value) {
    //   console.log(name, me)
    //   throw new Error('Fill in the inputs')
    // }
    client.sendEvent({
      type: 'CHAT',
      data: { name: me, to: name },
    })
  }

  const sendMessage = payload => {
    console.log(payload)

    const { name, to, body } = payload

    // if (!name.value || !to.value || !body.value) {
    //   throw new Error('Empty input!')
    // }

    client.sendEvent({
      type: 'MESSAGE',
      data: { name, to, body },
    })
  }

  const onEvent = e => {
    const { type } = e

    switch (type) {
      case 'CHAT': {
        console.log('receive messages', e.data.messagses)
        setMessages(e.data.messages)
        break
      }
      case 'MESSAGE': {
        console.log('receive messages', e.data.message)
        const newMessages = [...messages, e.data.message]
        setMessages(newMessages)
        break
      }
      default:
        break
    }
  }

  client.onmessage = m => {
    console.log('m:', m)
    onEvent(JSON.parse(m.data))
  }

  return { messages, startChat, sendMessage }
}
export default useChat
