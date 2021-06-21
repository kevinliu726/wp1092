import './App.css'
import SignIn from './containers/SignIn/SignIn'
import ChatRoom from './containers/ChatRoom/ChatRoom'
import { message } from 'antd'

import { useState, useEffect } from 'react'
const LOCALSTORAGE_KEY = 'save-me'

const App = () => {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY)
  const [signedIn, setSignedIn] = useState(false)
  const [me, setMe] = useState(savedMe || '')

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me)
    }
  }, [signedIn, me])

  const displayStatus = payload => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg,
        duration: 1.5,
      }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
          message.error(content)
          break
        default:
          break
      }
    }
  }

  return (
    <div className='App'>
      {signedIn ? (
        <ChatRoom me={me} displayStatus={displayStatus} />
      ) : (
        <SignIn me={me} setMe={setMe} setSignedIn={setSignedIn} displayStatus={displayStatus} />
      )}
    </div>
  )
}

export default App
