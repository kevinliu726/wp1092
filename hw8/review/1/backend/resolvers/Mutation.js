import generateChatBoxName from "../src/util.js";
// import uuidv4 from 'uuid/v4';

const Mutation = {

    async createChatBox(parent, args, { db, pubsub }, info) {
        const {userName, friend} = args.data;
        // generate the chatbox's name
        const chatBoxName = generateChatBoxName(userName, friend);

        // a function for checking if the user is in db or not
        const checkUser = async (db, userName) => {
            const isExisting = await db.UserModel.findOne({ userName });
            return isExisting;
        }

        // a function for checking if the chatBox is in db or not
        const checkChatBoxName = async (db, chatBoxName) => {
            const isExisting = await db.ChatBoxModel.findOne({ chatBoxName });
            return isExisting ?? false;
        }

        // if the user is not in db, add him/her into db
        const addNewUser = async (db, userName) => {
            const newUser = new db.UserModel({ userName });
            await newUser.save();
        }

        // check if username && friend is not null
        if (!userName || !friend) throw new Error("Missing chatBox name for CreateChatBox");
        
        // check if user is in db or not
        if (!(await checkUser(db, userName, "createChatBox"))) {
            console.log("User does not exist for createChatBox: " + userName);
            await addNewUser(db, userName);
        }

        // check if the chatBox is in db or not 
        if (await checkChatBoxName(db, chatBoxName)) {
            console.log(await checkChatBoxName(db, chatBoxName));
            console.log("The chatBox is already existing! " + chatBoxName);
            throw new Error("The chatBox is already existing!")
        }

        // create a new chatBox and save it into db
        const newChatBox = new db.ChatBoxModel({
            // id: uuidv4(), ??
            
            messages: [],
            chatBoxName: chatBoxName
        });
        await newChatBox.save();

        pubsub.publish(`chatBoxName_${chatBoxName}`,{
            // TODO: Add subscription 
        });

        return newChatBox;
    },

    async createMessage(parent, args, {db, pubsub}, info){

        const {messageBody, receiver, sender} = args.data;
        console.log(`parent is ${parent}`);
        console.log('input data is :')
        console.log(messageBody, receiver, sender);
        console.log('-----');

        const chatBoxName = generateChatBoxName(receiver, sender);
        
        // const receiverData = await db.UserModel.findOne({receiver});
        // const senderData = await db.UserModel.findOne({sender});

        const newMessage = new db.MessageModel({
            messageBody,
            receiver,
            sender
        })
        await newMessage.save();
        return newMessage
            .populate('users')
            .execPopulate();
    }



}

export default Mutation;