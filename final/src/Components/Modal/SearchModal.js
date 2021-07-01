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

const SearchModal = ({ open, handleClose, handleEnter }) => {
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
        "& fieldset": { borderColor: "#d4af37" },
        "&:hover fieldset": { borderColor: "#d4af37" },
        "&.Mui-focused fieldset": { borderColor: "#d4af37" },
      },
    },
  }))();
  const [searchName, setSearchName] = useState("");
  const [searchNameError, setSNError] = useState(false);
  const searchNameOnChange = (event) => {
    setSNError(false);
    setSearchName(event.target.value);
  };
  const handleCancel = () => {
    setSearchName("");
    setSNError(false);
    handleClose();
  };
  const checkBeforeEnter = () => {
    handleEnter({searchName});
  };
  return (
    <Dialog classes={{ paper: classes.dialog }} open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Search Room</DialogTitle>
      <DialogContent>
        <FormControl className={classes.form} variant="outlined">
          <InputLabel htmlFor="search">Room Name</InputLabel>
          <OutlinedInput
            id="search"
            type="text"
            error={searchNameError}
            onChange={searchNameOnChange}
            autoComplete="off"
            labelWidth={90}
          />
        </FormControl>
        {searchNameError && (
          <FormHelperText style={{ marginLeft: 8, color: "red" }}>Room name can't be empty</FormHelperText>
        )}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleClose} style={{ color: "#c0c0c0" }}>
          Cancel
        </Button>
        <Button onClick={checkBeforeEnter} style={{ color: "#d4af37" }}>
          Enter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchModal;
