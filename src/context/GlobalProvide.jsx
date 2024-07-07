import React from "react";
import UserState from "./user/userState";
import BillState from "./bill/billState";
const GlobalProvider = ({ children }) => {
  return (
    <UserState>
      <BillState>{children}</BillState>
    </UserState>
  );
};

export default GlobalProvider;
