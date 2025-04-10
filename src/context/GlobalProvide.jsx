import React from "react";
import UserState from "./user/userState.jsx";
import BillState from "./bill/billState.jsx";
import BeerState from "./beer/beerState.jsx";
import CompanyState from "./company/companyState.jsx";
import CustomerState from "./customer/customerState.jsx";
import LiquorState from "./liquor/liquorState.jsx";
import CLState from "./cl/clState.jsx";
const GlobalProvider = ({ children }) => {
  return (
    <UserState>
      <BeerState>
        <CompanyState>
          <CustomerState>
            <LiquorState>
              <CLState>
                <BillState>{children}</BillState>
              </CLState>
            </LiquorState>
          </CustomerState>
        </CompanyState>
      </BeerState>
    </UserState>
  );
};

export default GlobalProvider;
