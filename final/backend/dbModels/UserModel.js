import mongoose from "mongoose";
const {Schema} = mongoose;


const UserSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    history: [{type: mongoose.Types.ObjectId, ref: "RoomHistory"}]
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;