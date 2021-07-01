const Message ={
    sender(parent, args, {db}, info){
        //return Promise.all(parent.sender.map((mId)=>db.UserModal.findById(mId)), )
        return db.UserModel.findById(parent.sender)
       
    },
};


export { Message as default };