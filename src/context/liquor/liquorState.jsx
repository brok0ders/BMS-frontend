import { useState } from "react";
import API from "../../utils/API";
import LiquorContext from "./liquorContext";
import { toast } from "react-toastify";

const LiquorState = (props) => {
  const [liquor, setLiquor] = useState({});

  const getAllLiquor = async () => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/liquor/all`, config);
      if (data.success) {
        setLiquor(data.liquor);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getLiquor = async ({ id }) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/liquor/${id}`, config);
      if (data.success) {
        setLiquor(data.liquor);
        console.log(data.message);
        return data.liquor;
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getLiquorCom = async ({ id }) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/liquor/company/${id}`, config);
      if (data.success) {
        setLiquor(data.liquor);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const createLiquor = async ({ brandName, stock, price, company }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.post(
        "/liquor/new",
        { brandName, stock, price, company },
        config
      );
      if (data.success) {
        setLiquor(data.liquor);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const updateLiquor = async ({ id, brandName, stock, price, company }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.put(
        `/liquor/edit/${id}`,
        { brandName, stock, price, company },
        config
      );
      if (data.success) {
        setLiquor(data.liquor);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const deleteLiquor = async ({ id }) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.delete(`/liquor/delete/${id}`, config);
      if (data.success) {
        setLiquor(data.liquor);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <LiquorContext.Provider
      value={{
        getLiquor,
        getAllLiquor,
        getLiquorCom,
        updateLiquor,
        createLiquor,
        deleteLiquor,
      }}
    >
      {props.children}
    </LiquorContext.Provider>
  );
};

export default LiquorState;
