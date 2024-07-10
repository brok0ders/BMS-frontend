import React, { useContext, useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import UpdateCompanyForm from "../../pages/Company/UpdateCompanyForm";
import CompanyContext from "../../context/company/companyContext";
import { toast } from "react-toastify";
import BeerContext from "../../context/beer/beerContext";
import LiquorContext from "../../context/liquor/liquorContext";
const CompanyCard = ({ id, name, companyType }) => {
  const [brands, setBrands] = useState(0);

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
  const handleDelete = async () => {
    try {
      const res = await deleteCompany({ id });
      toast.success("Company deleted successfully!");
      await getAllCompany();
    } catch (e) {}
  };
  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2  py-5 relative glass-effect border  border-gray-100">
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            alignItems: "center",
            cursor: "pointer",
            margin: "15% 0 0 0",
          }}
          onClick={handleDelete}
        >
          <Button
            color="error"
            sx={{
              position: "absolute",
              bottom: "0",
              padding: "10px",
              width: "100%",
              bgcolor: "rgb(254, 242, 242)",
            }}
          >
            Delete
          </Button>
        </Box>
      </div>
    </>
  );
};

export default CompanyCard;
