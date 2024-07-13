import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams } from "react-router-dom";

const BillComponent = () => {
  const [basePrices, setBasePrices] = useState({});
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [taxesData, setTaxesData] = useState({});

  const NumberToWordsConverter = (n) => {
    // Ensuring the number has two decimal places
    n = n.toFixed(2);

    const one = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const ten = [
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    const numToWords = (num, suffix) => {
      let str = "";
      if (num > 19) {
        str += ten[Math.floor(num / 10) - 2];
        if (num % 10 > 0) {
          str += " " + one[(num % 10) - 1];
        }
      } else if (num > 0) {
        str += one[num - 1];
      }

      if (num !== 0) {
        str += " " + suffix;
      }

      return str.trim();
    };

    const convertToWords = (num) => {
      let output = "";

      if (Math.floor(num / 100000) > 0) {
        output += numToWords(Math.floor(num / 100000), "lakh");
        num %= 100000;
      }

      if (Math.floor(num / 1000) > 0) {
        output += " " + numToWords(Math.floor(num / 1000), "thousand");
        num %= 1000;
      }

      if (Math.floor(num / 100) > 0) {
        output += " " + numToWords(Math.floor(num / 100), "hundred");
        num %= 100;
      }

      if (num > 0) {
        if (output !== "") {
          output += " and ";
        }
        output += numToWords(num, "");
      }

      return output.trim();
    };

    const parts = n.split(".");
    const integerPart = parseInt(parts[0], 10);
    const decimalPart = parseInt(parts[1], 10);

    let words = convertToWords(integerPart);

    if (decimalPart > 0) {
      words += " point";
      for (const digit of parts[1]) {
        words += ` ${one[digit - 1]}`;
      }
    }
    if (!words) {
      return "zero";
    }
    return words + " only";
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
        console.log(data1);
        const basePricesTemp = {};
        for (const product of data1?.bill.products) {
          let response;
          if (data1.bill.billType === "liquor") {
            response = await API.get(
              `/master-liquor/brand/${product.brand}`,
              config
            );
          } else {
            response = await API.get(
              `/master-beer/brand/${product.brand}`,
              config
            );
          }
          basePricesTemp[product.brand] = response.data.data[0].sizes;
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
    // console.log(product);
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

  // calculate the taxes

  const recalculateTaxes = (products, brandsDetails) => {
    let totalQuantity = 0;
    let total = 0;
    let fholo = 0;
    let fpratifal = 0;
    let fwep = 0;

    products.forEach((product) => {
      const brandDetails = brandsDetails[product.brand];
      product.sizes.forEach((size) => {
        const sizeDetail = brandDetails.find((s) => s.size === size.size);
        if (sizeDetail) {
          fholo += size.quantity * sizeDetail.hologram;
          fpratifal += size.quantity * sizeDetail.pratifal;
          fwep += size.quantity * sizeDetail.wep;
          totalQuantity += size.quantity;
          total += size.price;
        }
      });
    });

    // Calculate taxes
    const vatTax = total * (12 / 100);
    const cess = ((total + vatTax) * 2) / 100;
    const profit = totalQuantity * 50;
    const taxTotal = total + vatTax + cess + fwep + fholo + profit + fpratifal;
    const tcs = (taxTotal * 1) / 100;
    const grandTotal = taxTotal + tcs;

    return {
      totalQuantity,
      total,
      fholo,
      fpratifal,
      fwep,
      vatTax,
      cess,
      profit,
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
                    Bill No.: {data?.bill ?? "FLV0001"}
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
                    Vat Tax 12%
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    {taxesData?.vatTax?.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 3 + 2}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Cess @ 2%
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    {taxesData?.cess?.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 3 + 2}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Women Empowerment/Cow Protection/Sports Activity Cess
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    {taxesData?.fwep?.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 3 + 2}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Hologram & Track and Trace Fee
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    {taxesData?.fholo?.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 3 + 2}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Profit of F.L.-2 License Holder
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    {taxesData?.profit?.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="!font-bold"
                    colSpan={allSizes.length * 3 + 2}
                    sx={tableCellStyle}
                    align="center"
                  >
                    Pratifal Fee
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    {taxesData?.fpratifal?.toFixed(2)}
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
