import {Schema, model} from 'mongoose';
const scoreCardSchema = new Schema({name:String, subject:String, score:Number})

// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
export default model('ScoreCard', scoreCardSchema);
