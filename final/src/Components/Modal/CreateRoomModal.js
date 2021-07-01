import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormControlLabel, FormLabel } from "@material-ui/core";
import "../../css/Modal.css";

const CreateRoomModal = ({ open, isPublic, handleClose, handleEnter }) => {
  const classes = makeStyles(() => ({
    dialog: {
      display: "flex",
      background: "black",
      color: "#c0c0c0",
      borderRadius: "20px",
      border: "solid",
      borderColor: "#d4af37",
      borderWidth: "2px",
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
    text: {
      display: "flex",
      flexWrap: "wrap",
      margin: 8,
      "& label": { color: "#c0c0c0" },
      "& label.Mui-focused": { color: "#c0c0c0" },
      "& .MuiInputAdornment-root": { color: "#c0c0c0" },
      "& .MuiIconButton-label": { color: "#c0c0c0" },
      "& .MuiInputBase-input": { color: "#c0c0c0" },
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#03a9f4" },
        "&:hover fieldset": { borderColor: "#03a9f4" },
        "&.Mui-focused fieldset": { borderColor: "#03a9f4" },
      },
    },
    bet: {
      display: "flex",
      flexWrap: "wrap",
      margin: 8,
      "& label": { color: "#c0c0c0" },
      "& label.Mui-focused": { color: "#c0c0c0" },
      "& .MuiInputAdornment-root": { color: "#c0c0c0" },
      "& .MuiIconButton-label": { color: "#c0c0c0" },
      "& .MuiInputBase-input": { color: "#c0c0c0" },
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#d4af37" },
        "&:hover fieldset": { borderColor: "#d4af37" },
        "&.Mui-focused fieldset": { borderColor: "#d4af37" },
        "& input::-webkit-outer-spin-button": { "-webkit-appearance": "none" },
        "& input::-webkit-inner-spin-button": { "-webkit-appearance": "none" },
      },
    },
    deck: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: 8,
      marginLeft: 8,
      "& label": { color: "#c0c0c0" },
      "& label.Mui-focused": { color: "#c0c0c0" },
      "& .MuiIconButton-label": { color: "#c0c0c0" },
    },
  }))();
  const [roomName, setRoomName] = useState("");
  const [roomNameError, setRError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPError] = useState(false);
  const [deckNumber, setNumber] = useState("1");
  const [lower, setLower] = useState(1);
  const [lowerError, setLError] = useState(false);
  const [upper, setUpper] = useState(2147483647);
  const [upperError, setUError] = useState(false);
  const [crossError, setCError] = useState(false);
  const deckNumberOnChange = (event) => {
    setNumber(event.target.value);
  };
  const roomNameOnChange = (event) => {
    setRError(false);
    setRoomName(event.target.value);
  };
  const passwordOnChange = (event) => {
    setPError(false);
    setPassword(event.target.value);
  };
  const lowerOnChange = (event) => {
    setCError(false);
    setLError(false);
    if (event.target.value !== "") {
      setLower(event.target.value);
    } else {
      setLower(1);
    }
  };
  const upperOnChange = (event) => {
    setCError(false);
    setUError(false);
    if (event.target.value !== "") {
      setUpper(event.target.value);
    } else {
      setUpper(2147483647);
    }
  };
  const handleCreate = () => {
    if (roomName !== "" && parseInt(lower) > 0 && parseInt(upper) > 0 && parseInt(lower) <= parseInt(upper)) {
      handleEnter({
        roomInfo: {
          name: roomName,
          password,
          minBet: parseInt(lower),
          maxBet: parseInt(upper),
          decksNumber: parseInt(deckNumber),
        },
      });
    } else {
      setRError(roomName === "");
      setPError(password === "");
      setLError(parseInt(lower) <= 0);
      setUError(parseInt(upper) <= 0);
      setCError(parseInt(lower) > parseInt(upper));
    }
  };
  const handleCancel = () => {
    setRoomName("");
    setPassword("");
    setNumber("1");
    setLower(1);
    setUpper(2147483647);
    setRError(false);
    setPError(false);
    setLError(false);
    setUError(false);
    setCError(false);
    handleClose();
  };
  return (
    <Dialog classes={{ paper: classes.dialog }} open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
      <DialogTitle className={classes.dialogTitle} id="form-dialog-title">
        Create Room
      </DialogTitle>
      <DialogContent>
        <FormControl className={classes.text} variant="outlined">
          <InputLabel htmlFor="room">Room Name</InputLabel>
          <OutlinedInput
            id="room"
            type="text"
            error={roomNameError}
            onChange={roomNameOnChange}
            autoComplete="off"
            labelWidth={90}
          />
        </FormControl>
        {roomNameError && (
          <FormHelperText style={{ marginLeft: 8, color: "red" }}>Room name can't be empty</FormHelperText>
        )}
        {!isPublic && (
          <FormControl className={classes.text} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type="text"
              error={passwordError}
              onChange={passwordOnChange}
              autoComplete="off"
              labelWidth={70}
            />
          </FormControl>
        )}
        {!isPublic && passwordError && (
          <FormHelperText style={{ marginLeft: 8, color: "red" }}>Password can't be empty</FormHelperText>
        )}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <FormControl className={classes.bet} style={{ width: "40%" }} variant="outlined">
            <InputLabel htmlFor="betLower">Bet Lower Bound</InputLabel>
            <OutlinedInput
              id="betLower"
              type="number"
              error={lowerError || crossError}
              onChange={lowerOnChange}
              autoComplete="off"
              labelWidth={130}
            />
          </FormControl>
          <span>---</span>
          <FormControl className={classes.bet} style={{ width: "40%" }} variant="outlined">
            <InputLabel htmlFor="betUpper">Bet Upper Bound</InputLabel>
            <OutlinedInput
              id="betUpper"
              type="number"
              error={upperError || crossError}
              onChange={upperOnChange}
              autoComplete="off"
              labelWidth={130}
            />
          </FormControl>
        </div>
        {(lowerError || upperError) && (
          <FormHelperText style={{ marginLeft: 8, color: "red" }}>Bet must be positive</FormHelperText>
        )}
        {crossError && (
          <FormHelperText style={{ marginLeft: 8, color: "red" }}>Lower bound exceed upper bound</FormHelperText>
        )}
        <div className="deck_container">
          <FormControl className={classes.deck}>
            <FormLabel>Deck Number</FormLabel>
            <RadioGroup row name="bet" value={deckNumber} onChange={deckNumberOnChange}>
              <FormControlLabel value="1" control={<Radio />} label="one" />
              <FormControlLabel value="2" control={<Radio />} label="two" />
              <FormControlLabel value="3" control={<Radio />} label="three" />
            </RadioGroup>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleCancel} style={{ color: "#c0c0c0" }}>
          Cancel
        </Button>
        <Button onClick={handleCreate} style={{ color: "#d4af37" }}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoomModal;
