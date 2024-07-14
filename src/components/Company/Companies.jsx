import React, { useContext, useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import { useSearchParams } from "react-router-dom";
import CompanyContext from "../../context/company/companyContext";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";

const Companies = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const [loading, setLoading] = useState(false);
  const { companyData, setCompanyData, getAllCompany } =
    useContext(CompanyContext);
  useEffect(() => {
    getAllCompanies();
  }, [tab]);
  const getAllCompanies = async () => {
    try {
      setLoading(true);
      const res = await getAllCompany();
      console.log(res);
      if (tab === "all" || tab === null) {
        // setCompanyData(res.company);
      } else {
        const filteredCompanies = res?.company?.filter(
          (company) => company?.company?.companyType === tab
        );
        setCompanyData(filteredCompanies);
      }
      setLoading(false);
    } catch (e) {}
  };

  return (
    <>
      {!companyData || companyData.length === 0 ? (
        <>
          <>
            <div className="w-[25vw] m-auto text-center mt-[2rem]">
              <img
                src="/images/no-data.png"
                alt=""
                className="w-[25vw] m-auto"
              />
              <p>NO SUPPLIERS FOUND!</p>
            </div>
          </>
        </>
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-1">
              {companyData?.map((company) => (
                <CompanyCard
                  key={company.company._id}
                  name={company.company.name}
                  companyType={company.company.companyType}
                  id={company._id}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Companies;
