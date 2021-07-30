import React from "react";
import { addItemToCart, removeItemToCart } from "../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function ItemDetailView(props) {
  const dispatch = useDispatch();
  const { userId, token } = useSelector((state) => state.auth);
  const handleAddToCart = (e, id) => {
    const data = {
      count: 1,
      item: id,
      cart: userId,
    };
    dispatch(addItemToCart(token, data));
  };
  return (
    <div className="item__card">
      <img src={props.image} alt="" />
      <div className="item__name">{props.name}</div>
      <div className="item__price">Price: ₱{props.price}</div>
      <div className="item__add__to__cart">
        <button onClick={(e) => handleAddToCart(e, props.itemId)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ItemDetailView;
