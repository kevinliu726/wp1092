import { gql } from "@apollo/client";

const LOG_IN = gql`
  query ($username: String, $password: String) {
    isLogIn(name: $username, password: $password)
  }
`;

const NAME_EXIST = gql`
  query ($username: String) {
    nameExist(name: $username)
  }
`;

const GET_LOBBY = gql`
  query ($roomType: String) {
    getLobby(roomType: $roomType) {
      roomID
      roomInfo {
        name
        password
        host
        playersNumber
        minBet
        maxBet
      }
    }
  }
`;

const GET_ROOM = gql`
  query ($roomID: ID) {
    getRoom(roomID: $roomID) {
      roomID
      roomInfo {
        roomType
        password
        name
        host
        decksNumber
        playersNumber
        minBet
        maxBet
      }
      players {
        name
        index
        state
        isBank
        canBattle
        canBet
        canStand
        canHit
        isChosen
        cash
        bet
        cards {
          visible
          number
        }
        resultTimes
      }
      state
    }
  }
`;

const GET_ROOM_HISTORY = gql`
  query ($name: String) {
    getRoomHistory(name: $name) {
      roomID
      roomInfo {
        name
        password
        host
        playersNumber
        minBet
        maxBet
      }
      date
    }
  }
`;

const GET_BATTLE_HISTORY = gql`
  query ($name: String, $roomID: ID) {
    getBattleHistory(name: $name, roomID: $roomID) {
      roomID
      bank {
        name
        cards {
          visible
          number
        }
      }
      player {
        name
        cards {
          visible
          number
        }
      }
      bet
      resultTimes
    }
  }
`;
export { LOG_IN, NAME_EXIST, GET_LOBBY, GET_ROOM, GET_ROOM_HISTORY, GET_BATTLE_HISTORY };
