import { createSlice } from "@reduxjs/toolkit";
import axiosFetch from "./axios";
import axios from "axios";
import { getCart } from "../features/cart/cartSlice";

const initialState = {
  pendingOrders: [],
  completedOrders: [],
  loading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    createOrderFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getCompletedOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCompletedOrdersSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.completedOrders = action.payload;
    },
    getCompletedOrdersFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getPendingOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPendingOrdersSuccess: (state, action) => {
      state.pendingOrders = action.payload;
      state.loading = false;
      state.error = null;
    },
    getPendingOrdersFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  createOrderStart,
  createOrderSuccess,
  createOrderFail,
  getPendingOrdersFail,
  getPendingOrdersStart,
  getPendingOrdersSuccess,
  getCompletedOrdersFail,
  getCompletedOrdersStart,
  getCompletedOrdersSuccess,
} = orderSlice.actions;

export const createOrder = (token, data) => (dispatch) => {
  dispatch(createOrderStart());
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  axiosFetch
    .post(`/api/orders/`, data)
    .then((res) => {
      dispatch(createOrderSuccess());
      dispatch(getCart(token, data.user));
    })
    .catch((err) => {
      dispatch(createOrderFail(err.message));
    });
};

export const orderComplete = (token, orderId) => (dispatch) => {
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  axiosFetch
    .put(`/api/orders/${orderId}/`, {
      completed: true,
    })
    .then((res) => {
      console.log("completed!");
      dispatch(getPendingOrders(token));
    })
    .catch((err) => {
      console.log("failed to update order!");
    });
};

export const getPendingOrders = (token) => {
  return (dispatch) => {
    dispatch(getPendingOrdersStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axiosFetch
      .get(`/api/orders/?completed=false`)
      .then((res) => {
        dispatch(getPendingOrdersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getPendingOrdersFail(err.message));
      });
  };
};

export const getCompletedOrders = (token) => {
  return (dispatch) => {
    dispatch(getCompletedOrdersStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axiosFetch
      .get(`/api/orders/?completed=true`)
      .then((res) => {
        dispatch(getCompletedOrdersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getCompletedOrdersFail(err.message));
      });
  };
};

export default orderSlice.reducer;
