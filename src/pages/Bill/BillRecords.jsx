import React, { useContext, useEffect, useState } from "react";
import BillContext from "../../context/bill/billContext";
import { DataGrid } from "@mui/x-data-grid";
import "./bill.css";
import CompanyContext from "../../context/company/companyContext";
import Loader from "../../components/Layout/Loader";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";

const BillRecords = () => {
  const navigate = useNavigate();
  const { getAllBills, updateBill } = useContext(BillContext);
  const { getCompany } = useContext(CompanyContext);
  const [bills, setBills] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Function to handle cell edits (primarily for the "paid" column)
  const handleRowEdit = async (newRow, oldRow) => {
    // Log the received parameters to debug
    console.log("New Row:", newRow);
    console.log("Old Row:", oldRow);

    if (newRow.paid !== oldRow.paid) {
      try {
        setUpdateLoading(true);
        
        // Create updated row data
        const updatedRow = {
          ...newRow,
          remaining: newRow.total - newRow.paid
        };
        
        // Call API to update the bill payment in the database
        const response = await updateBill({
          id: newRow?.billId,
          paid: newRow?.paid,
        });
        
        if (response && response.success) {
          // If API call is successful, update local state
          console.log(`Successfully updated bill ${newRow.billId} with payment: ${newRow.paid}`);
          
          setUpdateLoading(false);
          return updatedRow;
        } else {
          console.error("Failed to update bill:", response?.error || "Unknown error");
          setUpdateLoading(false);
          return oldRow; // Return original row on failed API call
        }
      } catch (error) {
        console.error("Error updating bill payment:", error);
        setUpdateLoading(false);
        return oldRow; // Return original row on error
      }
    }
    
    // If no changes to paid amount, just return the new row
    return newRow;
  };
  
  const handleViewBill = (billId) => {
    navigate(`/dashboard/bill/details/${billId}`);
  };

  const columns = [
    {
      field: "sno",
      type: "number",
      headerName: "S No.",
      width: 80,
      cellClassName: "centered",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      cellClassName: "centered-cell",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "billno",
      headerName: "Bill No.",
      width: 200,
      cellClassName: "centered-cell",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lincensee",
      headerName: "Licensee",
      width: 250,
      cellClassName: "centered-cell",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Company",
      header: "Company",
      width: 250,
      cellClassName: "centered-cell",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "total",
      type: "number",
      headerName: "Total Price",
      width: 150,
      cellClassName: "centered-cell",
      align: "center",
      headerAlign: "center",
      valueFormatter: (params) => Math.round(params),
    },
    {
      field: "paid",
      type: "number",
      headerName: "Paid",
      width: 150,
      cellClassName: "centered-cell",
      align: "center",
      headerAlign: "center",
      editable: true,
      valueFormatter: (params) => Math.round(params),
    },
    {
      field: "remaining",
      type: "number",
      headerName: "Remaining",
      width: 150,
      cellClassName: "centered-cell",
      align: "center",
      headerAlign: "center",
      valueFormatter: (params) => Math.round(params),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "centered-cell",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <button
          onClick={() => handleViewBill(params.row.billId)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 rounded-md shadow-sm transition duration-200"
        >
          View bill
        </button>
      ),
    }
    
  ];

  const getBills = async () => {
    setLoading(true);
    try {
      const data = await getAllBills();
      console.log(data);
      if (data) {
        setBills(data);
        // Always recreate rows to avoid stale data
        const newRows = data.map((bill, index) => ({
          id: index + 1, // +1 to ensure id is unique and not 0-based
          sno: index + 1,
          billId: bill._id,
          date: bill.createdAt.split("T")[0],
          billno: bill?.billNo,
          lincensee: bill?.customer?.licensee,
          Company: bill?.company?.company?.name,
          total: bill?.total,
          paid: bill?.paid,
          remaining: bill?.total - bill.paid,
        }));
        setRows(newRows);
      }
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getBills();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!bills || bills.length === 0 ? (
            <>
              <div className="w-[25vw] m-auto text-center mt-[5rem]">
                <img
                  src="/images/no-data.png"
                  alt=""
                  className="w-[25vw] m-auto"
                />
                <p>NO BILLS RECORDS FOUND!</p>
              </div>
            </>
          ) : (
            <div className="w-[95%] m-auto">
              <BackButton className={"top-5 left-5"} url={"/dashboard"} />
              <DataGrid
                rows={rows}
                columns={columns}
                processRowUpdate={handleRowEdit}
                onProcessRowUpdateError={(error) => console.error("Error processing row update:", error)}
                editMode="cell"
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                disableColumnResize
                disableColumnMenu
                disableColumnSorting
                pageSizeOptions={[5, 10]}
                className="my-10"
                loading={updateLoading}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BillRecords;