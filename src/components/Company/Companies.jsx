import React, { useContext, useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import { useSearchParams } from "react-router-dom";
import CompanyContext from "../../context/company/companyContext";
import { toast } from "react-toastify";

const Companies = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const { companyData, setCompanyData, getAllCompany } =
    useContext(CompanyContext);
  useEffect(() => {
    getAllCompanies();
  }, [tab]);
  const getAllCompanies = async () => {
    try {
      const res = await getAllCompany();
      console.log(res);
      if (tab === "all" || tab === null) {
        // setCompanyData(res.company);
      } else {
        const filteredCompanies = res?.company.filter(
          (company) => company.company.companyType === tab
        );
        setCompanyData(filteredCompanies);
      }
    } catch (e) {}
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-10">
      {companyData?.map((company) => (
        <CompanyCard
          key={company.company._id}
          name={company.company.name}
          companyType={company.company.companyType}
          id={company._id}
        />
      ))}
    </div>
  );
};

export default Companies;
