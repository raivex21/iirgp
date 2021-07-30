import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosFetch from "../axios";
import axios from "axios";

const initialState = {
  cart: [],
  profile: {},
  loading: false,
  error: null,
};

// export const getCart = createAsyncThunk("cart/fetchCart", async (id, token) => {
//   axios.defaults.headers = {
//     "Content-Type": "application/json",
//     Authorization: `Token ${token}`,
//   };
//   console.log(id);
//   return axiosFetch
//     .get(`/api/cart/${id}`)
//     .then((res) => {
//       if (!res.ok) throw Error(res.statusText);
//       return res.json();
//     })
//     .then((json) => json);
// });

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCartSuccess: (state, action) => {
      state.cart = action.payload.items;
      state.profile = action.payload;
      state.error = null;
      state.loading = false;
    },
    getCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addItemToCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addItemToCartSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    addItemToCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeItemToCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeItemToCartSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    removeItemToCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const {
  getCartStart,
  getCartFail,
  getCartSuccess,
  addItemToCartFail,
  addItemToCartStart,
  addItemToCartSuccess,
  removeItemToCartStart,
  removeItemToCartFail,
  removeItemToCartSuccess,
} = cartSlice.actions;

export const getCart = (token, id) => (dispatch) => {
  dispatch(getCartStart());
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  console.log(id);
  axiosFetch
    .get(`/api/cart/${id}`)
    .then((res) => {
      dispatch(getCartSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getCartFail(err.message));
    });
};

export const selectCart = (state) => state.cart.cart;

export const addItemToCart = (token, data) => (dispatch, getState) => {
  dispatch(addItemToCartStart());
  let currentItems = selectCart(getState());

  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  axiosFetch
    .post("/api/cart_items/", data)
    .then((res) => {
      dispatch(addItemToCartSuccess());
      dispatch(getCart(token, data.cart));
    })
    .catch((err) => {
      dispatch(addItemToCartFail(err.message));
    });
};

export const removeItemToCart =
  (token, itemId, cart) => (dispatch, getState) => {
    dispatch(removeItemToCartStart());
    let currentItems = selectCart(getState());

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    axiosFetch
      .delete(`/api/cart_items/${itemId}`)
      .then((res) => {
        dispatch(removeItemToCartSuccess());
        dispatch(getCart(token, cart));
      })
      .catch((err) => {
        dispatch(removeItemToCartFail(err.message));
      });
  };
export const editItemToCart =
  (token, itemId, count, cart, item) => (dispatch) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axiosFetch
      .put(`/api/cart_items/${itemId}/`, {
        count: count,
        cart: cart,
        item: item,
      })
      .then((res) => {
        dispatch(getCart(token, cart));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

export default cartSlice.reducer;
