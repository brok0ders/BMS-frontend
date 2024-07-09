import { useState } from "react";
import API from "../../utils/API";
import CompanyContext from "./companyContext";
import { toast } from "react-toastify";

const CompanyState = (props) => {
  const [company, setCompany] = useState({});
  const [companyData, setCompanyData] = useState([]);

  const getAllCompany = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };

      const { data } = await API.get(`/company/all`, config);
      setCompanyData(data.company);
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getCompany = async ({ id }) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(`/company/${id}`, config);
      if (data.success) {
        setCompany(data.company);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const createCompany = async ({ name, companyType }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.post(
        "/company/create",
        { name, companyType },
        config
      );
      if (data.success) {
        setCompany(data.company);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const updateCompany = async ({ id, name, companyType }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.put(`/company/update/${id}`, { name, companyType }, config);
      if (data.success) {
        setCompany(data.company);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const deleteCompany = async ({ id }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.delete(`/company/delete/${id}`, config);
      if (data.success) {
        setCompany(data.company);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <CompanyContext.Provider
      value={{
        company,
        companyData,
        setCompanyData,
        getCompany,
        getAllCompany,
        updateCompany,
        createCompany,
        deleteCompany,
      }}
    >
      {props.children}
    </CompanyContext.Provider>
  );
};

export default CompanyState;
