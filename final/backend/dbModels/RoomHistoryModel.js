import mongoose from "mongoose";
const {Schema} = mongoose;

const RoomHistorySchema = new Schema({
    roomID: String,
    date: Date,
    roomInfo: {
        roomType: String,
        password: String,
        name: String,
        host: String,
        decksNumber: Number,
        minBet: Number,
        maxBet: Number,
    },
    battles: [{type: mongoose.Types.ObjectId, ref: "BattleHistory"}]
})

const RoomHistoryModel = mongoose.model("RoomHistory", RoomHistorySchema);

export default RoomHistoryModel;