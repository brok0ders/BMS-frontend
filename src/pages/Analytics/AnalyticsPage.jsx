import React from "react";
import Beer from "/images/beer.png";
import Bill from "/images/bill.png";
import Company from "/images/companies.png";
import Revenue from "/images/revenue.png";
import Liquor from "/images/liquor.png";
import AnalyticsCard from "./AnalyticsCard";
import People from "/images/people.png";
import AnalyticsChart from "./AnalyticsChart";
const AnalyticsPage = () => {
  return (
    <div className="px-5  pb-10 md:px-20 md:pb-20">
      <h1 className="text-gray-600 text-center pt-10 pb-16 text-4xl md:text-6xl font-bold">
        Analytics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
        <AnalyticsCard icon={Bill} name={"Total Bills"} value={750} />
        <AnalyticsCard
          icon={Revenue}
          name={"Total Revenue"}
          value={"₹ 17750"}
        />
        <AnalyticsCard icon={Company} name={"Total Companies"} value={750} />
        <AnalyticsCard icon={Beer} name={"Total Beers"} value={500} />
        <AnalyticsCard icon={Liquor} name={"Total Liquors"} value={750} />
        <AnalyticsCard icon={People} name={"Total Licensee"} value={750} />
      </div>
      <div className="py-10">
        <AnalyticsChart />
      </div>
    </div>
  );
};

export default AnalyticsPage;
