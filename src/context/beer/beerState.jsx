import { useState } from "react";
import API from "../../utils/API";
import BeerContext from "./beerContext";
import { toast } from "react-toastify";

const BeerState = (props) => {
  const [beer, setBeer] = useState({});

  const getAllBeer = async () => {
    const config = {
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.get(`/beer/all`, config);
    if (data.success) {
      setBeer(data.beer);
      console.log(data.message);
      return data.beer;
    }
    console.log(data.message);
    return undefined;
  };

  const getBeer = async ({ id }) => {
    const config = {
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.get(`/beer/${id}`, config);
    if (data.success) {
      setBeer(data.beer);
      console.log(data.message);
      return data.beer;
    }
    console.log(data.message);
    return undefined;
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
    }
    catch(e) {
      toast.error(e.response.data.message);
    }
  };

  const createBeer = async ({ brandName, stock, price, company }) => {
    const config = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.post(
      "/beer/create",
      { brandName, stock, price, company },
      config
    );
    if (data.success) {
      setBeer(data.beer);
      console.log(data.message);
      return data.beer;
    }
    console.log(data.message);
    return undefined;
  };

  const updateBeer = async ({ id, brandName, stock, price, company }) => {
    const config = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.put(
      `/beer/update/${id}`,
      { brandName, stock, price, company },
      config
    );
    if (data.success) {
      setBeer(data.beer);
      console.log(data.message);
      return data.beer;
    }
    console.log(data.message);
    return undefined;
  };

  const deleteBeer = async ({ id }) => {
    const config = {
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.delete(
      `/beer/delete/${id}`,
      config
    );
    if (data.success) {
      setBeer(data.beer);
      console.log(data.message);
      return data.beer;
    }
    console.log(data.message);
    return undefined;
  };

  return (
    <BeerContext.Provider
      value={{
        getBeer,
        getAllBeer,
        getBeerCom,
        updateBeer,
        createBeer, 
        deleteBeer
      }}
    >
      {props.children}
    </BeerContext.Provider>
  );
};

export default BeerState;
