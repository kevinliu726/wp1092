import generateChatBoxName from "../src/util.js";



const Query = {
    async chatBox(parent, {userName, friend}, {db}, info) {
        if (!userName|| !friend) return db.ChatBoxModel.find({});
        const chatBoxName = generateChatBoxName(userName, friend);
        const queryChatBox = await db.ChatBoxModel.findOne({chatBoxName:chatBoxName})
        return queryChatBox;
    },

    async user(parent, {userName}, {db}, info){
        if (!userName) return db.UserModel.find({});
        const queryUser = await db.UserModel.findOne({userName:userName})
        // if (!queryUser) return 
        return queryUser;
    }
}

export default Query;