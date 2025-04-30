import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Print as PrintIcon } from "@mui/icons-material";
import { savePDF } from "@progress/kendo-react-pdf";

import Loader from "../../components/Layout/Loader";
import BackButton from "../../components/BackButton";
import BillContext from "../../context/bill/billContext";
import UserContext from "../../context/user/userContext";

const SupplierForm = () => {
  const { getBillsBySeller, getBrandsByBill } = useContext(BillContext);
  const { user } = useContext(UserContext);

  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [brands, setBrands] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [liquorType, setLiquorType] = useState("liquor");
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(""); // YYYY-MM
  const [supplierName, setSupplierName] = useState(""); // Store supplier name for display
  const printRef = useRef();

  // Function to format the month and year for display
  const formatMonthYear = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Format size according to requirements (750ml -> 750ml (Q))
  const formatSize = (size) => {
    if (size.includes("750")) return `${size} (Q)`;
    if (size.includes("375")) return `${size} (P)`;
    if (size.includes("180")) return `${size} (N)`;
    return size;
  };

  // Format currency with rupee symbol that will work in PDF
  const formatCurrency = (value) => {
    // Replace rupee symbol with "Rs." for PDF compatibility
    return `Rs. ${Number(value).toFixed(2)}`;
  };

  const getAllCompanies = async () => {
    if (!selectedMonth) return;
    setLoading(true);
    try {
      const res = await getBillsBySeller({
        month: selectedMonth,
        billType: liquorType,
      });
      setCompanyData(res);
      // Reset selected supplier when companies change
      setSelectedSupplier("");
      setSupplierName("");
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllBrands = async () => {
    if (!selectedSupplier) return;
    setLoading(true);
    try {
      const res = await getBrandsByBill({
        month: selectedMonth,
        billType: liquorType,
        company: selectedSupplier,
      });
      setBrands(res);

      // Find and store the supplier name for display
      const selectedCompany = companyData.find(
        (comp) => comp._id === selectedSupplier
      );
      setSupplierName(selectedCompany?.name || "");
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, [liquorType, selectedMonth]);

  useEffect(() => {
    getAllBrands();
  }, [selectedSupplier]);



  // Printing
  const handlePrint2 = () => {
    if (!printRef.current) return;
  
    // Create a temporary div that is detached from the DOM
    const pdfContainer = document.createElement("div");
    pdfContainer.style.position = "absolute";
    pdfContainer.style.left = "-9999px";
    pdfContainer.style.top = "-9999px";
  
    // Clone the table for modification specifically for PDF
    const tableClone = printRef.current.cloneNode(true);
  
    // Replace all rupee symbols in the cloned table with "Rs."
    const allCells = tableClone.querySelectorAll("td, th");
    allCells.forEach((cell) => {
      if (cell.textContent.includes("₹")) {
        cell.textContent = cell.textContent.replace(/₹/g, "Rs.");
      }
    });
  
    // Apply consistent styling to all elements
    
    // 1. Style the table headers - make all bold with bottom border
    const headerCells = tableClone.querySelectorAll("thead th");
    headerCells.forEach((cell, index) => {
      cell.style.fontWeight = "600";
      cell.style.borderBottom = "2px solid #000";
      cell.style.padding = "8px";
      cell.style.backgroundColor = "#f2f2f2";
      
      // Right-align numeric columns (index 2 and above)
      if (index >= 2) {
        cell.style.textAlign = "right";
      } else {
        cell.style.textAlign = "left";
      }
      
      // Add underline to specific header columns - Pratifal Amount and Excise Amount
      if (index === 4 || index === 6) {
        cell.style.textDecoration = "underline";
      }
    });
  
    // 2. Style table body rows and cells
    const bodyRows = tableClone.querySelectorAll("tbody tr");
    const lastRowIndex = bodyRows.length - 1; // Assuming the last row is grand total
    
    bodyRows.forEach((row, rowIndex) => {
      // Check if this is the Grand Total row
      const isGrandTotalRow = rowIndex === lastRowIndex;
      
      const cells = row.querySelectorAll("td");
      
      // Grand Total row needs special treatment
      if (isGrandTotalRow) {
        row.classList.add("grand-total");
        cells.forEach((cell) => {
          cell.style.fontWeight = "600";
          cell.style.fontSize = "16px";
          cell.style.color = "#4B4B4B";
          cell.style.borderTop = "2px solid #000";
        });
      }
      
      // Apply styling to each cell
      cells.forEach((cell, cellIndex) => {
        // Base styling for all cells
        cell.style.padding = "8px";
        cell.style.border = "1px solid #ddd";
        
        // Apply column-specific styling
        
        // Brand Name column (0) - always bold
        if (cellIndex === 0) {
          cell.style.fontWeight = "600";
          cell.style.textAlign = "left";
        }
        
        // Size column (1) - bold
        if (cellIndex === 1) {
          cell.style.fontWeight = "600";
          cell.style.textAlign = "left";
        }
        
        // Right align all numeric columns (2 and above)
        if (cellIndex >= 2) {
          cell.style.textAlign = "right";
        }
        
        // Pratifal Amount column (4) - bold
        if (cellIndex === 4) {
          cell.style.fontWeight = "600";
        }
        
        // Excise Amount column (6) - bold
        if (cellIndex === 6) {
          cell.style.fontWeight = "600";
        }
      });
    });
  
    // Add the content to the container with header information
    pdfContainer.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 14px;">${user?.name || ""}</p>
          <p style="margin: 5px 0; font-size: 14px;">${
            user?.FLliscensee || ""
          }</p>
          <h2 style="margin: 10px 0; font-size: 18px;">Supplier Analysis - ${formatMonthYear(
            selectedMonth
          )}</h2>
          <h3 style="margin: 5px 0; font-size: 16px;">Supplier: ${supplierName}</h3>
        </div>
      </div>
    `;
  
    // Append the cloned table to our container
    pdfContainer.querySelector("div").appendChild(tableClone);
  
    // Add table caption or footer if needed
    const footerDiv = document.createElement("div");
    footerDiv.style.textAlign = "center";
    footerDiv.style.marginTop = "15px";
    footerDiv.style.fontSize = "12px";
    footerDiv.style.color = "#666";
    footerDiv.textContent = `Generated on ${new Date().toLocaleDateString()}`;
    pdfContainer.querySelector("div").appendChild(footerDiv);
  
    // Temporarily add to document for PDF generation
    document.body.appendChild(pdfContainer);
  
    // PDF generation options
    const options = {
      margin: 10,
      pagebreak: {
        mode: ["avoid-all"],
      },
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
      },
      jsPDF: {
        unit: "mm",
        format: "a3",
        orientation: "portrait",
        compress: true,
      },
      fileName: `Supplier_Analysis_${selectedMonth}_${supplierName.replace(
        /\s+/g,
        "_"
      )}.pdf`,
    };
  
    // Save the PDF
    savePDF(pdfContainer, options)
      .then(() => {
        console.log("PDF generated successfully");
        // Remove the temporary element after PDF is generated
        document.body.removeChild(pdfContainer);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        // Remove the temporary element even if there's an error
        if (document.body.contains(pdfContainer)) {
          document.body.removeChild(pdfContainer);
        }
      });
  };

  

  const handlePrint = () => {
    if (!printRef.current) return;

    const printWindow = window.open("", "_blank");

    // Create a filename for the PDF
    const fileName = `Supplier_Analysis_${selectedMonth}_${supplierName.replace(
      /\s+/g,
      "_"
    )}.pdf`;

    printWindow.document.write(`
      <html>
        <head>
          <title>Supplier wise Analysis</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              padding: 0;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header p {
              margin: 5px 0;
              font-size: 14px;
            }
            .header h2 {
              margin: 10px 0;
              font-size: 18px;
            }
            .header h3 {
              margin: 5px 0;
              font-size: 16px;
            }
            table { 
              border-collapse: collapse; 
              width: 100%; 
              margin-top: 20px;
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px;
            }
            th { 
              background-color: #f2f2f2; 
              font-weight: 600;
              border-bottom: 2px solid #000;
              text-align: left;
            }
            td {
              text-align: left; /* Default alignment */
            }
            .right-aligned {
              text-align: right !important;
            }
            /* Specific column styling - note these use col not td for better targeting */
            .brand-name {
              font-weight: 600;
            }
            .size {
              font-weight: 600;
            }
            .pratifal-amount {
              font-weight: 600;
            }
            .excise-amount {
              font-weight: 600;
            }
            /* Grand total row styling */
            .grand-total td {
              font-weight: 600;
              font-size: 16px;
              color: #4B4B4B;
              border-top: 2px solid #000;
            }
            /* Underlined headers */
            .underlined {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <p>${user?.name || ""}</p>
            <p>${user?.FLliscensee || ""}</p>
            <h2>Supplier Analysis - ${formatMonthYear(selectedMonth)}</h2>
            <h3>Supplier: ${supplierName}</h3>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Brand Name</th>
                <th>Size</th>
                <th class="right-aligned">Quantity</th>
                <th class="right-aligned">Pratifal (Rs.)</th>
                <th class="right-aligned underlined">Pratifal Amount (Rs.)</th>
                <th class="right-aligned">Excise (Rs.)</th>
                <th class="right-aligned underlined">Excise Amount (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              ${brands
                .map((brand, brandIndex) =>
                  brand.sizes
                    .map(
                      (size, sizeIndex) => `
                  <tr>
                    ${
                      sizeIndex === 0
                        ? `<td class="brand-name" rowspan="${brand.sizes.length}">${brand.brandName}</td>`
                        : ""
                    }
                    <td class="size">${formatSize(size.size)}</td>
                    <td class="right-aligned">${size.quantity}</td>
                    <td class="right-aligned">${size.pratifal.toFixed(2)}</td>
                    <td class="pratifal-amount right-aligned">${(
                      size.quantity * size.pratifal
                    ).toFixed(2)}</td>
                    <td class="right-aligned">${size.excise.toFixed(2)}</td>
                    <td class="excise-amount right-aligned">${(
                      size.quantity * size.excise
                    ).toFixed(2)}</td>
                  </tr>
                `
                    )
                    .join("")
                )
                .join("")}
              
              <tr class="grand-total">
                <td colspan="2">GRAND TOTAL</td>
                <td class="right-aligned">${totalQuantity}</td>
                <td class="right-aligned"></td>
                <td class="right-aligned">${totalPratifalAmount.toFixed(2)}</td>
                <td class="right-aligned"></td>
                <td class="right-aligned">${totalExciseAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Add a small delay to ensure styles are applied before printing
    setTimeout(() => {
      printWindow.print();
      // Don't close the window immediately so the user can see print dialog
    }, 500);
  };

  const calculateTotals = () => {
    let totalQuantity = 0;
    let totalPratifal = 0;
    let totalPratifalAmount = 0;
    let totalExcise = 0;
    let totalExciseAmount = 0;

    brands.forEach((brand) => {
      brand.sizes.forEach((size) => {
        totalQuantity += size.quantity;
        totalPratifal += size.pratifal;
        totalPratifalAmount += size.quantity * size.pratifal;
        totalExcise += size.excise;
        totalExciseAmount += size.quantity * size.excise;
      });
    });

    return {
      totalQuantity,
      totalPratifal,
      totalPratifalAmount,
      totalExcise,
      totalExciseAmount,
    };
  };

  const {
    totalQuantity,
    totalPratifal,
    totalPratifalAmount,
    totalExcise,
    totalExciseAmount,
  } = calculateTotals();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          noValidate
          autoComplete="off"
          className="py-0 pb-10 px-10 md:py-0 md:px-20"
        >
          <BackButton className="top-4 left-2 md:top-16 md:left-2" />
          <h1 className="text-2xl sm:text-3xl md:text-5xl text-center font-bold text-slate-700 px-2 py-2 m-2 sm:m-4">
            Supplier wise Analysis
          </h1>

          {selectedMonth && (
            <h2 className="text-xl text-center font-semibold text-slate-600 mb-4">
              {formatMonthYear(selectedMonth)}
              {supplierName && ` - ${supplierName}`}
            </h2>
          )}

          <Box className="px-3 py-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-10">
            {/* Month Picker */}
            <TextField
              fullWidth
              label="Select Month"
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Liquor Type */}
            <FormControl fullWidth>
              <InputLabel id="liquor-beer-label">Type</InputLabel>
              <Select
                labelId="liquor-beer-label"
                id="liquor-beer-select"
                value={liquorType}
                label="Type"
                onChange={(e) => setLiquorType(e.target.value)}
              >
                <MenuItem value="liquor">Liquor</MenuItem>
                <MenuItem value="beer">Beer</MenuItem>
              </Select>
            </FormControl>

            {/* Supplier */}
            <FormControl fullWidth>
              <InputLabel id="supplier-label">Supplier</InputLabel>
              <Select
                labelId="supplier-label"
                id="supplier-select"
                value={selectedSupplier}
                label="Supplier"
                onChange={(e) => setSelectedSupplier(e.target.value)}
                required
              >
                {companyData?.map((supp, index) => (
                  <MenuItem key={index} value={supp?._id}>
                    {supp?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Brands Data Table */}
          {brands.length > 0 && (
            <Box className="mt-8">
              <Box className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-700">
                  Brands Analysis
                </h2>
                <Button
                  variant="contained"
                  startIcon={<PrintIcon />}
                  onClick={handlePrint}
                  color="primary"
                >
                  Print Report
                </Button>
              </Box>

              <TableContainer component={Paper} className="mb-8" ref={printRef}>
                <Table sx={{ minWidth: 850 }} aria-label="brands table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Brand Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Size</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="right">
                        Quantity
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="right">
                        Pratifal (Rs.)
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 600, textDecoration: "underline" }}
                        align="right"
                      >
                        Pratifal Amount (Rs.)
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="right">
                        Excise (Rs.)
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 600, textDecoration: "underline" }}
                        align="right"
                      >
                        Excise Amount (Rs.)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {brands.map((brand, brandIndex) =>
                      brand.sizes.map((size, sizeIndex) => (
                        <TableRow key={`${brandIndex}-${sizeIndex}`}>
                          {sizeIndex === 0 ? (
                            <TableCell
                              rowSpan={brand.sizes.length}
                              sx={{ fontWeight: 600 }}
                            >
                              {brand.brandName}
                            </TableCell>
                          ) : null}
                          <TableCell sx={{ fontWeight: 600 }}>
                            {formatSize(size.size)}
                          </TableCell>
                          <TableCell align="right">{size.quantity}</TableCell>
                          <TableCell align="right">
                            {size.pratifal.toFixed(2)}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            {(size.quantity * size.pratifal).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {size.excise.toFixed(2)}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            {(size.quantity * size.excise).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}

                    {/* Grand Total row - made more prominent */}
                    <TableRow
                      sx={{
                        color: "black",
                        "& td": {
                          fontWeight: 600,
                          fontSize: "1rem",
                          color: "#4B4B4B",
                        },
                      }}
                    >
                      <TableCell colSpan={2}>GRAND TOTAL</TableCell>
                      <TableCell align="right">{totalQuantity}</TableCell>
                      <TableCell align="right">
                        {/* {totalPratifal.toFixed(2)} */}
                      </TableCell>
                      <TableCell align="right">
                        {totalPratifalAmount.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {/* {totalExcise.toFixed(2)} */}
                      </TableCell>
                      <TableCell align="right">
                        {totalExciseAmount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default SupplierForm;
