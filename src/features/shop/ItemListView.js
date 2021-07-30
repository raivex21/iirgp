import React, { useEffect } from "react";
import ItemDetailView from "./ItemDetailView";
import { useDispatch, useSelector } from "react-redux";
import { getAllItemList } from "../../features/itemSlice";

function ItemListView() {
  const dispatch = useDispatch();
  const { allItemList } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(getAllItemList());
  }, []);

  return (
    <div className="shop__item__grid">
      {allItemList.map((item) => (
        <div className="item__container" key={item.id}>
          <ItemDetailView
            image={item.image}
            name={item.name}
            price={item.price}
            itemId={item.id}
          />
        </div>
      ))}
    </div>
  );
}

export default ItemListView;
