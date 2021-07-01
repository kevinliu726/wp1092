const Subscription={
    chatBox:{
        async subscribe(parent, { chatBoxName }, { db, pubsub }, info){
            let box=await db.ChatBoxModel.findOne({ name:chatBoxName});
            if (!box){
                throw new Error('ChatBox not found');
            }

            return pubsub.asyncIterator(`chatBox ${chatBoxName}`);
        }
    }
};

export { Subscription as default };