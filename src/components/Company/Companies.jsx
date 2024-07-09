import React, { useContext, useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import { useSearchParams } from "react-router-dom";
import CompanyContext from "../../context/company/companyContext";
import { toast } from "react-toastify";

const data = [
  { _id: "1", name: "Lrm Distribution", totalBrands: 7, companyType: "liquor" },
  { _id: "2", name: "Beer Distribution", totalBrands: 78, companyType: "beer" },
  { _id: "3", name: "KHG Distribution", totalBrands: 7, companyType: "beer" },
  { _id: "4", name: "KUY Theka", totalBrands: 7, companyType: "beer" },
  { _id: "5", name: "YKJ Distribution", totalBrands: 7, companyType: "beer" },
  { _id: "6", name: "KGK Distribution", totalBrands: 7, companyType: "beer" },
  { _id: "7", name: "OYO Distribution", totalBrands: 7, companyType: "beer" },
  { _id: "8", name: "NMV Distribution", totalBrands: 7, companyType: "beer" },
  { _id: "9", name: "JDM Distribution", totalBrands: 7, companyType: "beer" },
  {
    _id: "10",
    name: "Liquor Distribution",
    totalBrands: 78,
    companyType: "liquor",
  },
  {
    _id: "11",
    name: "KHG Distribution",
    totalBrands: 7,
    companyType: "liquor",
  },
  { _id: "12", name: "KUY Theka", totalBrands: 7, companyType: "beer" },
  {
    _id: "13",
    name: "YKJ Distribution",
    totalBrands: 7,
    companyType: "liquor",
  },
  {
    _id: "14",
    name: "KGK Distribution",
    totalBrands: 7,
    companyType: "liquor",
  },
  {
    _id: "15",
    name: "OYO Distribution",
    totalBrands: 7,
    companyType: "liquor",
  },
  {
    _id: "16",
    name: "NMV Distribution",
    totalBrands: 7,
    companyType: "liquor",
  },
  {
    _id: "17",
    name: "JDM Distribution",
    totalBrands: 7,
    companyType: "liquor",
  },
];

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
      if (tab === "all" || tab === null) {
        // setCompanyData(res.company);
      } else {
        const filteredCompanies = res.company.filter(
          (company) => company.companyType === tab
        );
        setCompanyData(filteredCompanies);
      }
    } catch (e) {}
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-10">
      {companyData?.map((company) => (
        <CompanyCard
          key={company._id}
          name={company.name}
          id={company._id}
          totalBrands={company.totalBrands}
        />
      ))}
    </div>
  );
};

export default Companies;