import { useContext, useState } from "react";
import API from "../../utils/API";
import BillContext from "./billContext";
import { toast } from "react-toastify";

const BillState = ({ children }) => {
  const [bill, setBill] = useState({});
  const getAllBills = async () => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/bill/all/`, config);
      console.log(data);
      if (data.success) {
        console.log(data.message);
        return data.bills;
      } else {
        return data;
      }
    } catch (e) {
      // toast.error(e.response.data.message);
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
  // Revenue chart

  const getRevenueChart = async () => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/bill/chart/revenue`, config);

      console.log(data.message);
      return data?.data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  // TOp -5 liquors

  const getLiquorChart = async () => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/bill/chart/top-liquors`, config);

      console.log(data.message);
      return data?.data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getBeerChart = async () => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/bill/chart/top-beers`, config);

      console.log(data.message);
      return data?.data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getAnalyticsData = async () => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/bill/dashboard/analytics`, config);
      return data?.data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const createBill = async ({
    excise,
    pno,
    fexcise,
    createdAt,
    customer,
    seller,
    products,
    company,
    total,
    billType,
    pratifal,
    tcs,
  }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      console.log(pratifal);
      console.log(tcs);
      const { data } = await API.post(
        "/bill/new",
        {
          customer,
          seller,
          products,
          company,
          excise,
          fexcise,
          pno,
          total,
          billType,
          pratifal,
          tcs,
          createdAt,
        },
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

  const updateBill = async ({ id, paid }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.put(`/bill/update/${id}`, { paid }, config);
      if (data.success) {
        setBill(data.bill);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getBillsByCustomer = async (id, month) => {
    try {
      const { data } = await API.get(`bill/analytics/customer`, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        params: { id, month },
      });
      console.log(data.message);
      if (data.success) {
        return data?.stats;
      } else {
        return [];
      }
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  const getBillsBySeller = async ({ month, billType }) => {
    try {
      const { data } = await API.get(`bill/analytics/seller`, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        params: { month, billType },
      });
      console.log(data.message);
      if (data.success) {
        return data?.company;
      } else {
        return [];
      }
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  const getBrandsByBill = async ({ company, month, billType }) => {
    try {
      const { data } = await API.get(`bill/analytics/brands`, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        params: { company, month, billType },
      });
      console.log(data?.message);
      console.log("brands: ", data?.data);
      if (data.success) {
        return data?.data;
      } else {
        return [];
      }
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  return (
    <BillContext.Provider
      value={{
        getAllBills,
        getBill,
        createBill,
        updateBill,
        getRevenueChart,
        getLiquorChart,
        getBeerChart,
        getAnalyticsData,
        getBillsByCustomer,
        getBillsBySeller,
        getBrandsByBill,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};

export default BillState;
