import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import "../css/Login_Register.css";
import { LOG_IN, NAME_EXIST } from "../graphql/Query";
import { useLazyQuery } from "@apollo/client";
import { useLocation } from "react-router";
const Login = ({history}) => {
  const classes = makeStyles({
    root: {
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
    dialog: {
      display: "flex",
      background: "black",
      color: "#c0c0c0",
      borderWidth: "3px",
      borderColor: "#c0c0c0",
      borderStyle: "solid",
      borderRadius: "20px",
    },
    dialogTitle: {
      display: "flex",
      paddingBottom: "0px",
      justifyContent: "space-evenly",
    },
    dialogContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
    },
    dialogActions: {
      display: "flex",
      alignSelf: "center",
      justifyContent: "space-between",
    },
  })();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [usernameError, setUError] = useState(false);
  const [passwordError, setPError] = useState(false);
  const [nameExistError, setNEError] = useState(false);
  const [matchError, setMError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const [illegal, setIllegal] = useState(location.state && location.state.action === "illegal");

  const [nameExist] = useLazyQuery(NAME_EXIST, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data && data.nameExist) {
        setNEError(false);
        let username = values.username;
        let password = values.password;
        isLogIn({
          variables: {
            username,
            password,
          },
        });
      } else {
        setNEError(true);
      }
    },
  });
  const [isLogIn] = useLazyQuery(LOG_IN, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data && data.isLogIn) {
        history.push(`/Menu/${values.username}`, {loginName: values.username});
      } else {
        setMError(true);
      }
    },
  });

  const valuesOnChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  function goToMenu() {
    setUError(values.username === "");
    setPError(values.password === "");
    setMError(false);
    setNEError(false);
    if (values.password !== "" && values.username !== "") {
      let username = values.username;
      nameExist({
        variables: {
          username,
        },
      });
    }
  }

  return (
    <div className="page_container">
      <Dialog
        classes={{ paper: classes.dialog }}
        open={illegal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          Gotcha, you little fucking hacker !
        </DialogTitle>
        <Divider style={{ backgroundColor: "#d5d5d5", width: "80%", alignSelf: "center" }} />
        <DialogContent className={classes.dialogContent}>
          <img
            src="https://truth.bahamut.com.tw/s01/202102/baeb59a884571d328245b04772b6c80e.JPG"
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            color="secondary"
            onClick={() => setIllegal(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div className="img_container">
        <img
          src="https://i.imgur.com/68CxQO4.jpg"
          alt="logo_left"
          style={{ display: "flex", marginBottom: "25%", marginLeft: "20%", width: "80%", objectFit: "contain" }}
        />
      </div>
      <div className="right_container">
        <img src="https://i.imgur.com/s3ekBEP.png" alt="logo_right" style={{ display: "flex", marginLeft: "1%" }}></img>
        <div className="input_container">
          <h1 style={{ fontFamily: "Georgia", color: "#d5d5d5", textAlign: "center" }}>Login</h1>
          <Divider variant="fullWidth" style={{ backgroundColor: "gray", width: "100%", textAlign: "center" }} />
          <div style={{ height: 20 }} />
          <FormControl className={classes.root} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              type="text"
              autoComplete="off"
              value={values.username}
              name="username"
              error={usernameError || nameExistError}
              onChange={valuesOnChange}
              labelWidth={70}
            />
            {usernameError && <FormHelperText style={{ color: "red" }}>Username can't be empty</FormHelperText>}
            {nameExistError && <FormHelperText style={{ color: "red" }}>Username doesn't exist</FormHelperText>}
          </FormControl>
          <FormControl className={classes.root} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              value={values.password}
              error={passwordError}
              name="password"
              onChange={valuesOnChange}
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
            {matchError && <FormHelperText style={{ color: "red" }}>Wrong username or password.</FormHelperText>}
          </FormControl>
          <div style={{ height: 10 }} />
          <Button id="login_btn" variant="contained" onClick={() => goToMenu()}>
            Log in
          </Button>
          <div style={{ height: 10 }} />
          <Button id="join_btn" onClick={() => history.push("/Register")}>
            No account? Create One
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
