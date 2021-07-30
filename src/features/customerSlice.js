import { createSlice } from "@reduxjs/toolkit";
import axiosFetch from "./axios";
import axios from "axios";

const initialState = {
  customers: [],
  loading: false,
  error: null,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    getCustomersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCustomersSuccess: (state, action) => {
      state.customers = action.payload;
      state.error = null;
      state.loading = false;
    },
    getCustomersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { getCustomersFail, getCustomersStart, getCustomersSuccess } =
  customerSlice.actions;

export const getAllCustomers = (token) => {
  return (dispatch) => {
    dispatch(getCustomersStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axiosFetch
      .get(`/api/cart/`)
      .then((res) => {
        dispatch(getCustomersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getCustomersFail(err.message));
      });
  };
};

export default customerSlice.reducer;
