import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    const {name=undefined, subject=undefined, score=undefined} = req.body
    if(name === undefined || subject===undefined || score === undefined){
      throw new Error(`${name} ${subject} ${score}`)
    }
    let card = await ScoreCard.findOne({name, subject})
    if(card) {
      card.score = score
      await card.save()
      res.json({card, message:`update ${card}`})
    }else{
      card = await ScoreCard.create({name, subject, score})
      res.json({card, message:`create ${card}`})

    }
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

router.delete('/cards', async (req, res)=>{
   console.log('delete cards')
    await ScoreCard.deleteMany({})
    res.send({message:'cleared'})
})
// DONE: delete the collection of the DB
// router.delete(...)

// TODO: implement the DB query
// route.xx(xxxx)
router.get('/cards', async (req, res)=>{
  const {name=null, subject=null} = req.query
  let cards
  if(name)
    cards = await ScoreCard.find({name})
  if(subject)
    cards = await ScoreCard.find({subject})
  console.log(cards)
  res.json({message:'ok', messages:cards})

})


export default router;
