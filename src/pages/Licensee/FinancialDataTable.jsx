import React, { useState, useMemo, useRef } from "react";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  DollarSign,
  TrendingUp,
  ArrowUpDown,
  Download,
  Printer,
  BarChart3,
  LineChart as LineChartIcon,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Sample data (you would replace this with your actual data)
const sampleData = [
  {
    date: "2025-04-11T00:00:00.000Z",
    fexcise: 8955.9,
    pratifal: 44.699999999999996,
    tcs: 156.0744992,
    total: 15763.52,
  },
  {
    date: "2025-04-10T00:00:00.000Z",
    fexcise: 7855.9,
    pratifal: 38.5,
    tcs: 142.3744992,
    total: 14763.52,
  },
  {
    date: "2025-04-09T00:00:00.000Z",
    fexcise: 9255.9,
    pratifal: 52.8,
    tcs: 168.4744992,
    total: 16963.52,
  },
  {
    date: "2025-04-08T00:00:00.000Z",
    fexcise: 8455.9,
    pratifal: 41.2,
    tcs: 149.8744992,
    total: 15263.52,
  },
];

function FinancialDataTable({ data = sampleData }) {
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showChart, setShowChart] = useState(true);
  const [visibleLines, setVisibleLines] = useState({
    fexcise: true,
    pratifal: true,
    tcs: true,
    total: true,
  });
  const tableRef = useRef(null);
  const contentRef = useRef(null);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Sort data
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (sortField === "date") {
        const dateA = new Date(a[sortField]).getTime();
        const dateB = new Date(b[sortField]).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        const valueA = a[sortField];
        const valueB = b[sortField];
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }
    });
  }, [data, sortField, sortDirection]);

  // Prepare chart data - sort chronologically for charts regardless of table sort
  const chartData = useMemo(() => {
    return [...data]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((item) => ({
        ...item,
        formattedDate: formatDate(item.date),
      }));
  }, [data]);

  // Calculate totals
  const totals = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        acc.fexcise += item.fexcise;
        acc.pratifal += item.pratifal;
        acc.tcs += item.tcs;
        acc.total += item.total;
        return acc;
      },
      { fexcise: 0, pratifal: 0, tcs: 0, total: 0 }
    );
  }, [data]);

  // Get trend indicator for display in the table
  const getTrendIndicator = (current, index) => {
    if (index === 0 || !data[index - 1]) return null;

    const previous =
      sortField === "fexcise"
        ? data[index - 1].fexcise
        : sortField === "pratifal"
        ? data[index - 1].pratifal
        : sortField === "tcs"
        ? data[index - 1].tcs
        : sortField === "total"
        ? data[index - 1].total
        : 0;

    if (current > previous) {
      return <ArrowUp className="h-5 w-5 text-green-600" />;
    } else if (current < previous) {
      return <ArrowDown className="h-5 w-5 text-red-600" />;
    }
    return null;
  };

  // Toggle visibility of chart lines
  const toggleLine = (dataKey) => {
    setVisibleLines((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }));
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded shadow border border-gray-200">
          <p className="font-semibold text-gray-800 text-sm">{label}</p>
          <div className="space-y-1 mt-2">
            {payload.map((entry, index) => (
              <p
                key={index}
                style={{ color: entry.color }}
                className="text-sm font-semibold"
              >
                <span className="text-black">{entry.name}</span>:{" "}
                {entry.name === "pratifal" || entry.name === "tcs"
                  ? entry.value.toFixed(2)
                  : entry.value.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Function to download table as PDF with fixed styling
  const downloadTablePDF = () => {
    if (contentRef.current) {
      // Create a new style element to ensure PDF styling
      const style = document.createElement("style");
      style.textContent = `
        .pdf-container { font-family: Arial, sans-serif; }
        .pdf-title { text-align: center; font-size: 24px; margin: 20px 0; color: #333; }
        .pdf-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .pdf-table th { background-color: #f3f4f6; padding: 10px; text-align: left; font-weight: bold; border-bottom: 2px solid #ddd; }
        .pdf-table td { padding: 10px; border-bottom: 1px solid #eee; }
        .pdf-table tfoot td { font-weight: bold; background-color: #f3f4f6; }
        .pdf-total { font-weight: bold; }
        .pdf-timestamp { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
      `;

      // Create PDF content container
      const container = document.createElement("div");
      container.className = "pdf-container";
      container.appendChild(style);

      // Add title
      const title = document.createElement("h2");
      title.className = "pdf-title";
      title.textContent = "Financial Transactions";
      container.appendChild(title);

      // Create table for PDF
      const table = document.createElement("table");
      table.className = "pdf-table";

      // Create table header
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");

      const headers = ["Date", "Excise", "Pratifal", "TCS", "Total"];
      headers.forEach((headerText) => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
      });

      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Create table body
      const tbody = document.createElement("tbody");
      sortedData.forEach((item) => {
        const row = document.createElement("tr");

        // Date cell
        const dateCell = document.createElement("td");
        dateCell.textContent = formatDate(item.date);
        row.appendChild(dateCell);

        // Financial values cells
        const createValueCell = (value) => {
          const cell = document.createElement("td");
          cell.textContent = formatCurrency(value);
          return cell;
        };

        row.appendChild(createValueCell(item.fexcise));
        row.appendChild(createValueCell(item.pratifal));
        row.appendChild(createValueCell(item.tcs));

        // Total cell with bold but no color
        const totalCell = document.createElement("td");
        const totalSpan = document.createElement("span");
        totalSpan.className = "pdf-total";
        totalSpan.textContent = formatCurrency(item.total);
        totalCell.appendChild(totalSpan);
        row.appendChild(totalCell);

        tbody.appendChild(row);
      });

      table.appendChild(tbody);

      // Create table footer
      const tfoot = document.createElement("tfoot");
      const footerRow = document.createElement("tr");

      const totalLabelCell = document.createElement("td");
      totalLabelCell.textContent = "Totals";
      footerRow.appendChild(totalLabelCell);

      // Footer financial values
      footerRow.appendChild(createValueCell(totals.fexcise));
      footerRow.appendChild(createValueCell(totals.pratifal));
      footerRow.appendChild(createValueCell(totals.tcs));

      // Total footer cell - bold but no color
      const totalFooterCell = document.createElement("td");
      const totalFooterSpan = document.createElement("span");
      totalFooterSpan.className = "pdf-total";
      totalFooterSpan.textContent = formatCurrency(totals.total);
      totalFooterCell.appendChild(totalFooterSpan);
      footerRow.appendChild(totalFooterCell);

      function createValueCell(value) {
        const cell = document.createElement("td");
        cell.textContent = formatCurrency(value);
        return cell;
      }

      tfoot.appendChild(footerRow);
      table.appendChild(tfoot);

      container.appendChild(table);

      // Add formatted timestamp with proper locale formatting
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const timestamp = document.createElement("p");
      timestamp.className = "pdf-timestamp";
      timestamp.textContent = `Generated on ${formattedDate} at ${formattedTime}`;
      container.appendChild(timestamp);

      // Generate PDF with fixed styling
      import("html2pdf.js")
        .then((html2pdfModule) => {
          const html2pdf = html2pdfModule.default || html2pdfModule;

          const options = {
            margin: 15,
            filename: "financial_transactions.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
          };

          html2pdf().from(container).set(options).save();
        })
        .catch((error) => {
          console.error("Error loading html2pdf:", error);
          alert(
            "PDF export library could not be loaded. Please make sure html2pdf.js is installed."
          );
        });
    }
  };

  // Generate CSV content for download
  const generateCSV = () => {
    const headers = ["Date", "Excise", "Pratifal", "TCS", "Total"];
    const dataRows = sortedData.map((item) => [
      formatDate(item.date),
      item.fexcise,
      item.pratifal,
      item.tcs,
      item.total,
    ]);

    // Add totals row
    dataRows.push([
      "TOTALS",
      totals.fexcise,
      totals.pratifal,
      totals.tcs,
      totals.total,
    ]);

    // Combine headers and data
    const csvContent = [
      headers.join(","),
      ...dataRows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  };

  // Handle CSV download
  const handleDownloadCSV = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    // Create a download link
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "financial_data.csv");
    link.style.visibility = "hidden";

    // Add to DOM, trigger click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-xl overflow-hidden"
      ref={contentRef}
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
              <DollarSign className="h-6 w-6 md:h-7 md:w-7 mr-2 text-blue-600" />
              Financial Transactions
            </h2>
            <p className="text-gray-800 mt-2 text-base md:text-md">
              Showing {data.length} transactions with a total value of{" "}
              {formatCurrency(totals.total)}
            </p>
          </div>

          {/* Export and view toggle buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowChart(!showChart)}
              className={`flex items-center px-3 py-1 ${
                showChart ? "bg-green-600" : "bg-gray-600"
              } text-white rounded-md hover:opacity-90 transition-colors shadow-md`}
              aria-label="Toggle Chart View"
            >
              {showChart ? (
                <BarChart3 className="h-5 w-5 mr-2" />
              ) : (
                <LineChartIcon className="h-5 w-5 mr-2" />
              )}
              <span className="font-medium">
                {showChart ? "Hide Chart" : "Show Chart"}
              </span>
            </button>
            <button
              onClick={downloadTablePDF}
              className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md"
              aria-label="Download PDF"
            >
              <Printer className="h-5 w-5 mr-2" />
              <span className="font-medium">Download PDF</span>
            </button>
            <button
              onClick={handleDownloadCSV}
              className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md"
              aria-label="Download CSV"
            >
              <Download className="h-5 w-5 mr-2" />
              <span className="font-medium">Download CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      {showChart && (
        <div className="border-b border-gray-200">
          <div className="p-4 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Financial Metrics Comparison
            </h3>

            {/* Chart Toggle Controls */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => toggleLine("fexcise")}
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                  visibleLines.fexcise
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Excise</span>
              </button>
              <button
                onClick={() => toggleLine("pratifal")}
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                  visibleLines.pratifal
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Pratifal</span>
              </button>
              <button
                onClick={() => toggleLine("tcs")}
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                  visibleLines.tcs
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>TCS</span>
              </button>
              <button
                onClick={() => toggleLine("total")}
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                  visibleLines.total
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Total</span>
              </button>
            </div>
          </div>

          {/* Chart Container - Responsive with fixed height */}
          <div
            className="relative"
            style={{ height: "350px", marginTop: "20px", marginBottom: "5px" }}
          >
            <div className="absolute inset-0 overflow-x-auto">
              <div
                style={{
                  minWidth: Math.max(600, chartData.length * 200) + "px",
                  height: "100%",
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis
                      dataKey="formattedDate"
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                    />
                    <YAxis
                      yAxisId="left"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) =>
                        value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value
                      }
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      domain={[0, 200]}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />

                    {visibleLines.fexcise && (
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="fexcise"
                        name="Excise"
                        stroke="#3b82f6"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    )}
                    {visibleLines.total && (
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="total"
                        name="Total"
                        stroke="#ef4444"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    )}
                    {visibleLines.pratifal && (
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="pratifal"
                        name="Pratifal"
                        stroke="#22c55e"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    )}
                    {visibleLines.tcs && (
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="tcs"
                        name="TCS"
                        stroke="#a855f7"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="px-6 py-2 text-center text-xs text-gray-500 bg-gray-50 mb-10">
            Scroll horizontally if chart is not fully visible. Click on legend
            items to toggle metrics.
          </div>
        </div>
      )}

      {/* Table container with ref for table access */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" ref={tableRef}>
          <thead>
            <tr className="bg-gray-100">
              <th
                className="px-5 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date
                  {sortField === "date" ? (
                    sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-1" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th
                className="px-5 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort("bills")}
              >
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Bills
                  {sortField === "bills" ? (
                    sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-1" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th
                className="px-5 py-3 text-right font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort("fexcise")}
              >
                <div className="flex items-center justify-end">
                  Excise
                  {sortField === "fexcise" ? (
                    sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-1" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th
                className="px-5 py-3 text-right font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort("pratifal")}
              >
                <div className="flex items-center justify-end">
                  Pratifal
                  {sortField === "pratifal" ? (
                    sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-1" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th
                className="px-5 py-3 text-right font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort("tcs")}
              >
                <div className="flex items-center justify-end">
                  TCS
                  {sortField === "tcs" ? (
                    sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-1" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th
                className="px-5 py-3 text-right font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort("total")}
              >
                <div className="flex items-center justify-end">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Total
                  {sortField === "total" ? (
                    sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-1" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((item, index) => (
              <tr key={index} className="hover:bg-blue-50 transition-colors">
                <td className="px-5 py-3 whitespace-nowrap font-medium text-gray-800">
                  {formatDate(item.date)}
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-gray-700">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{item?.billCount}</span>
                    <div className="flex">
                      {Array.from({ length: Math.min(item?.billCount, 5) }).map(
                        (_, i) => (
                          <div
                            key={i}
                            className={`h-3 w-1.5 mx-px rounded-sm ${
                              i < Math.min(item?.billCount, 5)
                                ? "bg-blue-500"
                                : "bg-gray-200"
                            }`}
                          />
                        )
                      )}
                      {item?.billCount > 5 && (
                        <span className="text-xs text-gray-500 ml-1">
                          +{item?.billCount - 5}
                        </span>
                      )}
                    </div>
                    {getTrendIndicator(item?.billCount, index, "bills")}
                  </div>
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-right font-medium text-gray-800">
                  <div className="flex items-center justify-end">
                    <span className="tabular-nums">
                      {formatCurrency(item.fexcise)}
                    </span>
                    <span className="ml-1">
                      {getTrendIndicator(item.fexcise, index)}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-right font-medium text-gray-800">
                  <div className="flex items-center justify-end">
                    <span className="tabular-nums">
                      {formatCurrency(item.pratifal)}
                    </span>
                    <span className="ml-1">
                      {getTrendIndicator(item.pratifal, index)}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-right font-medium text-gray-800">
                  <div className="flex items-center justify-end">
                    <span className="tabular-nums">
                      {formatCurrency(item.tcs)}
                    </span>
                    <span className="ml-1">
                      {getTrendIndicator(item.tcs, index)}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end">
                    <span className="inline-flex px-3 py-1 rounded-md bg-blue-50 text-blue-800 font-medium tabular-nums">
                      {formatCurrency(item.total)}
                    </span>
                    <span className="ml-1">
                      {getTrendIndicator(item.total, index)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100">
              <td className="px-5 py-3 whitespace-nowrap font-semibold text-gray-900">
                Totals
              </td>
              <td className="px-5 py-3 whitespace-nowrap font-semibold text-gray-900">
                {totals?.billCount}
              </td>
              <td className="px-5 py-3 whitespace-nowrap text-right font-semibold text-gray-900 tabular-nums">
                {formatCurrency(totals.fexcise)}
              </td>
              <td className="px-5 py-3 whitespace-nowrap text-right font-semibold text-gray-900 tabular-nums">
                {formatCurrency(totals.pratifal)}
              </td>
              <td className="px-5 py-3 whitespace-nowrap text-right font-semibold text-gray-900 tabular-nums">
                {formatCurrency(totals.tcs)}
              </td>
              <td className="px-5 py-3 whitespace-nowrap text-right">
                <span className="inline-flex px-3 py-1 rounded-md bg-green-100 text-gray-800 font-semibold tabular-nums">
                  {formatCurrency(totals.total)}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default FinancialDataTable;
