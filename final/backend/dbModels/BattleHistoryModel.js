import mongoose from "mongoose";
const {Schema} = mongoose;

const BattleHistorySchema = new Schema({
    roomID: String,
    bank: {
        name: String,
        cards: [{
            visible: Boolean,
            number: Number
        }]
    },
    player: {
        name: String,
        cards: [{
            visible: Boolean,
            number: Number
        }]
    },
    bet: Number,
    resultTimes: Number,
    date: Date
})

const BattleHistoryModel = mongoose.model("BattleHistory", BattleHistorySchema);

export default BattleHistoryModel;