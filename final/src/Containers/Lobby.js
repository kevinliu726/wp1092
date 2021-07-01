import React, { useState, useLayoutEffect, useEffect } from "react";
import Room from "../Components/Room";
import EnterPasswordModal from "../Components/Modal/EnterPasswordModal";
import CreateRoomModal from "../Components/Modal/CreateRoomModal";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LOBBY, GET_ID } from "../graphql/Query";
import { SUBSCRIBE_LOBBY } from "../graphql/Subscription";
import { CREATE_ROOM } from "../graphql/Mutation";
import { Redirect, useHistory, useLocation } from "react-router";
import "../css/Lobby.css";
const Lobby = ({
  match: {
    params: { username, room_type },
  },
  history,
}) => {
  const classes = makeStyles(() => ({
    form: {
      display: "flex",
      flexWrap: "wrap",
      marginRight: "4%",
      width: "15%",
      "& .MuiInputLabel-formControl": { display: "flex", left: "auto", right: 0 },
      "& label": { color: "#d4af37", fontFamily: "Georgia", fontWeight: "bold", fontSize: "17px" },
      "& label.Mui-focused": { color: "#d4af37" },
      "& .MuiInputBase-input": { color: "#c0c0c0" },
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "transparent" },
        "&:hover fieldset": { borderColor: "transparent" },
        "&.Mui-focused fieldset": { borderColor: "transparent" },
      },
    },
  }))();
  const isPublic = room_type === "Public" ? true : false;
  const [enterRoomID, setEnterRoomID] = useState("");
  const [openEnterPassword, setOpenEnterPassword] = useState(false);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [roomListFilter, setRoomListFilter] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [correctPassword, setCorrectPassword] = useState("");
  const [searchName, setSearchName] = useState("");
  const location = useLocation();


  const [createRoom] = useMutation(CREATE_ROOM, {
    onCompleted: (createRoomData) => {
      if (createRoomData && createRoomData.createRoom) {
        window.location = `/Game/${room_type}/${createRoomData.createRoom.roomID}/${username}`;
        // history.push(`/Game/${room_type}/${createRoomData.createRoom.roomID}/${username}`, {loginName: username});
      }
    },
  });
  const { data, subscribeToMore } = useQuery(GET_LOBBY, { variables: { roomType: room_type } });
  useLayoutEffect(() => {
    const unsubscribe = subscribeToMore({
      document: SUBSCRIBE_LOBBY,
      variables: { roomType: room_type },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return { ...prev, getLobby: [...subscriptionData.data.subscribeLobby] };
      },
    });
    return () => unsubscribe();
  }, []);
  useLayoutEffect(() => {
    if (data) {
      setRoomList(data.getLobby);
      setRoomListFilter(data.getLobby.filter((room) => room.roomInfo.name.includes(searchName)));
    }
  }, [data]);

  const goBackToMenu = () => {
    history.push(`/Menu/${username}`, {loginName: username});
  };
  const handleOpenCreate = () => {
    setOpenCreateRoom(true);
  };
  const handleOpenEnterPassword = () => {
    setOpenEnterPassword(true);
  };
  const handleCloseCreate = () => {
    setOpenCreateRoom(false);
  };
  const handleClosePassword = () => {
    setOpenEnterPassword(false);
  };
  const searchNameOnChange = (event) => {
    setSearchName(event.target.value);
    setRoomListFilter(roomList.filter((room) => room.roomInfo.name.includes(event.target.value)));
  };
  const handleEnter = () => {
    setOpenEnterPassword(false);
    window.location = `/Game/${room_type}/${enterRoomID}/${username}`;
    // history.push(`/Game/${room_type}/${enterRoomID}/${username}`, {loginName: username});
  };

  const handleCreate = ({ roomInfo }) => {
    setOpenCreateRoom(false);
    roomInfo.host = username;
    roomInfo.roomType = room_type;
    console.log(roomInfo);
    createRoom({ variables: { roomInfo } });
  };

  const goToGame = (roomID, password) => {
    if (isPublic) {
      window.location = `/Game/${room_type}/${roomID}/${username}`;
      // history.push(`/Game/${room_type}/${roomID}/${username}`, {loginName: username});
    } else {
      setEnterRoomID(roomID);
      setCorrectPassword(password);
      handleOpenEnterPassword();
    }
  };
  return (!location.state || location.state.loginName !== username) ? (
    <Redirect to={{pathname: "/Login", state:{action: "illegal", from: "lobby"}}}/>
  ) : (
    <div style={{ position: "relative" }}>
      <Button id="back_btn" onClick={() => goBackToMenu()}>
        <ArrowBackIcon style={{ width: "100%", height: "100%" }}></ArrowBackIcon>
      </Button>
      <div className="lobby_container">
        <div className="lobby_nav_bar">
          <CreateRoomModal
            open={openCreateRoom}
            isPublic={isPublic}
            handleClose={handleCloseCreate}
            handleEnter={handleCreate}
          />
          <Button id="create_btn" onClick={() => handleOpenCreate()}>
            create
          </Button>
          <div className="lobby_tag">{room_type.toUpperCase()}</div>
          <FormControl className={classes.form}>
            <InputLabel htmlFor="search">SEARCH</InputLabel>
            <OutlinedInput
              id="search"
              type="text"
              values={searchName}
              onChange={searchNameOnChange}
              autoComplete="off"
              labelWidth={90}
            />
          </FormControl>
        </div>
        <Divider variant="fullWidth" style={{ backgroundColor: "gray", width: "73%", textAlign: "center" }} />
        <div className="lobby_cascade">
          <EnterPasswordModal
            open={openEnterPassword}
            correctPassword={correctPassword}
            handleClose={handleClosePassword}
            handleEnter={() => handleEnter()}
          />
          {roomListFilter.map((room) => (
            <Room
              id={room.roomID}
              name={room.roomInfo.name}
              host={room.roomInfo.host}
              playersNumber={room.roomInfo.playersNumber}
              minBet={room.roomInfo.minBet}
              maxBet={room.roomInfo.maxBet}
              goToGame={() => goToGame(room.roomID, room.roomInfo.password)}
            />
          ))}
          {roomListFilter.length === 0 && <div className="room_warning_text">NO ROOM EXISTS</div>}
          {roomListFilter.length % 3 === 1 && <Room fake={true} />}
          {roomListFilter.length % 3 === 1 && <Room fake={true} />}
          {roomListFilter.length % 3 === 2 && <Room fake={true} />}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
