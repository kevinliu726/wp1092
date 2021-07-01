import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";

const EnterPasswordModal = ({ open, handleClose, handleEnter, correctPassword }) => {
  const classes = makeStyles((theme) => ({
    dialog: {
      display: "flex",
      background: "black",
      color: "#c0c0c0",
      borderRadius: "20px",
      border: "solid",
      borderColor: "#03a9f4",
      borderWidth: "2px",
    },
    dialogTitle: {
      display: "flex",
      paddingBottom: "0px",
    },
    dialogActions: {
      display: "flex",
      width: "90%",
      alignSelf: "center",
      justifyContent: "space-between",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      margin: 8,
      "& label": { color: "gray" },
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
  }))();
  const [password, setPassword] = useState("");
  const [passwordError, setPError] = useState(false);
  const [passwordWrongError, setPWError] = useState(false);
  const passwordOnChange = (event) => {
    setPWError(false);
    setPError(false);
    setPassword(event.target.value);
  };
  const handleCancel = () => {
    setPassword("");
    setPError(false);
    setPWError(false);
    handleClose();
  };
  const checkBeforeEnter = () => {
    if (password === "") {
      setPError(true);
    } else {
      console.log(correctPassword);
      if(password === correctPassword){
        // check password Right;
        //Right setPWError(false)
        //handleEnter
        setPWError(false);
        handleEnter();
      }
      else {
        //Wrong setPWError(wrong)
        setPWError(true);
      }
    }
  };
  return (
    <Dialog classes={{ paper: classes.dialog }} open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Enter Room</DialogTitle>
      <DialogContent>
        <FormControl className={classes.form} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            error={passwordError}
            onChange={passwordOnChange}
            autoComplete="off"
            labelWidth={70}
          />
        </FormControl>
        {passwordError && (
          <FormHelperText style={{ marginLeft: 8, color: "red" }}>Password can't be empty</FormHelperText>
        )}
        {passwordWrongError && <FormHelperText style={{ marginLeft: 8, color: "red" }}>Wrong Password</FormHelperText>}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleCancel} style={{ color: "#c0c0c0" }}>
          Cancel
        </Button>
        <Button onClick={checkBeforeEnter} style={{ color: "#0288d1" }}>
          Enter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnterPasswordModal;
