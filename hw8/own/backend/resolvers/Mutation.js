const uuidv4 = require("uuid/v4");

const Mutation = {
  async createChatBox(parent, { name1, name2 }, { db }, info) {
    if (!name1 || !name2) throw new Error("Missing chatBox name for CreateChatBox");

    let user1 = await db.UserModel.findOne({ name: name1 });
    if (!user1) user1 = await new db.UserModel({ id: ObjectId, name: name1 }).save();
    let user2 = await db.UserModel.findOne({ name: name2 });
    if (!user2) user2 = await new db.UserModel({ id: uuidv4(), name: name2 }).save();

    const chatboxName = [name1, name2].sort().join("_");
    const existing = await db.ChatBoxModel.findOne({ name: chatboxName });
    if (existing) {
      return existing;
    }
    chatbox = await new db.ChatBoxModel({
      id: uuidv4(),
      name: chatboxName,
      messages: [],
    }).save();

    return chatbox;
  },

  async createUser(parent, { name }, { db }, info) {
    if (!name) throw new Error("Missing username");
    const existing = await db.UserModel.findOne({ name: name });
    if (existing) {
      return existing;
    }
    const user = await new db.UserModel({ id: uuidv4(), name: name }).save();

    return user;
  },

  async createMessage(parent, { chatBoxName, sender, body }, { db, pubsub }, info) {
    const user_sender = await db.UserModel.findOne({ name: sender });
    if (!user_sender) throw new Error("Message sender not exist");

    const chatbox = await db.ChatBoxModel.findOne({ name: chatBoxName });
    if (!chatbox) throw new Error(`chatbox ${name} not exist`);
    const m = await new db.MessageModel({
      id: uuidv4(),
      sender: user_sender,
      body: body,
    }).save();

    chatbox.messages.push(m);
    await chatbox.save();
    pubsub.publish(`chatbox ${chatBoxName}`, {
      chatbox: {
        mutation: "CREAT_MESSAGE",
        data: m,
      },
    });
    return m;
  },
};

module.exports = Mutation;
