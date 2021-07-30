import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import itemReducer from "../features/itemSlice";
import cartReducer from "../features/cart/cartSlice";
import customerReducer from "../features/customerSlice";
import supplierReducer from "../features/supplierSlice";
import categoryReducer from "../features/categorySlice";
import orderReducer from "../features/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    cart: cartReducer,
    customer: customerReducer,
    supplier: supplierReducer,
    category: categoryReducer,
    order: orderReducer,
  },
});
