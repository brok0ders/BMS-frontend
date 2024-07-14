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
              <Box className="mt-4 flex justify-center sm:flex md:mt-4 lg:mt-6">
                <Button
                  startIcon={<Add />}
                  variant="contained"
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="px-4 py-2  sm:px-6 sm:py-3 md:px-8 md:py-4"
                >
                  <span className="text-sm">New Supplier</span>
                </Button>
              </Box>
            </>
          ) : (
            <>
              <div className={`relative ${loading ? "blur-background" : ""}`}>
                <BackButton className={"md:left-20 md:top-20"} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "0rem",
                    marginRight: "2rem",
                    marginLeft: { xs: "0rem", md: "33%" }, // Responsive left margin
                    flexDirection: { xs: "column", md: "row" }, // Stack items vertically on smaller screens
                    textAlign: { xs: "center", md: "left" }, // Center align text on smaller screens
                  }}
                >
                  <h1 className="text-2xl md:text-5xl bg-gradient-to-r from-gray-100 to-gray-100 via-white py-8 h-24 mt-5 flex items-center justify-center">
                    <LiquorIcon
                      sx={{ fontSize: 39, marginRight: { xs: 0, md: 3 } }}
                    />
                    Select Supplier
                    <LiquorIcon
                      sx={{ fontSize: 39, marginLeft: { xs: 0, md: 3 } }}
                    />
                  </h1>
                  <Button
                    startIcon={<Add />}
                    variant="contained"
                    onClick={() => {
                      setOpen(true);
                    }}
                    sx={{ mt: { xs: 2, md: 0 } }} // Add top margin on smaller screens
                  >
                    New Supplier
                  </Button>
                </Box>

                <div className="px-4 md:px-10 lg:px-20 mt-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 my-9">
                    {companyData?.map((company) => (
                      <SelectCompanyCard
                        key={company.company._id}
                        url={`${companyType}${page ? "/bill/" + page : ""}`}
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
