import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SelectCompanyCard from "./SelectCompanyCard";
import CompanyContext from "../../context/company/companyContext";
import LiquorIcon from "@mui/icons-material/Liquor";
import { blueGrey, red } from "@mui/material/colors";

const CompanySelection = () => {
  const [companyData, setCompanyData] = useState([]);
  const [searchParams] = useSearchParams();
  const { companyType } = useParams();
  const page = searchParams.get("page");
  const { getAllCompany} = useContext(CompanyContext);
  const getAllCompanies = async() => {
    // Data fetching
    const res = await getAllCompany();
    const filteredCompanies = res.company.filter(
      (company) => company.company.companyType === companyType
    );
    setCompanyData(filteredCompanies);
  };
  useEffect(() => {
    getAllCompanies();
  }, [companyType]);
  // liquor/bill/create/:company
  return (
    <div>
      <h1 className=" text-center text-2xl py-8 md:text-5xl bg-gradient-to-r from-gray-100 to-gray-100 via-white h-24 mt-5">
        <LiquorIcon sx={{ fontSize: 39, marginRight: 3 }} /> Select Company{" "}
        <LiquorIcon sx={{ fontSize: 39, marginLeft: 3 }} />
      </h1>

      <div className="px-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-9 ">
          {companyData.map((company) => (
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
  );
};

export default CompanySelection;
