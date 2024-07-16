import React, { useRef } from "react";
import BillComponent from "./BillComponent";
import html2pdf from "html2pdf.js";
import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { savePDF } from "@progress/kendo-react-pdf";
import { useNavigate } from "react-router-dom";
import { Add, Home, PictureAsPdfOutlined } from "@mui/icons-material";

const BillDetails = () => {
  const printRef = useRef();
  const navigate = useNavigate();
  const handleGeneratePdf = () => {
    const element = printRef.current;
    const opt = {
      margin: 10,
      pagebreak: {
        mode: ["avoid-all"],
      },
      filename: "document.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
  };

  const exportPDFWithMethod = () => {
    let element = printRef.current || document.body;
    savePDF(element, {
      paperSize: "auto",
      margin: 60,
      fileName: `Bill`,
    });
  };

  return (
    <div className="bg-white py-5">
      <div ref={printRef} id="bill-content">
        <BillComponent />
      </div>

      <div className="flex flex-col md:flex-row gap-10 justify-end   pb-20 px-20 mt-10">
        <Button
          startIcon={<Home />}
          variant="outlined"
          onClick={() => navigate("/dashboard/")}
        >
          Go Home
        </Button>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => navigate("/dashboard/select")}
        >
          New Bill
        </Button>
        {/* <Button
          startIcon={<PictureAsPdfOutlined />}
          variant="contained"
          onClick={exportPDFWithMethod}
        >
          Download PDF
        </Button> */}
        <Button
          startIcon={<PictureAsPdfOutlined />}
          variant="contained"
          onClick={handleGeneratePdf}
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default BillDetails;
