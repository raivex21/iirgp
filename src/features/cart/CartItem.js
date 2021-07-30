import React from "react";
import Navbar from "../../components/shopping/Navbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { removeItemToCart } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";

function CartItem({ item, count, total, id, cart }) {
  console.log(item.image);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleRemoveItem = () => {
    console.log(id, cart);
    dispatch(removeItemToCart(token, id, cart));
  };
  return (
    <div className="cart__card">
      <div className="cart__card__close__container">
        <IconButton onClick={handleRemoveItem}>
          <CloseIcon />
        </IconButton>
      </div>

      <Divider />
      <img src={`http://127.0.0.1:8000${item.image}`} alt="item" />
      <div className="cart__card__detail">
        <div className="cart__card__name">{item.name}</div>
        <div className="cart__card__price">price: ₱{item.price}</div>
        <div>
          {count}
          {count > 0 ? <span> pieces</span> : <span> piece</span>}
        </div>
        <span>total: ₱{total}</span>
      </div>
    </div>
  );
}

export default CartItem;
