import React from "react";
import logo from "./logo.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Button } from "@material-ui/core";
import { IconButton, Badge } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { navigate } from "hookrouter";

function Navbar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="navbar">
      <div className="navbar__menu">
        <img src={logo} alt="" />
        <span className="navbar__menu__item">ISAT IIRGP</span>
        <span onClick={() => navigate("/")} className="navbar__menu__item">
          Home
        </span>

        <span
          onClick={() => navigate("/contact")}
          className="navbar__menu__item"
        >
          Contact Us
        </span>
      </div>
      <div className="navbar__logout">
        <IconButton onClick={() => navigate("/cart")}>
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
