import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true },
  // chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
});

const messageSchema = new Schema({
  // chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' },
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  messageBody: { type: String, required: true },
  reciever: { type: mongoose.Types.ObjectId, ref: 'User' }
});

const chatBoxSchema = new Schema({
  chatBoxName: { type: String, required: true },
  // users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});


// mongoose.model(name, schema);
// => the mongo db would name the collection 'name' + 's' => 'names'
// and it would be all lowercase
const UserModel = mongoose.model('User', userSchema);
const ChatBoxModel = mongoose.model('ChatBox', chatBoxSchema);
const MessageModel = mongoose.model('Message', messageSchema);

const db = { UserModel, ChatBoxModel, MessageModel };


export { UserModel };
export { ChatBoxModel };
export { MessageModel };

export default db;
