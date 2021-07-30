import { createSlice } from "@reduxjs/toolkit";
import axiosFetch from "./axios";
import axios from "axios";

export const itemSlice = createSlice({
  name: "item",
  initialState: {
    allItemList: [],
    loading: false,
    error: null,
    itemById: {},
    cart: [],
    items: [],
    suppliers: [],
    categories: [],
  },
  reducers: {
    getItemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllItemListSuccess: (state, action) => {
      state.allItemList = action.payload;
      state.loading = false;
      state.error = null;
    },
    getItemByIdSuccess: (state, action) => {
      state.itemById = action.payload;
      state.loading = false;
      state.error = null;
    },
    getItemFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getItemByCategoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getItemByCategorySuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    getItemByCategoryFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addItemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addItemSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    addItemFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.error = null;
      state.loading = false;
    },
    getCategoriesFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getSuppliersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSuppliersSuccess: (state, action) => {
      state.suppliers = action.payload;
      state.error = null;
      state.loading = false;
    },
    getSuppliersFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    editItemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    editItemSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    editItemFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const {
  getItemStart,
  getAllItemListSuccess,
  getItemFail,
  getItemByIdSuccess,
  getItemByCategoryFail,
  getItemByCategoryStart,
  getItemByCategorySuccess,
  addItemStart,
  addItemFail,
  addItemSuccess,
  getCategoriesFail,
  getCategoriesStart,
  getCategoriesSuccess,
  getSuppliersFail,
  getSuppliersStart,
  getSuppliersSuccess,
  editItemStart,
  editItemSuccess,
  editItemFail,
} = itemSlice.actions;

export const getAllItemList = () => {
  return (dispatch) => {
    dispatch(getItemStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    axiosFetch
      .get("/api/items")
      .then((res) => {
        dispatch(getAllItemListSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getItemFail(err.message));
      });
  };
};

export const getItemById = (id) => {
  return (dispatch) => {
    dispatch(getItemStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    axiosFetch
      .get(`/api/items/${id}`)
      .then((res) => {
        dispatch(getItemByIdSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getItemFail(err.message));
      });
  };
};

export const selectCart = (state) => state.item.cart;

export const getItemByCategory = (token, cat) => (dispatch) => {
  dispatch(getItemByCategoryStart());
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  axiosFetch.get(`/api/items/?category__name=${cat}`).then((res) => {
    dispatch(getItemByCategorySuccess(res.data)).catch((err) => {
      dispatch(getItemByCategoryFail(err.message));
    });
  });
};

export const addItem = (token, item) => {
  return (dispatch) => {
    dispatch(addItemStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axiosFetch
      .post(`/api/items/`, item)
      .then((res) => {
        dispatch(addItemSuccess());
        dispatch(getAllItemList());
      })
      .catch((err) => {
        dispatch(addItemFail(err.message));
      });
  };
};

export const getCategories = (token) => {
  return (dispatch) => {
    dispatch(getCategoriesStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axiosFetch
      .get(`/api/categories`)
      .then((res) => {
        dispatch(getCategoriesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getCategoriesFail(err.message));
      });
  };
};

export const getSuppliers = (token) => {
  return (dispatch) => {
    dispatch(getSuppliersStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axiosFetch
      .get(`/api/suppliers`)
      .then((res) => {
        dispatch(getSuppliersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getSuppliersFail(err.message));
      });
  };
};

export const editItem = (token, itemId, data) => {
  return (dispatch) => {
    dispatch(editItemStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axiosFetch
      .put(`/api/items/${itemId}/`, data)
      .then((res) => {
        dispatch(editItemSuccess(res.data));
      })
      .catch((err) => {
        dispatch(editItemFail(err.message));
      });
  };
};

export default itemSlice.reducer;
