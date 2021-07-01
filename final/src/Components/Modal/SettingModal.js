import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import FormHelperText from "@material-ui/core/FormHelperText";
import DialogTitle from "@material-ui/core/DialogTitle";

const SettingModal = ({ open, handleClose, handleEnter }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPError] = useState(false);
  const [confirmPasswordError, setCPError] = useState(false);
  const [matchError, setMError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordOnChange = (event) => {
    setPError(false);
    setPassword(event.target.value);
  };

  const confirmPasswordOnChange = (event) => {
    setMError(false);
    setCPError(false);
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        setMError(true);
      } else {
        handleEnter(password);
      }
    } else {
      setPError(password === "");
      setCPError(password === "");
    }
  };

  const handleCancel = () => {
    setPassword("");
    setConfirmPassword("");
    setPError(false);
    setCPError(false);
    setMError(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    handleClose();
  };

  const classes = makeStyles(() => ({
    dialog: {
      display: "flex",
      background: "black",
      color: "#c0c0c0",
      borderRadius: "20px",
    },
    dialogTitle: {
      display: "flex",
      paddingBottom: "0px",
    },
    dialogContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
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
      "& label": { color: "#c0c0c0" },
      "& label.Mui-focused": { color: "#d5d5d5" },
      "& .MuiInputAdornment-root": { color: "#c0c0c0" },
      "& .MuiIconButton-label": { color: "#c0c0c0" },
      "& .MuiInputBase-input": { color: "#c0c0c0" },
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#c0c0c0" },
        "&:hover fieldset": { borderColor: "#d5d5d5" },
        "&.Mui-focused fieldset": { borderColor: "#d5d5d5" },
      },
    },
  }))();
  return (
    <Dialog classes={{ paper: classes.dialog }} open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        Setting
      </DialogTitle>
      <Divider style={{ backgroundColor: "#d5d5d5", width: "80%", alignSelf: "center" }} />
      <DialogContent className={classes.dialogContent}>
        <FormControl className={classes.form} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            autoComplete="off"
            value={password}
            error={passwordError}
            onChange={passwordOnChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          {passwordError && <FormHelperText style={{ color: "red" }}>Password can't be empty</FormHelperText>}
        </FormControl>
        <FormControl className={classes.form} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="off"
            value={confirmPassword}
            error={confirmPasswordError || matchError}
            onChange={confirmPasswordOnChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={132}
          />
          {confirmPasswordError && (
            <FormHelperText style={{ color: "red" }}>Confirm Password can't be empty</FormHelperText>
          )}
          {matchError && <FormHelperText style={{ color: "red" }}>Doesn't match with Password</FormHelperText>}
        </FormControl>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()} style={{ color: "#03a9f4" }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SettingModal;
