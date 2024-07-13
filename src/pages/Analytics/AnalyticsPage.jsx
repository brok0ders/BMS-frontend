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
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="px-5  pb-10 md:px-20 md:pb-20">
            <BackButton url={`/dashboard/`} />
            <h1 className="text-gray-600 text-center pt-10 pb-16 text-4xl md:text-6xl font-bold">
              Analytics
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
              <AnalyticsCard
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
              />
              <AnalyticsCard
                icon={People}
                name={"Total Licensee"}
                value={analytics?.totalCustomers}
              />
            </div>
            <div className="py-10">
              <AnalyticsChart
                beers={analytics?.totalBeers}
                liquors={analytics?.totalLiquors}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AnalyticsPage;
