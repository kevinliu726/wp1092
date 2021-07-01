import db from "./db.js";

const shuffle = (decksNumber) => {
  var deck = [];
  for (var i = 0; i < decksNumber * 52; ++i) deck[i] = i;
  var currentIndex = deck.length,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
  }
  return deck;
};

const getNewPlayer = ({ isBank, name, index, state, cash }) => {
  return {
    name,
    index,
    state,
    isBank,
    canBattle: true,
    canBet: false,
    canStand: false,
    canHit: false,
    isChosen: false,
    cash,
    bet: 0,
    cards: [],
    resultTimes: 0,
  };
};

const getCardFromDeck = (room) => {
  const card = room.deck.pop();
  if (room.deck.length === 0) {
    room.deck = shuffle(room.roomInfo.decksNumber);
  }
  return card;
};

const getPossibleCardNumber = (number) => {
  const x = (number % 52) % 13;
  if (x === 0) return [1, 11];
  else if (x >= 9) return [10];
  else return [x + 1];
};

const getPossibleSum = (cards) => {
  let sum = [0];
  for (var i = 0; i < cards.length; ++i) {
    let set = new Set();
    getPossibleCardNumber(cards[i].number).forEach((x) => {
      sum.forEach((y) => set.add(x + y));
    });
    sum = [...set];
  }
  return sum.sort((a, b) => a - b);
};

const getBattlePoint = (cards) => {
    const sum = getPossibleSum(cards);
    const unBombed = sum.filter(x => x <= 21);
    const bombed = sum.filter(x => x > 21);
    if(cards.length === 5){
      if(unBombed.length > 0) return Math.max(...unBombed);
      else return Math.min(...bombed);
    }
    if(unBombed.length > 0 && Math.max(...unBombed) > 14) return Math.max(...unBombed);
    else return Math.min(...bombed);
}

const getBattleState = (cards) => {
  const point = getBattlePoint(cards);
  if (cards.length === 3 && cards.every((c) => (c.number % 52) % 3 === 6)) return { isNormal: false, times: 7, point };
  else if (cards.length === 5 && point < 21) return { isNormal: false, times: 3, point };
  else if (cards.length === 5 && point === 21) return { isNormal: false, times: 5, point };
  else if (cards.length === 5 && point > 21) return { isNormal: false, times: -3, point };
  else if (point === 21) return { isNormal: false, times: 2, point };
  else return { isNormal: true, times: 0, point };
};

const battle = async (bank, player, roomID) => {
  const bankState = getBattleState(bank.cards);
  const playerState = getBattleState(player.cards);
  let playerResultTimes;
  if (bankState.point > 21 && playerState.point > 21) playerResultTimes = 0;
  else if (!bankState.isNormal || !playerState.isNormal) playerResultTimes = playerState.times - bankState.times;
  else {
    if (bankState.point > 21 && playerState.point > 21) playerResultTimes = 0;
    else if (bankState.point > 21) playerResultTimes = 1;
    else if (playerState.point > 21) playerResultTimes = -1;
    else playerResultTimes = playerState.point > bankState.point ? 1 : playerState.point < bankState.point ? -1 : 0;
  }
  // store the result to db
  const battleHistory = await new db.BattleHistoryModel({
    roomID,
    date: new Date(),
    bank: {
      name: bank.name,
      cards: bank.cards,
    },
    player: {
      name: player.name,
      cards: player.cards,
    },
    bet: player.bet,
    resultTimes: playerResultTimes,
  }).save();
  const roomHistory = await db.RoomHistoryModel.findOne({ roomID }).exec();
  roomHistory.battles.push(battleHistory._id);
  await roomHistory.save();
  const dbBank = await db.UserModel.findOne({name: bank.name}).exec();
  if(!dbBank.history.includes(roomHistory._id)) dbBank.history.push(roomHistory._id);
  await dbBank.save();
  const dbPlayer = await db.UserModel.findOne({name: player.name}).exec();
  if(!dbPlayer.history.includes(roomHistory._id)) dbPlayer.history.push(roomHistory._id);
  await dbPlayer.save();
  // update player info
  player.canBattle = false;
  player.resultTimes = playerResultTimes;
  player.cash += player.bet + player.resultTimes * player.bet;
  bank.cash -= player.resultTimes * player.bet;
  player.cards[0].visible = true;
  // player.bet = 0;
};

const findBlackJack = async (room) => {
  if (room.players[11].canBlackJack) {
    room.players[11].cards[0].visible = true;
    for (const p of room.players.filter((p) => p.state === "ACTIVE" && !p.isBank)) {
      await battle(room.players[11], p, room.roomID);
    }
  } else {
    for (const p of room.players.filter((p) => p.state === "ACTIVE" && !p.isBank && p.canBlackJack)) {
      await battle(room.players[11], p, room.roomID);
    }
  }
  if (room.players.filter((p) => !p.isBank && p.state === "ACTIVE").every((p) => !p.canBattle)) {
    room.state = "GAMEOVER";
    room.players[11].cards[0].visible = true;
    room.players[11].canStand = false;
    room.players[11].canHit = false;
  }
};

const canBlackJack = (cards) => {
  return cards.length === 2 && getPossibleSum(cards).includes(21);
};

const canHit = (cards) => {
  return Math.min(...getPossibleSum(cards)) < 21 && cards.length < 5;
};

const canStand = (cards) => {
    const sum = getPossibleSum(cards);
    const unBombed = sum.filter(x => x <= 21);
    const bombed = sum.filter(x => x > 21);
    if(cards.length === 5) return true;
    if(unBombed.length === 0) return true;
    return Math.max(...unBombed) >= 15;
}

const setCardsState = (player) => {
  player.canHit = canHit(player.cards);
  player.canStand = canStand(player.cards);
  player.canBlackJack = canBlackJack(player.cards);
};

export { shuffle, getCardFromDeck, getNewPlayer, canBlackJack, canHit, canStand, setCardsState, findBlackJack, battle };
