import React, { useContext, useEffect, useState } from "react";
import CompanyContext from "../../context/company/companyContext";
import BeerContext from "../../context/beer/beerContext";
import LiquorContext from "../../context/liquor/liquorContext";

const CompanyCard = ({ id, name, companyType }) => {
  const [brands, setBrands] = useState(0);
  const [open, setOpen] = useState(false);

  const { deleteCompany, getAllCompany } = useContext(CompanyContext);
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
      <div className="flex flex-col gap-2 py-5 relative  border border-gray-100 bg-gradient-to-r from-gray-100 to-gray-200 via-white">
          <p
            className={`w-3 h-3 rounded-full flex items-center justify-center text-center ${
              companyType === "beer"
                ? "border-1 border-yellow-500 bg-yellow-500 text-yellow-900"
                : "border-1 border-blue-400 bg-blue-500 text-blue-900"
            }`}
          >
          </p>
        <div className="rounded-lg">
            

          <h2 className="mt-3 text-xl text-center font-semibold">{name}</h2>
          <p className="text-[1.1rem] text-center w-[10rem] m-auto mt-3 text-blue-900 underline">
            {brands} brands
          </p>
        </div>
       
      </div>
    </>
  );
};

export default CompanyCard;
