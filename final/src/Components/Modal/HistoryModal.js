import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import HistoryRoom from "../HistoryRoom";
import HistoryMatch from "../HistoryMatch";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_BATTLE_HISTORY, GET_ROOM_HISTORY } from "../../graphql/Query";
import "../../css/HistoryModal.css";

const getReadableDate = (date) => {
  var mm = (date.getMonth() + 1 < 9 ? "0" : "") + (date.getMonth() + 1); // getMonth() is zero-based
  var dd = (date.getDate() < 9 ? "0" : "") + date.getDate();
  var hm =
    (date.getHours() < 9 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 9 ? "0" : "") + date.getMinutes();

  return [date.getFullYear(), mm, dd, hm].join("-");
};

const HistoryModal = ({ open, username, handleClose }) => {
  const classes = makeStyles(() => ({
    dialog: {
      display: "flex",
      width: "30%",
      height: "70%",
      background: "black",
      color: "#c0c0c0",
      borderRadius: "20px",
      border: "solid",
      borderColor: "#d4af37",
      borderWidth: "2px",
    },
    dialogContent: {
      display: "flex",
      height: "80%",
      width: "80%",
      alignSelf: "center",
      justifyContent: "center",
    },
    dialogTitle: {
      display: "flex",
      paddingBottom: "0px",
    },
    dialogActions: {
      display: "flex",
      width: "90%",
      paddingTop: 0,
      alignSelf: "center",
      justifyContent: "space-between",
    },
  }))();
  const { data: roomHistory } = useQuery(GET_ROOM_HISTORY, { variables: { name: username } });
  const [getBattleHistory, { data: battleHistory }] = useLazyQuery(GET_BATTLE_HISTORY);
  const [showRoom, setShowRoom] = useState(true);
  const handleCloseHistory = () => {
    setShowRoom(true);
    handleClose();
  };
  const goIntoDetail = (room_id) => {
    getBattleHistory({
      variables: {
        name: username,
        roomID: room_id,
      },
    });
    setShowRoom(false);
  };
  const handleBack = () => {
    setShowRoom(true);
  };
  return (
    <Dialog classes={{ paper: classes.dialog }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle className={classes.dialogTitle}>History</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {roomHistory && showRoom && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              overflow: "scroll",
            }}
          >
            {roomHistory.getRoomHistory.map((room) => {
              return (
                <HistoryRoom
                  room_name={room.roomInfo.name}
                  host={room.roomInfo.host}
                  date={getReadableDate(new Date(parseInt(room.date)))}
                  goIntoDetail={() => goIntoDetail(room.roomID)}
                />
              );
            })}
          </div>
        )}
        {roomHistory && !showRoom && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              overflow: "scroll",
            }}
          >
            {battleHistory &&
              battleHistory.getBattleHistory.map((match) => {
                return (
                  <HistoryMatch
                    username={username}
                    bank={match.bank}
                    player={match.player}
                    bet={match.bet}
                    resultTimes={match.resultTimes}
                  />
                );
              })}
          </div>
        )}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        {!showRoom && (
          <Button onClick={handleBack} style={{ color: "#c0c0c0" }}>
            Back
          </Button>
        )}
        <div></div>
        <Button onClick={handleCloseHistory} style={{ color: "#c0c0c0" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default HistoryModal;
