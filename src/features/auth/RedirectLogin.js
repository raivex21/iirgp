import React, { useEffect } from "react";
import { navigate } from "hookrouter";

function RedirectLogin() {
  useEffect(() => {
    navigate("/");
  }, []);

  return <div>redirecting...</div>;
}

export default RedirectLogin;
