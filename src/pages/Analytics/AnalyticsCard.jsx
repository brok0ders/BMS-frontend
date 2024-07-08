import React from "react";

const AnalyticsCard = ({ name, value, icon }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-5 shadow-sm">
      <div>
        <h1 className="text-xl font-normal text-gray-600">{name}</h1>
        img
      </div>
      <h1 className="text-lg font-semibold">{value}</h1>
    </div>
  );
};

export default AnalyticsCard;
