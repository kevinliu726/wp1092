const Query = {
  async queryUser(parent, { name }, { db, pubsub }, info) {
    if (!name) {
      throw new Error("Missing username for queryUser");
    } else {
      return await db.UserModel.findOne({ name: name });
    }
  },

  async queryChatBox(parent, { name }, { db, pubsub }, info) {
    if (!name) {
      throw new Error("Missing chatBox name for queryChatBox");
    } else {
      const tmp = await db.ChatBoxModel.findOne({ name: name });
      if (!tmp) {
        throw new Error("ChatBox not exist");
      }

      return tmp;
    }
  },

  async queryMessage(parent, args, { db, pubsub }, info) {
    return await db.MessageModel.find({});
  },
};

module.exports = Query;
