import { useState } from "react";
import API from "../../utils/API";
import ClContext from "./clContext";
import { toast } from "react-toastify";

const CLState = (props) => {
  const [CL, setCL] = useState([]);
  const [brands, setBrands] = useState([]);

  const getAllCL = async () => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/CL/all`, config);
      if (data.success) {
        setCL(data.cl);
      }
      console.log(data);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getCL = async ({ id }) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/CL/${id}`, config);
      if (data.success) {
        setCL(data.CL);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getCLCom = async ({ id }) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/CL/company/${id}`, config);
      if (data.success) {
        setCL(data.CL);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const createCL = async ({ userId }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.post("/CL/create", { userId }, config);
      if (data.success) {
        setCL(data.CL);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const updateCL = async ({ id, stock }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.put(`/CL/update/${id}`, { stock }, config);
      if (data.success) {
        setCL(data.CL);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const deleteCL = async ({ id }) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.delete(`/CL/delete/${id}`, config);
      if (data.success) {
        setCL(data.CL);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const allGlobalCL = async () => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/master-CL/all`, config);
      if (data.success) {
        setBrands(data.CLs);
      }
      // console.log(data.CLs);
      return data.CLs;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <ClContext.Provider
      value={{
        CL,
        allGlobalCL,
        brands,
        getCL,
        getAllCL,
        getCLCom,
        updateCL,
        createCL,
        deleteCL,
      }}
    >
      {props.children}
    </ClContext.Provider>
  );
};

export default CLState;
