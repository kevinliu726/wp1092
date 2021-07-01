import UserModel from "./dbModels/UserModel.js";
import PlayerModel from "./dbModels/PlayerModel.js";
import RoomModel from "./dbModels/RoomModel.js";
import RoomHistoryModel from "./dbModels/RoomHistoryModel.js";
import BattleHistoryModel from "./dbModels/BattleHistoryModel.js";

const db = {UserModel, PlayerModel, RoomModel, RoomHistoryModel, BattleHistoryModel};

export default db;