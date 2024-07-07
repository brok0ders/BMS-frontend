import { useContext, useState } from "react";
import API from "../../utils/API";
import BillContext from "./billContext";
import axios from "axios";

const BillState = ({ children }) => {
  const [bill, setBill] = useState({});

  const getAllBills = async ({ id }) => {
    const config = {
      headers: {
        "authorization": localStorage.getItem("token"),
      },
    };
    const {data}  = await API.get(`/bill/all/${id}`, config);
    if (data.success) {
      console.log(data.message);
      return data.bills;
    }
    else {
      return data;
    }
  };

  const getBill = async ({ id }) => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const { data } = await API.get(`/bill/${id}`, config);
    if (data.success) {
      setBill(data.bill);
      return data.bill;
    }
    console.log(data.message);
    return undefined;
  };

  const createBill = async ({ customer, seller, products, company }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    const { data } = await API.post(
      "/bill/new",
      { customer, seller, products, company },
      config
    );
    if (data.success) {
      setBill(data.bill);
      return data.bill;
    }
    console.log(data.message);
    return undefined;
  };

  const updateBill = async ({ id, customer, seller, products, company }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    const { data } = await API.put(
      `/bill/update/${id}`,
      { customer, seller, products, company },
      config
    );
    if (data.success) {
      setBill(data.bill);
      return data.bill;
    }
    console.log(data.message);
    return undefined;
  };

  return (
    <BillContext.Provider
      value={{
        getAllBills,
        getBill,
        createBill,
        updateBill,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};

export default BillState;
