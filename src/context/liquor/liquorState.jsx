import { useState } from "react";
import API from "../../utils/API";
import LiquorContext from "./liquorContext";
import { toast } from "react-toastify";

const LiquorState = (props) => {
  const [liquor, setLiquor] = useState({});
  const [brands, setBrands] = useState([]);
  const brands2 = [
    {
      brandName: "ALCOBREW SINGLE OAK SELECT GRAIN WHISKY",
      company: "668d95e1f70a14edd49f919c",
      sizes: [
        {
          size: "750ml",
          price: 4359.1,
          wep: 36,
          hologram: 5.1,
          pratifal: 82.88,
        },
        {
          size: "180ml",
          price: 4293.82,
          wep: 36,
          hologram: 20.39,
          pratifal: 154.03,
        },
        {
          size: "375ml",
          price: 4369.1,
          wep: 36,
          hologram: 10.2,
          pratifal: 63,
        },
      ],
    },
    {
      brandName: "GOLFER'S SHOT 18 HOLE ULTRA PREMIUM BLENDED WHISKY",
      company: "668d95e1f70a14edd49f919c",
      sizes: [
        {
          size: "750ml",
          price: 7039.7,
          wep: 36,
          hologram: 5.1,
          pratifal: 80.1,
        },
      ],
    },
    {
      brandName: "GOLFER'S SHOT BARREL RESERVE WHISKY",
      company: "668d95e1f70a14edd49f919c",
      sizes: [
        {
          size: "750ml",
          price: 5751.1,
          wep: 36,
          hologram: 5.1,
          pratifal: 94.61,
        },
        {
          size: "180ml",
          price: 5685.82,
          wep: 36,
          hologram: 20.39,
          pratifal: 165.76,
        },
        {
          size: "375ml",
          price: 5751.1,
          wep: 36,
          hologram: 10.2,
          pratifal: 88.5,
        },
      ],
    },
    {
      brandName: "LION DADDY ORIGINAL DARK RUM",
      company: "668d95e1f70a14edd49f919c",
      sizes: [
        {
          size: "750ml",
          price: 3136.16,
          wep: 36,
          hologram: 5.1,
          pratifal: 2.58,
        },
      ],
    },
    {
      brandName: "WILLIAM LAWSON'S BLENDED SCOTCH WHISKY ULTRA CLASSIC",
      company: "668d95e1f70a14edd49f919d",
      sizes: [
        {
          size: "750ml",
          price: 8924,
          wep: 36,
          hologram: 5.1,
          pratifal: 84.15,
        },
        {
          size: "180ml",
          price: 8847.16,
          wep: 36,
          hologram: 20.39,
          pratifal: 51.14,
        },
        {
          size: "375ml",
          price: 8934,
          wep: 36,
          hologram: 10.2,
          pratifal: 64.32,
        },
      ],
    },
    {
      brandName: "Bacardi Apple Deluxe Original Apple Rum",
      company: "668d95e1f70a14edd49f919e",
      sizes: [
        {
          size: "750ml",
          price: 4658.25,
          wep: 36,
          hologram: 5.1,
          pratifal: 32.78,
        },
        {
          size: "180ml",
          price: 4604.0,
          wep: 36,
          hologram: 20.39,
          pratifal: 208.8,
        },
      ],
    },
    {
      brandName: "Bacardi Carta Blanca Ultra Classic Superior White Rum",
      company: "668d95e1f70a14edd49f919e",
      sizes: [
        {
          size: "750ml",
          price: 4920.7,
          wep: 36,
          hologram: 5.1,
          pratifal: 33.13,
        },
        {
          size: "180ml",
          price: 4855.86,
          wep: 36,
          hologram: 20.39,
          pratifal: 103.54,
        },
        {
          size: "375ml",
          price: 4930.7,
          wep: 36,
          hologram: 10.2,
          pratifal: 13.3,
        },
      ],
    },
    {
      brandName: "Bacardi Limon Deluxe Original Citrus Rum",
      company: "668d95e1f70a14edd49f919e",
      sizes: [
        {
          size: "750ml",
          price: 4658.25,
          wep: 36,
          hologram: 5.1,
          pratifal: 32.78,
        },
        {
          size: "180ml",
          price: 8604.0,
          wep: 36,
          hologram: 20.39,
          pratifal: 208.8,
        },
        {
          size: "375ml",
          price: 4668.25,
          wep: 36,
          hologram: 10.2,
          pratifal: 12.96,
        },
      ],
    },
    {
      brandName: "Jim Beam Kentucky Straight Bourbon Whiskey",
      company: "668d95e1f70a14edd49f91a0",
      sizes: [
        {
          size: "750ml",
          price: 9326.5,
          wep: 36,
          hologram: 5.1,
          pratifal: 12.37,
        },
      ],
    },
  ];

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

  const createLiquor = async ({ liquorId, stock, company }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.post(
        "/liquor/new",
        { liquorId, stock , company},
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

  const updateLiquor = async ({ id, stock }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.put(
        `/liquor/edit/${id}`,
        { stock },
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

  const allGlobalLiquor = async() => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/master-liquor/all`, config);
      if (data.success) {
        setBrands(data.liquors);
      }
      // console.log(data.liquors);
      return data.liquors;
    }
    catch (e) {
      toast.error(e.response.data.message);
    }
  }

  return (
    <LiquorContext.Provider
      value={{
        allGlobalLiquor,
        brands,
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
