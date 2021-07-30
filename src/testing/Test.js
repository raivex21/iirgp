import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItemList } from "../features/itemSlice";

function Test() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { allItemList } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(getAllItemList(token));
  }, []);

  return <div>{JSON.stringify(allItemList)}</div>;
}

export default Test;
