import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerContext from "../../context/customer/customerContext";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  User,
  Building,
  Mail,
  CreditCard,
  Loader,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import BillContext from "../../context/bill/billContext";
import FinancialDataTable from "./FinancialDataTable";

const generateProfitData = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    profit: Math.floor(Math.random() * 5000) + 1000,
  }));
};

const LicenseeDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [licensee, setLicensee] = useState(null);
  const [stats, setStats] = useState([]);
  const { getCustomer } = useContext(CustomerContext);
  const { getBillsByCustomer } = useContext(BillContext);

  const [date, setDate] = useState(new Date());
  const [profitData, setProfitData] = useState(() =>
    generateProfitData(date.getFullYear(), date.getMonth() + 1)
  );

  // Handle month change
  const changeMonth = (increment) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + increment);
    setDate(newDate);
    setProfitData(
      generateProfitData(newDate.getFullYear(), newDate.getMonth() + 1)
    );
  };

  const formatMonth = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // ensures 2-digit month
    return `${year}-${month}`;
  };
  

  useEffect(() => {
    const getLicensee = async () => {
      try {
        const res = await getCustomer({ id });
        setLicensee(res.customer);
      } catch (error) {
        console.log("Error fetching customer details:", error);
      } finally {
        setLoading(false);
      }
    };

    getLicensee();
  }, [id]);

  useEffect(() => {
    const getBillStats = async() => {
      console.log("calling");
      try {
        const res = await getBillsByCustomer(id, formatMonth(date));
        // console.log("Stats of customers bills: ", res);
        setStats(res);
      } catch (error) {
        console.log("Error fetching bills stats: ", error);
      }
    };
    getBillStats();
  }, [date, id]);

  if (loading) return <Loader />;

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
      {/* Customer Details Section */}
      <div className="mb-8 bg-yellow-50/50 p-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Customer Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <User className="text-blue-600 mt-1" size={20} />
            <div>
              <p className="text-sm text-gray-500">Licensee</p>
              <p className="font-medium text-gray-800">{licensee.licensee}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Building className="text-blue-600 mt-1" size={20} />
            <div>
              <p className="text-sm text-gray-500">Shop</p>
              <p className="font-medium text-gray-800">{licensee.shop}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Building className="text-blue-600 mt-1" size={20} />
            <div>
              <p className="text-sm text-gray-500">Firm</p>
              <p className="font-medium text-gray-800">{licensee.firm}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CreditCard className="text-blue-600 mt-1" size={20} />
            <div>
              <p className="text-sm text-gray-500">PAN</p>
              <p className="font-medium text-gray-800">{licensee.pan}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Mail className="text-blue-600 mt-1" size={20} />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">
                {licensee.email ? licensee.email : "Not provided"}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Profit Analysis Section */}
      <div className="mt-20">
        {/* <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Monthly Bills Analysis
        </h2> */}

        {/* Date Picker */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex items-center space-x-2">
            <Calendar className="text-blue-600" size={20} />
            <span className="font-medium text-lg">
              {date.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <button
            onClick={() => changeMonth(1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Stats Table */}
        <FinancialDataTable data={stats} />


        {/* Chart */}
        {/* <div className="h-64 w-full mt-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={profitData}
              margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              
              <XAxis dataKey="day" tick={{ fontSize: 12 }} interval={0}>
                <Label
                  value="Day"
                  offset={-25}
                  position="insideBottom"
                  style={{ fontSize: 14, fill: "#666" }}
                />
              </XAxis>

              <YAxis tick={{ fontSize: 12 }}>
                <Label
                  value="Profit ($)"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: "middle", fontSize: 14, fill: "#666" }}
                />
              </YAxis>

              <Tooltip formatter={(value) => [`$${value}`, "Profit"]} />
              <Bar dataKey="profit" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}

        {/* Summary */}
        {/* <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <p className="font-medium text-black">
            Total Profit for{" "}
            {date.toLocaleString("default", { month: "long", year: "numeric" })}
            :
            <span className="ml-2 font-semibold text-gray-700">
              $
              {profitData
                .reduce((sum, item) => sum + item.profit, 0)
                .toLocaleString()}
            </span>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default LicenseeDetail;
