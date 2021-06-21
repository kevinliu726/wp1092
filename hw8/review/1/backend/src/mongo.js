
import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import { UserModel, ChatBoxModel, MessageModel } from './db.js';


// --------------------------------------------------------------------------------
// ----------------- Testing data                           -----------------------
// --------------------------------------------------------------------------------
const deleteTestModels = async () => {
  try {
    await UserModel.deleteMany({});
    await ChatBoxModel.deleteMany({});
    await MessageModel.deleteMany({});
    console.log("Database deleted")
  } catch (error) {
    throw new Error("Database deletion failed")
  }
}

const testUserNames = ["max", "nanase", "yukino"];
const testMessages = [
  { messageBody: "hello", to: "max" }, 
  { messageBody: "hi", to: "nanase" },
  { messageBody: "ohayo", to: "max" }, 
  { messageBody: "konichiwa", to: "yukino" },
];

const testChatBoxes = [
  { 
    chatBoxName: 'max_nanase', 
    messages: [
      { messageBody: "hello", to: "max" }, 
      { messageBody: "hi", to: "nanase" },
    ]
  },
  {
    chatBoxName: 'max_yukino', 
    messages: [
      { messageBody: "ohayo", to: "max" }, 
      { messageBody: "konichiwa", to: "yukino" },
    ]
  },
];

const addTestUsers = (userName) => {
  try {
    const testUser = new UserModel({ userName });
    return testUser.save();
  } catch (error) {
    throw new Error("When adding test users: " + error);
  }
}

const addTestMessages = (message) => {
  const {to, messageBody} = message;
  try {
    const testMessage = new MessageModel({to, messageBody});
    return testMessage.save();
  } catch (error) {
    throw new Error("When adding test messages: " + error);
  }
}

const addTestChatBoxes = (chatBox) => {
  const {chatBoxName, messages} = chatBox;
  try {
    const testChatBox = new ChatBoxModel({chatBoxName, messages});
    return testChatBox.save();
  } catch (error) {
    throw new Error("When adding test ChatBoxes: " + error);
  }
}

function connectMongo() {

  dotenv.config();
  if (!process.env.MONGO_URL) {
    console.error("Missing MONGO_URL!");
    process.exit(1);
  }

  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;



  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async function () {

    await deleteTestModels();
    testUserNames.map((name) => addTestUsers(name));
    testMessages.map((message)=> addTestMessages(message));
    // testChatBoxes.map((chatBox)=> addTestChatBoxes(chatBox));
    console.log('Mongo database connected!');
  });
}

// Why not directly export connectMongo ?
// For extension. That can use mongo.xxx in the future
const mongo = {
  connect: connectMongo,
};

// the coding format of module's export
// module.exports = mongo;


export default mongo;

