import React from "react";
import RevenueChart from "./Charts/RevenueChart";
import BeerChart from "./Charts/BeerChart";
import BrandWiseSalesChart from "./Charts/BrandWiseSalesChart";
import LiquorChart from "./Charts/LiquorChart";

const AnalyticsChart = ({ beers, liquors }) => {
  return (
    <div className="py-10 w-full">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full py-10">
        <RevenueChart />
        {/* <BrandWiseSalesChart beer={beers} liquor={liquors} /> */}
      </div>
      {/* <div className="flex py-10 gap-10 flex-col lg:flex-row justify-between items-center">
        <BeerChart />
        <LiquorChart />
      </div> */}
    </div>
  );
};

export default AnalyticsChart;
