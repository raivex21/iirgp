import { createSlice } from "@reduxjs/toolkit";
import axiosFetch from "./axios";
import axios from "axios";
import { getCategories } from "./itemSlice";

const initialState = {
  categories: [],
  loading: false,
  error: null,
  status: "info",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addCategorySuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.status = "success";
    },
    addCategoryFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.status = "error";
    },
  },
});

const { addCategoryFail, addCategoryStart, addCategorySuccess } =
  categorySlice.actions;

export const addCategory = (token, data) => {
  return (dispatch) => {
    dispatch(addCategoryStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axiosFetch
      .post("/api/categories/", data)
      .then((res) => {
        dispatch(addCategorySuccess(res.data));
        dispatch(getCategories(token));
      })
      .catch((err) => {
        dispatch(addCategoryFail(err.message));
      });
  };
};

export default categorySlice.reducer;
