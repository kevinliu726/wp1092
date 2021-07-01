const makeName = (name, to) => {
    return [name, to].sort().join('_');
  };

const Query = {
    chatBox(parent,{chatBoxName},{ db },info) {
        //const chatBoxName = makeName(name1, name2);
        return db.ChatBoxModel.findOne({name:chatBoxName});
    },
};

export { Query as default };