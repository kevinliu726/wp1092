const checkUser= async (db,name,action)=>{
    switch (action){
        case "createChatBox":{
            const existing = await db.UserModel.findOne({name:name})
            return existing
        }
    }
}

const newUser= async (db,name)=>{
    await new db.UserModel({name:name}).save()
}

const Mutation={
    async createChatBox(parent,{name1,name2},{db,pubsub},info){
        if (!name1 || !name2)
            throw new Error("Missing chatbox name for CreateChatBox");
        if (!(await checkUser(db, name1, "createChatBox"))){
            console.log("User does not exist for CreateChatBox: "+name1);
            await newUser(db,name1)
        }
        if (!(await checkUser(db, name2, "createChatBox"))){
            console.log("User does not exist for CreateChatBox: "+name2);
            await newUser(db,name2)
        }
        const chatBoxName=[name1, name2].sort().join('_')
        let box=await db.ChatBoxModel.findOne({ name:chatBoxName });
        if (!box) box=await new db.ChatBoxModel({ name:chatBoxName}).save();
        //return box.populate({ path: 'messages', populate: 'sender' }).execPopulate(); 
        return box
    },
    async createMessage(parent,{data},{db,pubsub},info){
        let box=await db.ChatBoxModel.findOne({ name:data.chatBox });
        if (!box) box = await new db.ChatBoxModel({ name:data.chatBox}).save();
        
        let sender=await db.UserModel.findOne({ name:data.sender });
        if (!sender) sender = await new db.UserModel({ name:data.sender }).save();

        
        const newMessage=new db.MessageModel({ sender:sender, body:data.body });
        await newMessage.save();
        
        box.messages.push(newMessage);
        await box.save();
        
        pubsub.publish(`chatBox ${data.chatBox}`, {
            chatBox: {
              mutation: 'UPDATED',
              data: box,
            },
          });
        //return newMessage.populate('sender').execPopulate();
        return newMessage
    },
};
export { Mutation as default };