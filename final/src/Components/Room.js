import React, { Component } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupIcon from "@material-ui/icons/Group";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import "../css/Room.css";

class Room extends Component {
  render() {
    const { id, name, host, playersNumber, minBet, maxBet, goToGame, fake = false } = this.props;
    return (
      <button id={id} className={fake ? "room_container empty" : "room_container"} onClick={goToGame}>
        <img className="background_img" src="https://i.imgur.com/VaT2IrY.png" alt="back_img"></img>
        <div className="room_info">
          <div className="room_name">{name}</div>
          <div className="info">
            <AccountCircleIcon style={{ color: "white" }}></AccountCircleIcon>
            <div className="info_text">{host}</div>
          </div>
          <div className="info">
            <GroupIcon style={{ color: "white" }}></GroupIcon>
            <div className="info_text">{playersNumber + " people"}</div>
          </div>
          <div className="info">
            <AttachMoneyIcon style={{ color: "white" }}></AttachMoneyIcon>
            <div className="info_text">
              {minBet} - {maxBet}
            </div>
          </div>
        </div>
      </button>
    );
  }
}

export default Room;
