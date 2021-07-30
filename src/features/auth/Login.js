import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { A, navigate, useRedirect } from "hookrouter";
import { authLogin } from "./authSlice";
import imageURL from "./IIRGP.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// const loginError = () => {
//   return (

//   )
// }

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  // const initialFormData = Object.freeze({
  //   username: "",
  //   password: "",
  // });

  // const [formData, updateFormData] = useState(initialFormData);

  // const handleChange = (e) => {
  //   updateFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value.trim(),
  //   });
  // };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setUsername(e.target.value);
    console.log(e.target.value);
  };
  const handlePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authLogin(username, password));
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img src={imageURL} />
        </div>
        <div className="login__form">
          <h2>Login</h2>
          <div className="field">
            <TextField label="Email" onChange={handleEmail} />
          </div>
          <div className="field">
            <TextField
              type="password"
              label="Password"
              onChange={handlePassword}
            />
          </div>
          <div className="login__button">
            <button onClick={handleSubmit}>Log In</button>
          </div>
          <span className="register__link">
            Don't have an account yet? <A href="/register">Register here</A>
          </span>
        </div>
      </div>
    </div>
  );
}
