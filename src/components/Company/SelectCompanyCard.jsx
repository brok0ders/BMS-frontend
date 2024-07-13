import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BeerContext from "../../context/beer/beerContext";
import LiquorContext from "../../context/liquor/liquorContext";
const SelectCompanyCard = ({ url, id, name, companyType }) => {
  const [brands, setBrands] = useState(0);
  const { getBeerCom } = useContext(BeerContext);
  const { getLiquorCom } = useContext(LiquorContext);
  const getBrands = async () => {
    try {
      const res = await getBeerCom({ id });
      const res2 = await getLiquorCom({ id });
      const beers = res?.beer?.length;
      const liquor = res2?.liquor?.length;
      setBrands(beers + liquor);
    } catch (e) {}
  };
  useEffect(() => {
    getBrands();
  }, []);
  return (
    <Link
      to={`/dashboard/${url}/${id}`}
      className="flex flex-col gap-3 py-6 px-6 relative border border-gray-200 rounded-lg shadow-sm transition-transform transform hover:scale-105"
      style={{
        background:
          "linear-gradient(135deg, rgba(240, 240, 240, 1), rgba(255, 255, 255, 1), rgba(220, 220, 220, 1))",
        color: "#333",
      }}
    >
      <h3 className="text-lg  md:text-xl text-center  font-bold">{name}</h3>
    </Link>
  );
};

export default SelectCompanyCard;
