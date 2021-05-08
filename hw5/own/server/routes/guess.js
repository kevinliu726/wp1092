import express from 'express'
import {getNumber, getNumber2} from '../core/getNumber'

const fs = require('fs');
const date = getDateString();
const file = fs.createWriteStream('./server/log/' + date + '.log', {flags:'a'});
const router = express.Router()

function getDateString() {
  const date = new Date();
  const min = date.getMinutes();
  const h = date.getHours();
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();
  const dateString = y + '-' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + (h <= 9 ? '0' + h : h) + '-' + (min <= 9 ? '0' + min : min);
  return dateString
}
function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  getNumber(true)
  file.write('start number=' + getNumber() + ' ' + getDateString() + '\n')
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  if(getNumber2() === undefined) {
    file.write('start number=' + getNumber() + ' ' + getDateString() + '\n')
  }
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  // check if NOT a num or not in range [1,100]
  file.write('guess ' + req.query.number + ' ' + getDateString() + '\n')
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Error: ' + req.query.number + ' is not a valid number (1 - 100)' })
  }
  else {
    if(guessed === number){
      res.json({msg : 'Equal'});
      file.write('end-game \n')
    }
    else if(guessed < number){
      res.json({msg : 'Bigger'});
    }
    else{
      res.json({msg : 'Smaller'});
    }
  }
})

router.post('/restart', (_, res) => {
  getNumber(true);
  file.write('restart number=' + getNumber() + ' ' + getDateString() + '\n')
  res.json({msg: 'Restarted the game'});
})

export default router
