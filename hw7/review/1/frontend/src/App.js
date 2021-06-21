import './App.css';
import { useState, useEffect } from 'react';
import SignIn from './Containers/SignIn';
import ChatRoom from './Containers/ChatRoom';
import displayStatus from './hooks/useDisplayStatus';

const LOCALSTORAGE_KEY = "save-me";
// const LOCALFUCKYOU_KEY = "fuckyou";
const App = () => {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  // const fuckYou = localStorage.getItem(LOCALFUCKYOU_KEY);
  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState(savedMe || "");

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn]);

  return (
    <div className="App">
      {signedIn? (
        <ChatRoom
          me={me}
          displayStatus={displayStatus}
          // local={fuckYou}
        />) : (
        <SignIn 
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />)}
    </div>
  )
}


export default App;
