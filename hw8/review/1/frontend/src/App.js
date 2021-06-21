import logo from './logo.svg';
import './App.css';
import react from 'react';
import { useState, useEffect } from 'react';
import ChatRoomPage from './Containers/ChatRoomPage';
import SingInPage from './Containers/SignInPage';
import {message} from 'antd';


const LOCALSTORAGE_KEY = 'saveUserName';

const displayStatus = (payload) => {
  if (payload.msg) {
    const { type, msg } = payload;
    const content = {
      content: msg, duration: 1.5,
    }
    switch (type) {
      case 'success':
        message.success(content);
        break;
      case 'error':
      default:
        message.error(content);
        break;
    }
  }
}

const App = () => {

  const saveUserName = localStorage.getItem(LOCALSTORAGE_KEY);
  

  const [signedIn, setSignedIn] = useState(false);
  const [userName, setUserName] = useState(saveUserName||'');



  useEffect(()=>{
    if(signedIn) localStorage.setItem(LOCALSTORAGE_KEY,userName);
  },[signedIn]);
  

  
  return (
    <div className="App">
      {signedIn ?
        <ChatRoomPage userName={userName} /> :
        <SingInPage
          userName={userName}
          setSignedIn={setSignedIn}
          setUserName={setUserName}
          displayStatus={displayStatus} />}
    </div>
  );
}
export {displayStatus};
export default App;
