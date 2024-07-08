import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";

const data = [
  { _id: "87645kh5kh453", name: "PVK Distribution", totalBrands: 78 },
  { _id: "87645kh5kh4e5", name: "Lrm Distribution", totalBrands: 7 },
  { _id: "87645kh5khu84", name: "KHG Distribution", totalBrands: 7 },
  { _id: "87645kh5kh433hd", name: "KUY Theka", totalBrands: 7 },
  { _id: "87645kh5kh4dhd", name: "YKJ Distribution", totalBrands: 7 },
  { _id: "87645kh5khdhd", name: "KGK Distribution", totalBrands: 7 },
  { _id: "87645kh5kh4dh", name: "OYO Distribution", totalBrands: 7 },
  { _id: "87645kh5kh45dh", name: "NMV Distribution", totalBrands: 7 },
  { _id: "87645kh5khdghd", name: "JDM Distribution", totalBrands: 7 },
];

const Companies = ({}) => {
  const [companyData, setCompanyData] = useState([]);

  const getAllCompanies = () => {
    setCompanyData(data);
  };

  useEffect(() => {
    getAllCompanies();
  });
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-10">
      {companyData.map((company) => (
        <CompanyCard
          key={company._id}
          name={company.name}
          id={company._id}
          totalBrands={company?.totalBrands}
        />
      ))}
    </div>
  );
};

export default Companies;
