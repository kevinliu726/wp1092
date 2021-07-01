import mongoose from "mongoose";
const {Schema} = mongoose;

const RoomSchema = new Schema({
    roomID: String,
    roomInfo: {
        roomType: String,
        password: String,
        name: String,
        host: String,
        decksNumber: Number,
        playersNumber: Number,
        minBet: Number,
        maxBet: Number,
    },
    players: [{type: mongoose.Types.ObjectId, ref: "Player"}],
    deck: [Number],
    state: String,
})

const RoomModel = mongoose.model("Room", RoomSchema);

export default RoomModel;