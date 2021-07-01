import '../App.css';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const SignInPage = ({ userName, setUserName, setSignedIn, displayStatus }) => (
    <>
        <div className='App-title'><h1>My Chat Room</h1></div>
        <Input.Search
            prefix={<UserOutlined />}
            value={userName}
            enterButton='Sign In'
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            size="large"
            style={{ width: 300, margin: 50 }}
            onSearch={(name) => {
                if (!name) {
                    displayStatus({
                        type: "error",
                        msg: "Missing user name",
                    });
                }
                else setSignedIn(true);
            }}
        ></Input.Search>
    </>
);

export default SignInPage;