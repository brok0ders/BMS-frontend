import React, { useContext, useEffect, useState } from "react";
import BillContext from "../../context/bill/billContext";
import { DataGrid } from "@mui/x-data-grid";
import "./bill.css";
import CompanyContext from "../../context/company/companyContext";
import Loader from "../../components/Layout/Loader";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";

const BillRecords = () => {
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
      headerName: "Lincensee",
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
    },
  ];
  const { getAllBills } = useContext(BillContext);
  const { getCompany } = useContext(CompanyContext);
  const [bills, setBills] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBills = async () => {
    setLoading(true);
    const data = await getAllBills();
    console.log(data);
    if (data) {
      setBills(data);
      if (rows.length == 0) {
        const newRows = data.map((bill, index) => ({
          id: index + 1, // +1 to ensure id is unique and not 0-based
          sno: index + 1,
          billId: bill._id,
          date: bill.createdAt.split("T")[0],
          billno: bill?.billNo,
          lincensee: bill?.customer?.licensee,
          Company: bill?.company?.company?.name,
          total: bill?.total,
        }));
        setRows((prevRows) => [...prevRows, ...newRows]);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    getBills();
  }, []);

  const navigate = useNavigate();

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
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                disableColumnResize
                disableColumnMenu
                disableColumnSorting
                pageSizeOptions={[5, 10]}
                onRowClick={(params) => {
                  navigate(`/dashboard/bill/details/${params.row.billId}`);
                }}
                className="my-10"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BillRecords;
