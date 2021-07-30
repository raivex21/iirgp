import { createSlice } from "@reduxjs/toolkit";
import axiosFetch from "./axios";
import axios from "axios";
import { getSuppliers } from "./itemSlice";

const initialState = {
  suppliers: [],
  loading: false,
  error: null,
  status: "info",
};

export const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    addSupplierStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addSupplierSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.status = "success";
    },
    addSupplierFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.status = "error";
    },
  },
});

const { addSupplierFail, addSupplierStart, addSupplierSuccess } =
  supplierSlice.actions;

export const addSupplier = (token, data) => {
  return (dispatch) => {
    dispatch(addSupplierStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axiosFetch
      .post("/api/suppliers/", data)
      .then((res) => {
        dispatch(addSupplierSuccess(res.data));
        dispatch(getSuppliers(token));
      })
      .catch((err) => {
        dispatch(addSupplierFail(err.message));
      });
  };
};

export default supplierSlice.reducer;
