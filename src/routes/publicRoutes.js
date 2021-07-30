import React from "react";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

const PublicRoutes = {
  "/": () => <Register />,
  "/register": () => <Register />,
  "/login": () => <Login />,
};

export default PublicRoutes;
