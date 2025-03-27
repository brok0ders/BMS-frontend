import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import { useParams } from "react-router-dom";
import ClContext from "../../context/cl/clContext";

const BillComponent = () => {
  const [basePrices, setBasePrices] = useState({});
  const { getAllCL } = useContext(ClContext);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [taxesData, setTaxesData] = useState({});

  const NumberToWordsConverter = (n) => {
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (n === 0) return "Zero";

    function convertLessThanThousand(num) {
      if (num === 0) return "";

      let str = "";
      if (num >= 100) {
        str += units[Math.floor(num / 100)] + " Hundred ";
        num %= 100;
      }

      if (num >= 20) {
        str += tens[Math.floor(num / 10)] + " ";
        num %= 10;
      }

      if (num >= 10) {
        str += teens[num - 10] + " ";
      } else if (num > 0) {
        str += units[num] + " ";
      }

      return str.trim();
    }

    let result = "";
    let crore = Math.floor(n / 10000000);
    let lakhs = Math.floor((n % 10000000) / 100000);
    let thousands = Math.floor((n % 100000) / 1000);
    let hundreds = Math.floor(n % 1000);

    if (crore > 0) {
      result += convertLessThanThousand(crore) + " Crore ";
    }
    if (lakhs > 0) {
      result += convertLessThanThousand(lakhs) + " Lakh ";
    }
    if (thousands > 0) {
      result += convertLessThanThousand(thousands) + " Thousand ";
    }
    if (hundreds > 0) {
      result += convertLessThanThousand(hundreds);
    }

    return result.trim() + " Rupees";
  };
  useEffect(() => {
    const fetchBasePrices = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        };
        const { data: data1 } = await API.get(`/bill/${id}`, config);
        setData(data1?.bill);

        const basePricesTemp = {};
        for (const product of data1?.bill.products) {
          const response = await getAllCL();

          // Find the matching company/brand in the response
          const matchingCompany = response.cl.find(
            (company) => company.brandName === product.brand
          );

          if (matchingCompany) {
            basePricesTemp[product.brand] = matchingCompany.stock;
          }
        }

        const taxData = recalculateTaxes(data1?.bill.products, basePricesTemp);

        setTaxesData(taxData);
        setBasePrices(basePricesTemp);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBasePrices();
  }, []);

  const processedProducts =
    data &&
    data?.products?.map((product) => {
      const sizesObject = {};
      product.sizes.forEach((size) => {
        sizesObject[size.size] = { quantity: size.quantity, price: size.price };
      });
      return { ...product, sizes: sizesObject };
    });

  const allSizes = Array.from(
    new Set(
      data?.products?.flatMap((product) =>
        product.sizes.map((size) => size.size)
      )
    )
  );

  const calculateTotalAmount = (product) => {
    return Object.values(product.sizes).reduce((total, size) => {
      return total + size.price;
    }, 0);
  };

  function calculateTotalQuantities(products) {
    return products.reduce((total, product) => {
      const productTotal = product.sizes.reduce(
        (sum, size) => sum + size.quantity,
        0
      );
      return total + productTotal;
    }, 0);
  }

  const recalculateTaxes = (products, brandsDetails) => {
    let totalQuantity = 0;
    let total = 0;
    let totalPratifal = 0;
    let totalWep = 0;
    let totalProfit = 0;
    let totalHologram = 0;

    products.forEach((product) => {
      const brandDetails = brandsDetails[product.brand];

      product.sizes.forEach((size) => {
        const sizeDetail = brandDetails?.find((s) => s.size === size.size);

        if (sizeDetail) {
          const quantity = size.quantity;
          const totalSizePrice = size.price;

          const pratifal = sizeDetail.pratifal * quantity;
          const wep = sizeDetail.wep * quantity;
          const profit = sizeDetail.profit * quantity;
          const hologram = 0.25 * quantity;

          totalQuantity += quantity;
          total += totalSizePrice;
        }
      });
    });

    const taxTotal = total;
    const tcs = (taxTotal * 1) / 100;
    const grandTotal = taxTotal + tcs;

    return {
      totalQuantity,
      total,

      taxTotal,
      tcs,
      grandTotal,
    };
  };

  const tableCellStyle = {
    border: "1px solid black",
    fontWeight: "700",
    fontSize: "12px",
    background: "#FFFFFF",
    color: "black",
  };
  return (
    <>
      {loading && (
        <div className="flex h-screen text-2xl justify-center items-center">
          Loading...
        </div>
      )}
      {!loading && !data && (
        <div className="flex h-screen justify-center items-center">
          Bill Data Not Found
        </div>
      )}
      {data && data.seller && (
        <div className="p-1">
          {/* Old tabular Structure */}

          <TableContainer className="">
            <Table
              borderAxis="both"
              sx={{
                minWidth: 650,
                border: "1px solid black",
                color: "black",
              }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 3 + 3}
                    sx={tableCellStyle}
                    align="center"
                  >
                    <h1 className="text-2xl !font-bold">
                      {data?.seller?.name}{" "}
                    </h1>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 3 + 3}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Address: {data?.seller?.address}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 3 + 3}
                    sx={tableCellStyle}
                    align="center"
                  >
                    FL-2 Licensee: {data?.seller?.FLliscensee}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 3 + 3}
                    sx={tableCellStyle}
                    align="center"
                  >
                    FL-2 GODOWN: {data?.seller?.addressGodown}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 3}
                    sx={tableCellStyle}
                    align="center"
                  ></TableCell>
                  <TableCell
                    className="!font-bold"
                    colSpan={4}
                    sx={tableCellStyle}
                    align="center"
                  >
                    TIN No.: {data?.seller?.TINno}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={tableCellStyle}
                    colSpan={allSizes.length * 3}
                  ></TableCell>
                  <TableCell
                    className="!font-bold"
                    colSpan={4}
                    sx={tableCellStyle}
                    align="center"
                  >
                    PAN No. : {data?.seller?.PANno}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 1 + 2}
                    sx={tableCellStyle}
                    align="left"
                  >
                    Bill No.: {data?.billNo}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 1 + 2}
                    sx={tableCellStyle}
                    align="left"
                  >
                    Licensee: {data?.customer.licensee}
                  </TableCell>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 2 + 1}
                    sx={tableCellStyle}
                    align="left"
                  >
                    Excise FL 36 No.: {data?.excise}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 1 + 2}
                    sx={tableCellStyle}
                    align="left"
                  >
                    Shop: {data?.customer?.shop}
                  </TableCell>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 1 + 1}
                    sx={tableCellStyle}
                    align="left"
                  >
                    P.No.: {data?.pno}
                  </TableCell>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 1}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Date:{" "}
                    {new Date(data?.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 1 + 2}
                    sx={tableCellStyle}
                    align="left"
                  >
                    Firm: {data?.customer?.firm}
                  </TableCell>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 2 + 1}
                    sx={tableCellStyle}
                    align="center"
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 1 + 2}
                    sx={tableCellStyle}
                    align="left"
                  >
                    PAN No.: {data?.customer?.pan}
                  </TableCell>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 2 + 1}
                    sx={tableCellStyle}
                    align="center"
                  ></TableCell>
                </TableRow>
              </TableHead>
              {/* Table */}
              <TableHead>
                <TableRow scope="row">
                  <TableCell sx={tableCellStyle}>S.No.</TableCell>
                  <TableCell sx={tableCellStyle}>Brand Name</TableCell>
                  <TableCell
                    sx={tableCellStyle}
                    align="center"
                    colSpan={allSizes.length}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    sx={tableCellStyle}
                    align="center"
                    colSpan={allSizes.length}
                  >
                    Rate (In case)
                  </TableCell>
                  <TableCell
                    sx={tableCellStyle}
                    align="center"
                    colSpan={allSizes.length}
                  >
                    Amount
                  </TableCell>
                  <TableCell sx={tableCellStyle}>Total</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={tableCellStyle}></TableCell>
                  <TableCell sx={tableCellStyle}></TableCell>
                  {allSizes.map((size) => (
                    <TableCell
                      sx={tableCellStyle}
                      key={`qty-${size}`}
                      align="center"
                    >
                      {size === "750ml"
                        ? "Q"
                        : size === "375ml"
                        ? "P"
                        : size === "180ml"
                        ? "N"
                        : size}
                    </TableCell>
                  ))}
                  {allSizes.map((size) => (
                    <TableCell
                      sx={tableCellStyle}
                      key={`price-${size}`}
                      align="center"
                    >
                      {size === "750ml"
                        ? "Q"
                        : size === "375ml"
                        ? "P"
                        : size === "180ml"
                        ? "N"
                        : size}
                    </TableCell>
                  ))}
                  {allSizes.map((size) => (
                    <TableCell
                      sx={tableCellStyle}
                      key={`price-${size}`}
                      align="center"
                    >
                      {size === "750ml"
                        ? "Q"
                        : size === "375ml"
                        ? "P"
                        : size === "180ml"
                        ? "N"
                        : size}
                    </TableCell>
                  ))}
                  <TableCell sx={tableCellStyle}></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {processedProducts.length > 0 &&
                  processedProducts.map((p, i) => {
                    const totalAmount = allSizes.reduce(
                      (total, size) =>
                        total +
                        (p.sizes[size]?.quantity * p.sizes[size]?.price || 0),
                      0
                    );
                    return (
                      <TableRow key={i}>
                        <TableCell sx={tableCellStyle}>{i + 1}</TableCell>
                        <TableCell sx={tableCellStyle}>{p.brand}</TableCell>
                        {allSizes.map((size) => (
                          <TableCell
                            sx={tableCellStyle}
                            key={`qty-${size}-${i}`}
                            align="center"
                          >
                            {p.sizes[size]?.quantity || 0}
                          </TableCell>
                        ))}
                        {allSizes.map((size) => (
                          <TableCell
                            sx={tableCellStyle}
                            key={`rate-${size}-${i}`}
                            align="center"
                          >
                            {basePrices[p.brand]?.find((s) => s.size === size)
                              ?.price || "0"}
                          </TableCell>
                        ))}
                        {allSizes.map((size) => (
                          <TableCell
                            sx={tableCellStyle}
                            key={`price-${size}-${i}`}
                            align="center"
                          >
                            {p.sizes[size]?.price.toFixed(2) || "0"}
                          </TableCell>
                        ))}
                        <TableCell sx={tableCellStyle} align="center">
                          {calculateTotalAmount(p).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={2}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Total
                  </TableCell>
                  {allSizes.map((size) => (
                    <TableCell
                      sx={tableCellStyle}
                      key={`qty-total-${size}`}
                      align="center"
                    >
                      {processedProducts.reduce(
                        (acc, p) => acc + (p.sizes[size]?.quantity || 0),
                        0
                      )}
                    </TableCell>
                  ))}
                  {allSizes.map((size) => (
                    <TableCell
                      sx={tableCellStyle}
                      key={`rate-total-${size}`}
                      align="center"
                    ></TableCell>
                  ))}
                  {allSizes.map((size) => (
                    <TableCell
                      sx={tableCellStyle}
                      key={`price-total-${size}`}
                      align="center"
                    >
                      {processedProducts
                        .reduce(
                          (acc, p) =>
                            parseFloat(acc) +
                            parseFloat(p.sizes[size]?.price || 0),
                          0
                        )
                        .toFixed(2)}
                    </TableCell>
                  ))}

                  <TableCell
                    sx={tableCellStyle}
                    align="center"
                    className="!font-bold"
                  >
                    {processedProducts
                      .reduce((acc, p) => acc + calculateTotalAmount(p), 0)
                      .toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={2}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Total cases
                  </TableCell>
                  <TableCell
                    sx={tableCellStyle}
                    className="!font-bold"
                    align="center"
                    colSpan={allSizes.length}
                  >
                    {calculateTotalQuantities(data?.products)}
                  </TableCell>
                </TableRow>
                {/* Taxes */}

                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 3 + 2}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Total
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    {taxesData?.taxTotal?.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 3 + 2}
                    sx={tableCellStyle}
                    align="center"
                  >
                    TCS @ 1%
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    {taxesData?.tcs?.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 3 + 2}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Total
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    {taxesData?.grandTotal?.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 3 + 2}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Grand Total
                  </TableCell>
                  <TableCell
                    sx={tableCellStyle}
                    align="center"
                    className="!font-bold"
                  >
                    {Math.round(taxesData?.grandTotal)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    className="!font-bold !py-3"
                    colSpan={allSizes.length * 2 + 2}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Amounts Chargeable (in words) -{" "}
                    {NumberToWordsConverter(Math.round(taxesData?.grandTotal))}
                  </TableCell>
                  <TableCell
                    sx={tableCellStyle}
                    colSpan={allSizes?.length + 1}
                    align="center"
                    className="!font-bold !py-3"
                  >
                    E.& O.E
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold "
                    colSpan={allSizes.length * 2 + 2}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Declaration - We declare that this invoice shows the actual
                    price of the goods described and that all particulars are
                    true and correct.
                  </TableCell>
                  <TableCell
                    sx={tableCellStyle}
                    colSpan={allSizes?.length + 1}
                    align="center"
                    className="!font-bold "
                  >
                    For {data?.seller?.name} <br /> {data?.seller?.FLliscensee}-
                    FL-2
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold "
                    colSpan={allSizes.length * 2 + 2}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Important : As per Sec 139(A), Subsection(5C) and (5D) of
                    Income Tax Act you are required to provide PAN to us. In
                    case you do not provide PAN any liability, consequence,
                    penal action etc. taken by Income Tax authorities will be
                    your sole responsibility.
                  </TableCell>
                  <TableCell
                    sx={tableCellStyle}
                    colSpan={allSizes?.length + 1}
                    align="center"
                    className="!font-bold !text-sm !pt-12"
                  >
                    Authorised Signatory
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default BillComponent;
