import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import SelectCompanyCard from "./SelectCompanyCard";
import CompanyContext from "../../context/company/companyContext";
import LiquorIcon from "@mui/icons-material/Liquor";
import Loader from "../Layout/Loader";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import CompanyForm from "../../pages/Company/CompanyForm";
import BackButton from "../BackButton";

const CompanySelection = () => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const { companyType } = useParams();
  const page = searchParams.get("page");
  const { company, getAllCompany } = useContext(CompanyContext);

  const getAllCompanies = async () => {
    setLoading(true);
    try {
      const res = await getAllCompany();
      const filteredCompanies = res?.company?.filter(
        (company) => company.company.companyType === companyType
      );
      setCompanyData(filteredCompanies);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, [companyType, company]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              marginTop: "1rem",
              marginRight: "2rem",
            }}
          >
            <CompanyForm
              open={open}
              onClose={() => {
                setOpen(false);
              }}
            />
          </Box>
          {!companyData || companyData.length === 0 ? (
            <>
              <div className="w-[25vw] m-auto text-center mt-[1rem]">
                <img
                  src="/images/no-data.png"
                  alt=""
                  className="w-[25vw] m-auto"
                />
                <p>NO SUPPLIERS FOUND!</p>
              </div>
              <Box className="flex justify-center mt-8">
                <Button
                  startIcon={<Add />}
                  variant="contained"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  New Supplier
                </Button>
              </Box>
            </>
          ) : (
            <>
              <div className={`relative ${loading ? "blur-background" : ""}`}>
                <BackButton className={"left-20 top-20"} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "0rem",
                    marginRight: "2rem",
                    marginLeft: "33%", // Add left margin to balance the container
                  }}
                >
                  <h1 className="text-2xl md:text-5xl bg-gradient-to-r from-gray-100 to-gray-100 via-white py-8 h-24 mt-5 flex items-center text-center">
                    <LiquorIcon sx={{ fontSize: 39, marginRight: 3 }} /> Select
                    Supplier
                    <LiquorIcon sx={{ fontSize: 39, marginLeft: 3 }} />
                  </h1>
                  <Button
                    startIcon={<Add />}
                    variant="contained"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    New Supplier
                  </Button>
                </Box>

                <div className="px-20 mt-10">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-9">
                    {companyData?.map((company) => (
                      <SelectCompanyCard
                        url={`${companyType}${page ? "/bill/" + page : ""}`}
                        key={company.company._id}
                        name={company.company.name}
                        id={company._id}
                        companyType={company.company.companyType}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CompanySelection;
