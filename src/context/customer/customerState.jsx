import { useState } from "react";
import API from "../../utils/API";
import CustomerContext from "./customerContext";
import { toast } from "react-toastify";

const CustomerState = (props) => {
  const [customer, setCustomer] = useState({});

  const getAllCustomer = async () => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/customer/all`, config);
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getCustomer = async ({ id }) => {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const { data } = await API.get(`/customer/${id}`, config);
    if (data.success) {
      setCustomer(data.customer);
    }
    console.log(data.message);
    return data;
  };

  const getCustomerByLisencee = async ({ licensee }) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/customer/details/${licensee}`, config);
      if (data.success) {
        setCustomer(data.customer[0]);
      }
      console.log(data.message);
      return data;
    }
    catch(e) {}
  };

  const createCustomer = async ({ licensee, shop, firm, pan }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    const { data } = await API.post(
      "/customer/create",
      { licensee, shop, firm, pan },
      config
    );
    if (data.success) {
      setCustomer(data.customer);
    }
    console.log(data.message);
    return data;
  };

  const updateCustomer = async ({ id, licensee, shop, firm }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.put(
        `/customer/update/${id}`,
        { licensee, shop, firm },
        config
      );
      if (data.success) {
        setCustomer(data.customer);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const deleteCustomer = async ({ id }) => {
    try {
      const config = {
        header: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.delete(`/customer/delete/${id}`, config);
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        getCustomer,
        getAllCustomer,
        updateCustomer,
        createCustomer,
        deleteCustomer,
        getCustomerByLisencee
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;
