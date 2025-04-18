import { useState, useEffect, useContext } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  ComposedChart,
  Bar,
  ReferenceLine,
} from "recharts";
import BillContext from "../../../context/bill/billContext";

export default function RevenueChart() {
  const [revenueData, setRevenueData] = useState([]);
  const [activeChart, setActiveChart] = useState("line");
  const [loading, setLoading] = useState(true);
  const { getRevenueChart } = useContext(BillContext);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        const data = await getRevenueChart();

        // Keep only the original data from API
        const formattedData = data.map((item) => ({
          month: item.month,
          revenue: item.revenue,
        }));

        setRevenueData(formattedData);
      } catch (error) {
        console.error("Failed to fetch revenue data:", error);
        setRevenueData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, [getRevenueChart]);

  // Format currency values as Indian Rupees
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-80">
          <p className="text-gray-500">Loading chart data...</p>
        </div>
      );
    }

    if (revenueData.length === 0) {
      return (
        <div className="flex items-center justify-center h-80">
          <p className="text-gray-500">No revenue data available</p>
        </div>
      );
    }

    // Calculate average revenue for reference line
    const averageRevenue =
      revenueData.length > 0
        ? revenueData.reduce((sum, item) => sum + item.revenue, 0) /
          revenueData.length
        : 0;

    switch (activeChart) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              data={revenueData}
              margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#666" }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fill: "#666" }}
                width={90}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(value), "Revenue"]}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <ReferenceLine
                y={averageRevenue}
                label="Average"
                stroke="#FF8042"
                strokeDasharray="3 3"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ stroke: "#3B82F6", strokeWidth: 2, r: 5, fill: "#fff" }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={500}>
            <AreaChart
              data={revenueData}
              margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#666" }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fill: "#666" }}
                width={90}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(value), "Revenue"]}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <ReferenceLine
                y={averageRevenue}
                label="Average"
                stroke="#FF8042"
                strokeDasharray="3 3"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "composed":
        return (
          <ResponsiveContainer width="100%" height={500}>
            <ComposedChart
              data={revenueData}
              margin={{ top: 20, right: 40, left: 30, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#666" }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fill: "#666" }}
                width={90}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(value), "Revenue"]}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <ReferenceLine
                y={averageRevenue}
                label="Average"
                stroke="#FF8042"
                strokeDasharray="3 3"
              />
              <Bar
                dataKey="revenue"
                name="Revenue"
                barSize={30}
                fill="#3B82F6"
              />
              
            </ComposedChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Revenue Analytics
        </h2>
        <div className="flex space-x-2">
          <ChartButton
            active={activeChart === "line"}
            onClick={() => setActiveChart("line")}
            label="Line"
          />
          <ChartButton
            active={activeChart === "area"}
            onClick={() => setActiveChart("area")}
            label="Area"
          />
          <ChartButton
            active={activeChart === "composed"}
            onClick={() => setActiveChart("composed")}
            label="Bar+Line"
          />
        </div>
      </div>

      <div className="w-full overflow-hidden">{renderChart()}</div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(
            revenueData.reduce((sum, item) => sum + item.revenue, 0)
          )}
          color="bg-blue-50 text-blue-700"
        />
        <MetricCard
          title="Average Monthly"
          value={formatCurrency(
            revenueData.length
              ? revenueData.reduce((sum, item) => sum + item.revenue, 0) /
                  revenueData.length
              : 0
          )}
          color="bg-green-50 text-green-700"
        />
        <MetricCard
          title="Highest Month"
          value={
            revenueData.length
              ? formatCurrency(
                  Math.max(...revenueData.map((item) => item.revenue))
                )
              : "₹0"
          }
          color="bg-purple-50 text-purple-700"
        />
      </div>
    </div>
  );
}

// Helper components
function ChartButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded ${
        active
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      } transition-colors`}
    >
      {label}
    </button>
  );
}

function MetricCard({ title, value, color }) {
  return (
    <div className={`rounded-lg p-6 ${color}`}>
      <h3 className="text-sm font-medium opacity-80">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
