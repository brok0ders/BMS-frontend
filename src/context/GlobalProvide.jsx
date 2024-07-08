import React from "react";
import UserState from "./user/userState";
import BillState from "./bill/billState";
import BeerState from "./beer/beerState";
import CompanyState from "./company/compnayState";
import CustomerState from "./customer/customerState";
import LiquorState from "./liquor/liquorState";
const GlobalProvider = ({ children }) => {
  return (
    <UserState>
      <BeerState>
        <CompanyState>
          <CustomerState>
            <LiquorState>
              <BillState>{children}</BillState>
            </LiquorState>
          </CustomerState>
        </CompanyState>
      </BeerState>
    </UserState>
  );
};

export default GlobalProvider;
