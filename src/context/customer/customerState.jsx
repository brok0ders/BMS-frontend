import { useState } from "react";
import API from "../../utils/API";
import CustomerContext from "./customerContext";

const CustomerState = (props) => {
  const [customer, setCustomer] = useState({});

  const getAllCustomer = async () => {
    const config = {
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.get(`/customer/all`, config);
    if (data.success) {
      console.log(data.message);
      return data.customer;
    }
    console.log(data.message);
    return undefined;
  };

  const getCustomer = async ({ id }) => {
    const config = {
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.get(`/customer/${id}`, config);
    if (data.success) {
      setCustomer(data.customer);
      console.log(data.message);
      return data.customer;
    }
    console.log(data.message);
    return undefined;
  };

  const createCustomer = async ({ licensee, shop, firm }) => {
    const config = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.post(
      "/customer/create",
      { licensee, shop, firm },
      config
    );
    if (data.success) {
      setCustomer(data.customer);
      console.log(data.message);
      return data.customer;
    }
    console.log(data.message);
    return undefined;
  };

  const updateCustomer = async ({ id, licensee, shop, firm }) => {
    const config = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.put(
      `/customer/update/${id}`,
      { licensee, shop, firm },
      config
    );
    if (data.success) {
      setCustomer(data.customer);
      console.log(data.message);
      return data.customer;
    }
    console.log(data.message);
    return undefined;
  };

  const deleteCustomer = async ({ id }) => {
    const config = {
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.delete(
      `/customer/delete/${id}`,
      config
    );
    if (data.success) {
      setCustomer(data.customer);
      console.log(data.message);
      return data.customer;
    }
    console.log(data.message);
    return undefined;
  };

  return (
    <CustomerContext.Provider
      value={{
        getCustomer,
        getAllCustomer,
        updateCustomer,
        createCustomer, 
        deleteCustomer
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;
