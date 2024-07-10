import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BeerContext from "../../context/beer/beerContext";
import LiquorContext from "../../context/liquor/liquorContext";
const SelectCompanyCard = ({ url, id, name }) => {
  const [brands, setBrands] = useState(0);
  const {getBeerCom} = useContext(BeerContext);
  const {getLiquorCom} = useContext(LiquorContext);
  const getBrands = async () => {
    try {
      const res = await getBeerCom({ id });
      const res2 = await getLiquorCom({ id });
      const beers = res?.beer?.length;
      const liquor = res2?.liquor?.length;
      setBrands(beers+liquor);
    } catch (e) {}
  };
  useEffect(() => {
    getBrands();
  }, []);
  return (
    <Link
      to={`/dashboard/${url}/${id}`}
      className="flex flex-col gap-2  py-5 px-5 relative glass-effect border  border-gray-100"
    >
      <h2 className="text-xl text-center font-semibold">{name}</h2>
      <p className="text-[1.1rem]  text-center font-semibold">
        Total Brands:{" "}
        <span className="text-[1rem]  text-gray-500">{brands}</span>
      </p>
    </Link>
  );
};

export default SelectCompanyCard;
