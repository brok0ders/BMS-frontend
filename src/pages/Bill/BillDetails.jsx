import React, { useRef } from "react";
import BillComponent from "./BillComponent";
import html2pdf from "html2pdf.js";
import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const BillDetails = () => {
  const printRef = useRef();

  const handleDownload = () => {
    const input = document.getElementById("bill-content");

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "WEBP", 0, 0, pdfWidth, pdfHeight);
        pdf.save("bill.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };
  // const handleGeneratePdf = () => {
  //   const element = printRef.current;
  //   const opt = {
  //     margin: 10,
  //     pagebreak: {
  //       mode: ["avoid-all", "css", "legacy"],
  //     },
  //     filename: "document.pdf",
  //     image: { type: "jpeg", quality: 1 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  //   };

  //   // New Promise-based usage:
  //   html2pdf().set(opt).from(element).save();
  // };
  return (
    <>
      {/* <PDFExport
        ref={pdfExportComponent}
        paperSize="auto"
        margin={40}
        fileName={`Report for ${new Date().getFullYear()}`}
        author="KendoReact Team"
      > */}
      <div ref={printRef} className="bg-white" id="bill-content">
        <BillComponent />
      </div>
      {/* </PDFExport> */}
      <div className="flex justify-end mt-20">
        <Button onClick={handleDownload}>Generate PDF</Button>
      </div>
    </>
  );
};

export default BillDetails;
