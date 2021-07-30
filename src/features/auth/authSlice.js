import { createSlice } from "@reduxjs/toolkit";
import axiosFetch from "../axios";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: null,
    email: null,
    token: null,
    userId: null,
    firstName: null,
    lastName: null,
    isAuth: false,
    loading: false,
    error: null,
    staff: false,
  },
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.key;
      state.lastName = action.payload.lastName;
      state.firstName = action.payload.firstName;
      state.userId = action.payload.userId;
      state.staff = action.payload.staff;
      state.isAuth = action.payload.token !== null;
      state.error = null;
      state.loading = false;
    },
    authFail: (state, action) => {
      state.error = action.payload.err;
      state.loading = false;
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.lastName = null;
      state.firstName = null;
      state.userId = null;
      state.isAuth = false;
      localStorage.removeItem("user");
    },
  },
});

export const { authStart, authSuccess, authFail, logout } = authSlice.actions;

export const authRegister = (
  username,
  password1,
  password2,
  email,
  firstName,
  lastName
) => {
  return (dispatch) => {
    dispatch(authStart());
    axiosFetch
      .post("/dj-rest-auth/registration/", {
        username: username,
        password1: password1,
        password2: password2,
        email: email,
        first_name: firstName,
        last_name: lastName,
      })
      .then((res) => {
        const user = {
          token: res.data.key,
          username,
          lastName: res.data.user_detail.last_name,
          firstName: res.data.user_detail.first_name,
          email: res.data.user_detail.email,
          staff: res.data.user_detail.staff,
          userId: res.data.user_detail.userId,
          expirationDate: new Date(new Date().getTime() + 86400 * 1000),
        };

        localStorage.setItem("user", JSON.stringify(user));
        delete user("expirationDate");
        console.log(user);
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(86400));
      })
      .catch((err) => {
        dispatch(authFail(err.message));
      });
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axiosFetch
      .post("/dj-rest-auth/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        const user = {
          token: res.data.key,
          username,
          lastName: res.data.user_detail.last_name,
          firstName: res.data.user_detail.first_name,
          staff: res.data.user_detail.is_staff,
          email: res.data.user_detail.email,
          userId: res.data.user_detail.userId,
          expirationDate: new Date(new Date().getTime() + 86400 * 1000),
        };
        localStorage.setItem("user", JSON.stringify(user));
        delete user("expirationDate");
        console.log(user);
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(86400));
      })
      .catch((err) => {
        dispatch(authFail(err.message));
      });
  };
};

export const checkAuthTimeout = (expirationDate) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate * 1000);
  };
};
export const authCheckState = () => {
  return (dispatch) => {
    console.log("AUTHCHECKSTATE => running");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
export default authSlice.reducer;
