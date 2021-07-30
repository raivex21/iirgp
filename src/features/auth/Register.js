import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authRegister } from "./authSlice";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { A, navigate } from "hookrouter";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Jyra Medical Supplies {new Date().getFullYear()}
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fields: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    color: "white",
  },
}));

export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    return (
      <span style={{ color: "red", fontSize: "10px" }}>Invalid email</span>
    );
  } else {
    return (
      <span style={{ color: "green", fontSize: "10px" }}>Email is Valid</span>
    );
  }
};

function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState({
    username: false,
    email: false,
    password1: false,
    password2: false,
    firstName: false,
    middleName: false,
    lastName: false,
    phone: false,
  });
  const [validationComplete, setValidationComplete] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setUsername(e.target.value);
    setValidation({ ...validation, username: true });
    setValidation({ ...validation, email: true });
  };
  const handlePassword1 = (e) => {
    setPassword1(e.target.value);
    setValidation({ ...validation, password1: true });
  };
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
    setValidation({ ...validation, password2: true });
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setValidation({ ...validation, firstName: true });
  };
  const handleMiddleName = (e) => {
    setMiddleName(e.target.value);
    setValidation({ ...validation, middleName: true });
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setValidation({ ...validation, lastName: true });
  };
  const handlePhoneNo = (e) => {
    setPhone(e.target.value);
    setValidation({ ...validation, phone: true });
  };

  useEffect(() => {
    if (
      validation.username === true &&
      validation.email === true &&
      validation.password1 === true &&
      validation.phone === true &&
      validation.middleName === true &&
      validation.password2 === true &&
      validation.firstName === true &&
      validation.lastName === true &&
      password1 === password2
    ) {
      setValidationComplete(true);
    }
  }, [username, password1, email, password2, firstName, lastName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      authRegister(username, password1, password2, email, firstName, lastName)
    );
    navigate("/");
  };

  const validator = (password) => {
    if (password.split("").length < 8 && password !== "") {
      return (
        <span style={{ color: "red", fontSize: "10px" }}>
          Must be more than 8 characters
        </span>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="register">
      <div className="register__left-text">
        <h1>ISAT U IIRGP Online Shop Registration Form </h1>
        <p>
          Iloilo Science and Technology University Integrated Income and
          Resources Generation Program offer you the most convenient way to buy
          and reserve products from them. This is the best way to access and
          avail items from virtual or distance communication. So what are you
          waiting for? Register and Shop Now!
        </p>
      </div>
      <div className="register__form">
        <h2>Registration Form</h2>
        <div className={classes.fields}>
          <TextField
            style={{ marginTop: "20px", marginBottom: "20px" }}
            id="standard-basic"
            label="First Name"
            onChange={handleFirstName}
          />
          <TextField
            style={{ marginTop: "20px", marginBottom: "20px" }}
            id="standard-basic"
            label="Middle Name"
            onChange={handleMiddleName}
          />
          <TextField
            style={{ marginTop: "20px", marginBottom: "20px" }}
            className="textField"
            InputProps={{
              className: classes.input,
            }}
            label="Last Name"
            onChange={handleLastName}
          />

          <TextField
            style={{ marginTop: "20px", marginBottom: "20px" }}
            label="Email"
            onChange={handleEmail}
          />
          <TextField
            style={{ marginTop: "20px", marginBottom: "20px" }}
            type="password"
            label="Password"
            onChange={handlePassword1}
          />
          <TextField
            style={{ marginTop: "20px", marginBottom: "20px" }}
            type="password"
            label="Confirm Password"
            onChange={handlePassword2}
          />
          <TextField
            style={{ marginTop: "20px", marginBottom: "20px" }}
            label="Phone No."
            onChange={handlePhoneNo}
          />
        </div>
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        <Typography variant="subtitle1">
          Have an account already? <A href="/login">Log In</A>
        </Typography>
      </div>
    </div>
  );
}

export default Register;
