import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import FormHelperText from "@material-ui/core/FormHelperText";
import "../css/Login_Register.css";
import { REGISTER } from "../graphql/Mutation";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";

const Register = () => {
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
  })();
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [usernameError, setUError] = useState(false);
  const [passwordError, setPError] = useState(false);
  const [confirmPasswordError, setCPError] = useState(false);
  const [matchError, setMError] = useState(false);
  const [nameExistError, setNEError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const history = useHistory();

  const [register] = useMutation(REGISTER, {
    onCompleted: (registerData) => {
      if (registerData && registerData.register) {
        history.push(`/Menu/${values.username}`, {loginName: values.username})
      } else {
        setNEError(true);
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
  const goToMenu = () => {
    setUError(values.username === "");
    setPError(values.password === "");
    setCPError(values.confirmPassword === "");
    setMError(false);
    setNEError(false);
    if (values.password !== "" && values.username !== "" && values.confirmPassword !== "") {
      if (values.password !== values.confirmPassword) {
        setMError(true);
      } else {
        let username = values.username;
        let password = values.password;
        register({ variables: { username, password } });
      }
    }
  };

  return (
    <div className="page_container">
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
          <h1 style={{ fontFamily: "Georgia", color: "lightgray", textAlign: "center" }}>Register</h1>
          <Divider variant="fullWidth" style={{ backgroundColor: "#d5d5d5", width: "100%", textAlign: "center" }} />
          <div style={{ height: 20 }} />
          <FormControl className={classes.root} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              type="text"
              autoComplete="off"
              name="username"
              value={values.username}
              error={usernameError || nameExistError}
              onChange={valuesOnChange}
              labelWidth={70}
            />
            {usernameError && <FormHelperText style={{ color: "red" }}>Username can't be empty</FormHelperText>}
            {nameExistError && <FormHelperText style={{ color: "red" }}>This username is taken</FormHelperText>}
          </FormControl>
          <FormControl className={classes.root} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              name="password"
              value={values.password}
              error={passwordError}
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
          </FormControl>
          <FormControl className={classes.root} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password2">Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password2"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="off"
              name="confirmPassword"
              value={values.confirmPassword}
              error={confirmPasswordError || matchError}
              onChange={valuesOnChange}
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
            {matchError && <FormHelperText style={{ color: "red" }}>Doesn't Match with Password</FormHelperText>}
          </FormControl>
          <div style={{ height: 10 }} />
          <Button id="register_btn" variant="contained" onClick={() => goToMenu()}>
            Register
          </Button>
          <div style={{ height: 10 }} />
          <Button id="back_to_login_btn" onClick={() => history.push("/Login")}>
            Back To Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
