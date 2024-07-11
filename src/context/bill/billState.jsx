import { useContext, useState } from "react";
import API from "../../utils/API";
import BillContext from "./billContext";
import axios from "axios";
import { toast } from "react-toastify";

const BillState = ({ children }) => {
  const [bill, setBill] = useState({});

  const getAllBills = async ({ id }) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/bill/all/${id}`, config);
      if (data.success) {
        console.log(data.message);
        return data.bills;
      } else {
        return data;
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getBill = async ({ id }) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/bill/${id}`, config);
      if (data.success) {
        setBill(data.bill);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const createBill = async ({
    excise,
    pno,
    customer,
    seller,
    products,
    company,
  }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.post(
        "/bill/new",
        { customer, seller, products, company, excise, pno },
        config
      );
      if (data.success) {
        toast.success(data.message);
        setBill(data.bill);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const updateBill = async ({ id, customer, seller, products, company }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.put(
        `/bill/update/${id}`,
        { customer, seller, products, company },
        config
      );
      if (data.success) {
        setBill(data.bill);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
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
