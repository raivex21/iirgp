import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editItemToCart, getCart, removeItemToCart } from "./cartSlice";
import Navbar from "../../features/shop/Navbar";
import { createOrder } from "../../features/orderSlice";
import { Button } from "@material-ui/core";

export const Cart = () => {
  const dispatch = useDispatch();
  const { userId, token, first_name } = useSelector((state) => state.auth);
  const { cart, error, loading, profile } = useSelector((state) => state.cart);
  const [currentCount, setCurrentCount] = React.useState(0);

  useEffect(() => {
    dispatch(getCart(token, userId));
  }, [dispatch, userId, token]);

  const prices = cart.map((item) => item.item_detail.price * item.count);
  let total = 0;
  prices.map((item) => (total += item));
  // console.log(prices);
  // console.log(total);

  const ordered = cart.map((item) => {
    return {
      item: item.item,
      count: item.count,
    };
  });

  console.log(ordered);

  const handleCheckout = () => {
    const data = {
      user: userId,
      ordered_item: ordered,
    };
    dispatch(createOrder(token, data));
  };

  const handleRemoveItem = (e, id) => {
    console.log(id);
    dispatch(removeItemToCart(token, id, userId));
  };
  const handleCount = (e, id, item) => {
    setCurrentCount(e.target.value);
    dispatch(editItemToCart(token, id, e.target.value, userId, item));
  };
  console.log(cart);
  return (
    <div className="shop">
      <div className="navbar__container">
        <Navbar />
      </div>
      <div className="shop__body">
        <div className="cart">
          <div className="cart__container">
            <h2>{profile.first_name}'s Cart</h2>
            <div className="cart__list">
              {cart.map((item) => (
                <div className="cart__item" key={item.id}>
                  <div className="cart__item__image">
                    <img
                      src={`http://127.0.0.1:8000${item.item_detail.image}`}
                    />
                  </div>
                  <div className="cart__item__name">
                    {item.item_detail.name}
                  </div>
                  <div className="cart__item__price">
                    {item.item_detail.price}
                  </div>
                  <div className="cart__item__qty">
                    <input
                      type="number"
                      value={item.count}
                      onChange={(e, id, i) =>
                        handleCount(e, item.id, item.item_detail.id)
                      }
                    />
                  </div>
                  <div className="cart__item__remove">
                    <button onClick={(e, id) => handleRemoveItem(e, item.id)}>
                      remove
                    </button>
                  </div>
                  <div className="cart__item__total">
                    Php {item.item_detail.price * item.count}
                  </div>
                </div>
              ))}
            </div>
            <div className="cart__total">Total: Php{total}</div>
            <Button variant="contained" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
