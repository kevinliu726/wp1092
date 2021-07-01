import mongoose from "mongoose";
const {Schema} = mongoose;

const PlayerSchema = new Schema({
    name: String,
    index: Number,
    state: String,
    isBank: Boolean,
    canBattle: Boolean,
    canBet: Boolean,
    canStand: Boolean,
    canHit: Boolean,
    cash: Number,
    bet: Number,
    cards: [{
        visible: Boolean,
        number: Number,
    }],
    resultTimes: Number,
})

const PlayerModel = mongoose.model("Player", PlayerSchema);

export default PlayerModel;