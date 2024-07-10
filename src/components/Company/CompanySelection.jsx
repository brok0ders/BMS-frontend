import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SelectCompanyCard from "./SelectCompanyCard";
import CompanyContext from "../../context/company/companyContext";

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
      (company) => company.companyType === companyType
    );
    setCompanyData(filteredCompanies);
  };
  useEffect(() => {
    getAllCompanies();
  }, [companyType]);
  // liquor/bill/create/:company
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-10">
      {companyData.map((company) => (
        <SelectCompanyCard
          url={`${companyType}${page ? "/bill/" + page : ""}`}
          key={company._id}
          name={company.name}
          id={company._id}
        />
      ))}
    </div>
  );
};

export default CompanySelection;
