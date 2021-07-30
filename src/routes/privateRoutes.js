import React from "react";
// import Cart from "../components/shopping/Cart";
import Cart from "../features/cart/Cart";
import Shop from "../features/shop/Shop";
import Contact from "../features/shop/Contact";

const PrivateRoutes = {
  "/": () => <Shop />,
  "/cart": () => <Cart />,
  "/contact": () => <Contact />,
};

export default PrivateRoutes;
