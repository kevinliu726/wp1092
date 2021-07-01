
const ChatBox = {
    messages(parent, args, {db}, info) {
        // 等每個element 的 promise
        return Promise.all(
            // 從存的id 轉換成真的object
            parent.messages.map((mId)=>db.MessageModel.findById(mId))
        );
    },

}

export default ChatBox;