import { useState } from "react";
import API from "../../utils/API";
import BeerContext from "./beerContext";
import { toast } from "react-toastify";

const BeerState = (props) => {
  const [beer, setBeer] = useState({});

  const getAllBeer = async () => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/beer/all`, config);
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getBeer = async ({ id }) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/beer/${id}`, config);
      if (data.success) {
        setBeer(data.beer);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getBeerCom = async ({ id }) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/beer/company/${id}`, config);
      if (data.success) {
        setBeer(data.beer);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const createBeer = async ({ beerId, stock, company }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.post(
        "/beer/create",
        { beerId, stock, company },
        config
      );
      if (data.success) {
        setBeer(data.beer);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const updateBeer = async ({ id, stock }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.put(`/beer/update/${id}`, { stock }, config);
      if (data.success) {
        setBeer(data.beer);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const deleteBeer = async ({ id }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.delete(`/beer/delete/${id}`, config);
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const allGlobalBeer = async () => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/master-beer/all`, config);
      return data.beers;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <BeerContext.Provider
      value={{
        allGlobalBeer,
        getBeer,
        getAllBeer,
        getBeerCom,
        updateBeer,
        createBeer,
        deleteBeer,
      }}
    >
      {props.children}
    </BeerContext.Provider>
  );
};

export default BeerState;
