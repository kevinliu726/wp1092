import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const scoreCardSchema = new Schema({
	name: String,
	subject: String,
	score: Number
});


export default mongoose.model('ScoreCard', scoreCardSchema);



// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);
