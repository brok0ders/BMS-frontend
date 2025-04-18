import React, { useContext, useEffect, useState } from "react";
import Beer from "/images/beer.png";
import Bill from "/images/bill.png";
import Company from "/images/companies.png";
import Revenue from "/images/revenue.png";
import Liquor from "/images/liquor.png";
import AnalyticsCard from "./AnalyticsCard";
import People from "/images/people.png";
import AnalyticsChart from "./AnalyticsChart";
import BillContext from "../../context/bill/billContext";
import Loader from "../../components/Layout/Loader";
import BackButton from "../../components/BackButton";
import MonthlyAnalytics from "./MonthlyAnalytics";
import DateWiseReports from "./DateWiseReports";

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState({});
  const { getAnalyticsData } = useContext(BillContext);
  const [loading, setLoading] = useState(false);

  const getAnalytics = async () => {
    setLoading(true);
    try {
      const data = await getAnalyticsData();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="px-5 pb-10 md:px-20 md:pb-20 max-w-7xl mx-auto">
          <div className="py-6">
            <BackButton url={`/dashboard/`} />
          </div>

          <h1 className="text-gray-700 text-center font-extrabold text-4xl md:text-6xl mb-8 tracking-tight">
            Analytics
          </h1>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
            <DateWiseReports />
          </div>

          <h2 className="text-gray-700 text-center pt-6 pb-10 text-3xl md:text-5xl font-bold relative">
            <span className="relative inline-block">
              Overall Analytics
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform -translate-y-2"></span>
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnalyticsCard
              icon={Bill}
              name={"Total Bills"}
              value={analytics?.totalBills}
            />
            <AnalyticsCard
              icon={Revenue}
              name={"Total Revenue"}
              value={`₹ ${analytics?.totalRevenue}`}
            />
            {/* <AnalyticsCard
              icon={Company}
              name={"Total Suppliers"}
              value={analytics?.totalCompanies}
            />
            <AnalyticsCard
              icon={Beer}
              name={"Total Beers"}
              value={analytics?.totalBeers}
            />
            <AnalyticsCard
              icon={Liquor}
              name={"Total Liquors"}
              value={analytics?.totalLiquors}
            /> */}
            <AnalyticsCard
              icon={People}
              name={"Total Licensee"}
              value={analytics?.totalCustomers}
            />
          </div>

          <div className="mt-16 bg-white rounded-xl shadow-sm p-6">
            <MonthlyAnalytics />
          </div>

          <div className="py-10 bg-white rounded-xl shadow-sm p-6 mt-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">
              Product Distribution
            </h3>
            <AnalyticsChart
              beers={analytics?.totalBeers}
              liquors={analytics?.totalLiquors}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
