import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  const Name = req.body.name;
  const Subject = req.body.subject;
  const Score = req.body.score;
  try {
    console.log('Name', Name)
    //const tmp = ScoreCard.findOne({ name:Name , subject:Subject, score:Score})
    //console.log(tmp)
    ScoreCard.count({name:Name , subject:Subject}, async function (err, count){ 
        if(count>0){
          const card = await ScoreCard.findOneAndUpdate({name:Name, subject:Subject},{score:Score})
          console.log('update')
          res.json({ card:card, message: `Updating: (${Name} ${Subject} ${Score})`});
        }
        else{
          console.log('new')
          const newScoreCard = new ScoreCard({name:Name , subject:Subject, score:Score});
          await newScoreCard.save();
          res.json({ card:newScoreCard, message: `Adding: (${Name} ${Subject} ${Score})`});
        }
    }); 
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/deleteDB',async function (req, res) {
  try {
    await ScoreCard.deleteMany({});
    res.json({ message: 'Database cleared'});
  } catch (e) {
    res.json({ message: 'Database deletion failed'});
  }
});

router.get('/query',async function (req, res) {
  const queryType = req.query.queryType;
  const queryString = req.query.queryString;
  try {
    console.log(queryType)
    let results
    let str_result = []
    if(queryType === 'name'){
      results = await ScoreCard.find({name:queryString})
    }
    else{
      results = await ScoreCard.find({subject:queryString})
    }
    if (results.length === 0){
      res.json({ message: `${queryType}(${queryString}) not found`});
    }
    for (let i = 0; i < results.length; ++i){
      console.log('push',results[i].name,results[i].subject,results[i].score)
      str_result.[i] = 'name: ' + results[i].name.toString() + ' subject: ' + results[i].subject.toString() + ' score: ' +results[i].score.toString()
    }
    res.json({ messages:str_result});
  } catch (e) {
    res.json({ message: `Something went wrong`});
  }
});

// TODO: implement the DB query
// route.xx(xxxx)

export default router;
