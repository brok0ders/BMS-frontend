import React, { useContext, useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import UpdateCompanyForm from "../../pages/Company/UpdateCompanyForm";
import CompanyContext from "../../context/company/companyContext";
import { toast } from "react-toastify";
import BeerContext from "../../context/beer/beerContext";
import LiquorContext from "../../context/liquor/liquorContext";
const CompanyCard = ({ id, name }) => {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState(0);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { deleteCompany, updateCompany, getAllCompany } =
    useContext(CompanyContext);
  const { getBeerCom } = useContext(BeerContext);
  const { getLiquorCom } = useContext(LiquorContext);
  const getBrands = async () => {
    try {
      const res = await getBeerCom({ id });
      const res2 = await getLiquorCom({ id });
      const beers = res?.beer?.length;
      const liquor = res2?.liquor?.length;
      setBrands(beers+liquor);
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
    <div className="flex flex-col gap-2  py-5 px-5 relative glass-effect border  border-gray-100">
      <h2 className="text-xl text-center font-semibold">{name}</h2>
      <p className="text-[1.1rem]  text-center font-semibold">
        Total Brands : {brands}
      </p>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
          cursor: "pointer",
          margin: "12% 0 0 8%",
        }}
      >
        <Box
          sx={{
            position: "",
            bottom: 17,
            right: 20,
            background: "rgba(0, 0, 0,0.05)",
            borderRadius: 5,
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleDelete}
        >
          <Button
            sx={{
              minWidth: 1,
              width: 30,
              borderRadius: 5,
            }}
            color="error"
          >
            <Delete sx={{ fontSize: 18 }} />
          </Button>
        </Box>
        <Box
          sx={{
            position: "",
            bottom: 17,
            right: 20,
            background: "rgba(0, 0, 0,0.05)",
            borderRadius: 5,
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              minWidth: 1,
              width: 30,
              borderRadius: 5,
            }}
            onClick={handleOpen}
          >
            <Edit sx={{ fontSize: 18 }} />
          </Button>
        </Box>
      </Box>
      <UpdateCompanyForm id={id} onClose={handleClose} open={open} />
    </div>
  );
};

export default CompanyCard;
