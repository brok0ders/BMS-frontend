import React from "react";

const AnalyticsCard = ({ name, value, icon }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 px-6 shadow-sm">
      <div className="flex justify-between items-start">
        <h1 className="text-lg font-[400] uppercase   text-sky-700 pt-4">
          {name}
        </h1>
        <div className="w-[4rem] shadow-md shadow-blue-400/30 h-[4rem] rounded-full bg-gradient-to-tr from-blue-300 via-gray-50 to-sky-500 p-3">
          <img className="w-full" src={icon} alt="" />
        </div>
      </div>
      <h1 className="text-xl md:text-3xl font-semibold text-gray-600">
        {value}
      </h1>
    </div>
  );
};

export default AnalyticsCard;
