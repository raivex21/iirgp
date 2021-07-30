import React, { useEffect } from "react";
import "./App.css";
// import Register from "./components/Register";
import { useRoutes } from "hookrouter";
import PrivateRoutes from "./routes/privateRoutes";
import PublicRoutes from "./routes/publicRoutes";
// import CustomLayout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { authCheckState } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authCheckState());
  }, [user.token, user.loading]);
  const isAuthenticated = user.token !== null;
  const privateRoutes = useRoutes(PrivateRoutes);
  const publicRoutes = useRoutes(PublicRoutes);
  return (
    <div>
      {isAuthenticated ? (
        <div>{privateRoutes || <div>PAGE NOT FOUND</div>}</div>
      ) : (
        <div>{publicRoutes || <div>PAGE NOT FOUND</div>}</div>
      )}
    </div>
  );
}

export default App;
