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
    <>
      <Link
        to={`/dashboard/${url}/${id}`}
        className="flex flex-col gap-2  py-5 relative glass-effect border  border-gray-100"
      >
        <div className="py-5 px-5 rounded-lg">
          <p
            className={`border-2 w-20 rounded-lg text-center ${
              companyType === "beer"
                ? "border-yellow-500 bg-yellow-100"
                : "border-red-400 bg-red-100"
            }`}
          >
            {companyType}
          </p>
          <h2 className="mt-3 text-xl text-center font-semibold">{name}</h2>
          <p className="text-[1.1rem]  text-center font-semibold border-2 border-blue-100 w-[10rem] m-auto rounded-lg bg-blue-50 mt-3 text-blue-900">
            {brands} brands
          </p>
        </div>
      </Link>
    </>
  );
};

export default SelectCompanyCard;
