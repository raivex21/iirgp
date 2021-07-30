import React from "react";
import ItemListView from "./ItemListView";
import Navbar from "./Navbar";

function Shop() {
  return (
    <div className="shop">
      <div className="container">
        <Navbar />
      </div>
      <div className="shop__body">
        <ItemListView />
      </div>
    </div>
  );
}

export default Shop;
