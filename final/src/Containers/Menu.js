import React, { useEffect, useState } from "react";
import SettingModal from "../Components/Modal/SettingModal";
import HistoryModal from "../Components/Modal/HistoryModal";
import RulesModal from "../Components/Modal/RulesModal";
import Button from "@material-ui/core/Button";
import "../css/Menu.css";
import { useMutation } from "@apollo/client";
import { SET_PASSWORD } from "../graphql/Mutation";
import { Redirect, useLocation, useHistory } from "react-router";

const Menu = ({
  match: {
    params: { username },
  },
  history,
}) => {
  const [openSetting, setOpenSetting] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [openRules, setOpenRules] = useState(false);
  const location = useLocation();
  const [setPassword] = useMutation(SET_PASSWORD);
  const handleOpenSetting = () => {
    setOpenSetting(true);
  };
  const handleOpenHistory = () => {
    setOpenHistory(true);
  };
  const handleOpenRules = () => {
    setOpenRules(true);
  };

  const handleCloseSetting = () => {
    setOpenSetting(false);
  };
  const handleCloseHistory = () => {
    setOpenHistory(false);
  };
  const handleCloseRules = () => {
    setOpenRules(false);
  };
  const handleSubmit = (password) => {
    // Submit Change Password
    setPassword({ variables: { name: username, password } });
    setOpenSetting(false);
  };
  const logout = () => {
    history.push("/Login");
  };
  const goToLobby = (isPublic) => {
    if (isPublic) {
      history.push(`/Lobby/${"Public"}/${username}`, {loginName: username});
    } else {
      history.push( `/Lobby/${"Private"}/${username}`, {loginName: username});
    }
  };

  return (!location.state || location.state.loginName !== username) ? (
    <Redirect to={{pathname: "/Login", state:{action: "illegal"}}}/>
  ) : (
    <div className="menu">
      <Button id="left_btn" variant="contained" onClick={() => goToLobby(true)}>
        Public
      </Button>
      <div className="middle_container">
        <img className="menu_logo" src="https://i.imgur.com/HbsdxjO.png" alt="logo" />
        <div style={{ height: "15%" }} />
        <div className="row_btn">
          <Button id="setting" variant="contained" onClick={() => handleOpenSetting()}>
            Setting
          </Button>
          <Button id="history" variant="contained" onClick={() => handleOpenHistory()}>
            History
          </Button>
          <Button id="rules" variant="contained" onClick={() => handleOpenRules()}>
            Rules
          </Button>
          <SettingModal open={openSetting} handleClose={handleCloseSetting} handleEnter={handleSubmit} />
          <HistoryModal username={username} open={openHistory} handleClose={handleCloseHistory} />
          <RulesModal open={openRules} handleClose={handleCloseRules} />
        </div>
        <Button id="logout" variant="contained" onClick={logout}>
          Logout
        </Button>
      </div>
      <Button id="right_btn" variant="contained" onClick={() => goToLobby(false)}>
        Private
      </Button>
    </div>
  );
};

export default Menu;
