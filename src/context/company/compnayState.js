import { useState } from "react";
import API from "../../utils/API";
import CompanyContext from "./companyContext";

const companyState = (props) => {
  const [company, setCompany] = useState({});

  const getAllCompany = async () => {
    const config = {
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.get(`/company/all`, config);
    if (data.success) {
      console.log(data.message);
      return data.company;
    }
    console.log(data.message);
    return undefined;
  };

  const getCompany = async ({ id }) => {
    const config = {
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.get(`/company/${id}`, config);
    if (data.success) {
      setCompany(data.company);
      console.log(data.message);
      return data.company;
    }
    console.log(data.message);
    return undefined;
  };

  const createCompany = async ({ name }) => {
    const config = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.post(
      "/company/create",
      { name },
      config
    );
    if (data.success) {
      setCompany(data.company);
      console.log(data.message);
      return data.company;
    }
    console.log(data.message);
    return undefined;
  };

  const updateCompany = async ({ id, name }) => {
    const config = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.put(
      `/company/update/${id}`,
      { name },
      config
    );
    if (data.success) {
      setCompany(data.company);
      console.log(data.message);
      return data.company;
    }
    console.log(data.message);
    return undefined;
  };

  const deleteCompany = async ({ id }) => {
    const config = {
      Authorization: localStorage.getItem("token"),
    };
    const { data } = await API.delete(
      `/company/delete/${id}`,
      config
    );
    if (data.success) {
      setcompany(data.company);
      console.log(data.message);
      return data.company;
    }
    console.log(data.message);
    return undefined;
  };

  return (
    <CompanyContext.Provider
      value={{
        getCompany,
        getAllCompany,
        updateCompany,
        createCompany, 
        deleteCompany
      }}
    >
      {props.children}
    </CompanyContext.Provider>
  );
};

export default companyState;
