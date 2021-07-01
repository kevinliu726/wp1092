import { gql } from "@apollo/client";

const SUBSCRIBE_LOBBY = gql`
    subscription ($roomType: String){
        subscribeLobby(roomType: $roomType){
            roomID
            roomInfo{
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

const SUBSCRIBE_ROOM = gql`
    subscription ($roomID: ID){
        subscribeRoom(roomID: $roomID){
            roomID
            roomInfo{
                roomType
                password
                name
                host
                decksNumber
                playersNumber
                minBet
                maxBet
            }
            players{
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

export {SUBSCRIBE_LOBBY, SUBSCRIBE_ROOM};