import React, { useContext, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn, getUser } = useContext(UserContext);
  useEffect(() => {
    getUser();
  }, []);

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default ProtectedRoutes;
