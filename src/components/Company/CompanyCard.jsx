import React, { useContext, useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import UpdateCompanyForm from "../../pages/Company/UpdateCompanyForm";
import CompanyContext from "../../context/company/companyContext";
import { toast } from "react-toastify";
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

  const handleDelete = async () => {
    try {
      const res = await deleteCompany({ id });
      toast.success("Company deleted successfully!");
      await getAllCompany();
    } catch (e) {}
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 py-5 relative  border border-gray-100 bg-gradient-to-r from-gray-100 to-gray-200 via-white">
        <div className="py-5 px-5 rounded-lg">
          <p
            className={`w-5 h-5 rounded-full flex items-center justify-center text-center ${
              companyType === "beer"
                ? "border-2 border-yellow-500 bg-yellow-500 text-yellow-900"
                : "border-2 border-blue-400 bg-blue-500 text-blue-900"
            }`}
          >
            
          </p>

          <h2 className="mt-3 text-xl text-center font-semibold">{name}</h2>
          <p className="text-[1.1rem] text-center font-semibold border-2 border-blue-100 w-[10rem] m-auto rounded-lg bg-blue-50 mt-3 text-blue-900">
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
          onClick={handleClickOpen}
        >
          <Button
            color="error"
            sx={{
              position: "absolute",
              bottom: "0",
              padding: "10px",
              width: "100%",
              bgcolor: "rgb(254, 242, 242)",
              border: "1px solid red"
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
