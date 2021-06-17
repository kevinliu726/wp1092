const Subscription = {
  chatbox: {
    subscribe(parent, { name }, { db, pubsub }, info) {
      if (!db.ChatBoxModel.findOne({ name: name })) {
        throw new Error("Chatbox Not Found");
      }

      return pubsub.asyncIterator(`chatbox ${name}`);
    },
  },
};
module.exports = Subscription;
