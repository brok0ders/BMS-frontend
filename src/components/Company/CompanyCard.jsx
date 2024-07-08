import React from "react";

const CompanyCard = ({ id, name, totalBrands }) => {
  return (
    <div className="flex flex-col rounded gap-2 border-4 shadow-md border-violet-800 py-4 px-5">
      <h2 className="text-xl font-semibold">
        Company:{" "}
        <span className="text-lg font-normal text-gray-500">{name}</span>
      </h2>
      <p>Total Brands: {totalBrands}</p>
    </div>
  );
};

export default CompanyCard;
