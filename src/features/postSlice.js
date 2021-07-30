import { createSlice } from "@reduxjs/toolkit";
import axiosFetch from "./axios";
import axios from "axios";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    allPostList: [],
    loading: false,
    error: null,
    postById: {},
  },
  reducers: {
    getPostStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllPostListSuccess: (state, action) => {
      state.allpostList = action.payload;
      state.loading = false;
      state.error = null;
    },
    getPostByIdSuccess: (state, action) => {
      state.postById = action.payload;
      state.loading = false;
      state.error = null;
    },
    getPostFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getCartPostsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.cartposts = action.payload;
    },
  },
});

const {
  getPostStart,
  getAllPostListSuccess,
  getPostFail,
  getPostByIdSuccess,
  getCartPostsSuccess,
} = postSlice.actions;

export const getAllPostList = () => {
  return (dispatch) => {
    dispatch(getPostStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    axiosFetch
      .get("/api/posts")
      .then((res) => {
        dispatch(getAllPostListSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getPostFail(err.message));
      });
  };
};

export const getPostById = (id) => {
  return (dispatch) => {
    dispatch(getPostStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    axiosFetch
      .get(`/api/posts/${id}`)
      .then((res) => {
        dispatch(getPostByIdSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getPostFail(err.message));
      });
  };
};

export default postSlice.reducer;
