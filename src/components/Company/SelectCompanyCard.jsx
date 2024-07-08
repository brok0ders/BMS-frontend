import React, { useState } from "react";
import { Link } from "react-router-dom";
const SelectCompanyCard = ({ url, id, name, totalBrands }) => {
  return (
    <Link
      to={`${url}/${id}`}
      className="flex flex-col gap-2  py-5 px-5 relative glass-effect border  border-gray-100"
    >
      <h2 className="text-xl text-center font-semibold">{name}</h2>
      <p className="text-[1.1rem]  text-center font-semibold">
        Total Brands:{" "}
        <span className="text-[1rem]  text-gray-500">{totalBrands}</span>
      </p>
    </Link>
  );
};

export default SelectCompanyCard;
