import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams } from "react-router-dom";

const data2 = {
  _id: "668f914ca5f1139e5c130f1b",
  customer: {
    _id: "668f914ca5f1139e5c130f18",
    licensee: "gopal",
    shop: "shop1",
    firm: "firm1",
    pan: "PAN27632",
    user: "668bd6b472896619da3bb4ed",
    createdAt: "2024-07-11T08:01:16.015Z",
    updatedAt: "2024-07-11T08:01:16.015Z",
    __v: 0,
  },
  seller: {
    _id: "668bd6b472896619da3bb4ed",
    name: "M/S Maa Banari Devi",
    email: ["brokoders@gmail.com", "sumitkandpal@gmail.com"],
    username: "2024202510993",
    mobile: "9058044318",
    password: "$2a$10$75T0.6Od9FvLw/ompMQIVOq2YtNAuqzHg9Czuk3axtYeUp/k.SQ5m",
    addressGodown: "kathayadi",
    FLliscensee: "Sumit Kandpal",
    address: "almora",
    TINno: "394839649323",
    PANno: "NDKPT3487",
    role: "user",
    createdAt: "2024-07-08T12:08:20.482Z",
    updatedAt: "2024-07-10T18:49:58.111Z",
    __v: 0,
  },
  products: [
    {
      brand: "ALCOBREW SINGLE OAK SELECT GRAIN WHISKY",
      sizes: [
        {
          size: "750ml",
          quantity: 12,
          price: 52309.200000000004,
          _id: "668f914ca5f1139e5c130f1d",
        },
        {
          size: "375ml",
          quantity: 2,
          price: 8738.2,
          _id: "668f914ca5f1139e5c130f1e",
        },
        {
          size: "180ml",
          quantity: 0,
          price: 0,
          _id: "668f914ca5f1139e5c130f1f",
        },
      ],
      _id: "668f914ca5f1139e5c130f1c",
    },
  ],
  company: {
    _id: "668e4a97338754464d9c5ca5",
    company: {
      _id: "668d95e1f70a14edd49f919c",
      name: "Alcobrew Distilleries India Ltd",
      companyType: "liquor",
      __v: 0,
    },
    user: "668bd6b472896619da3bb4ed",
    createdAt: "2024-07-10T08:47:19.213Z",
    updatedAt: "2024-07-10T08:47:19.213Z",
    __v: 0,
  },
  excise: "pullUps",
  pno: "T8743",
  total: 10000,
  createdAt: "2024-06-11T08:01:16.240Z",
  updatedAt: "2024-06-11T08:01:16.240Z",
  __v: 0,
  billType: "liquor",
};

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
        const { data: data1 } = await API.get(`/bill/${id}`);
        setData(data1?.bill);
        console.log(data1);
        const basePricesTemp = {};
        for (const product of data1?.bill.products) {
          let response;
          if (data1.bill.billType === "liquor") {
            response = await API.get(`/master-liquor/brand/${product.brand}`);
          } else {
            response = await API.get(`/master-beer/brand/${product.brand}`);
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
    backgroundColor: "#f5f5f5",
    color: "black",
  };

  return (
    <>
      {loading && (
        <div className="flex h-screen justify-center items-center">
          Loading...
        </div>
      )}
      {!loading && !data && (
        <div className="flex h-screen justify-center items-center">
          Bill Data Not Found
        </div>
      )}
      {data && data.seller && (
        <div className="p-4">
          {/* Seller Details */}

          <div className="text-center lg:px-10 px-2 ">
            <h1 className="text-2xl mb-5 font-bold">{data?.seller?.name}</h1>
            <p className="text-[1rem] font-semibold">
              Address:{" "}
              <span className="font-normal">{data?.seller?.address} </span>
            </p>
            <p className="text-[1rem] font-semibold">
              FL-2 Licensee:{" "}
              <span className="font-normal">{data?.seller?.FLliscensee} </span>
            </p>
            <p className="text-[1rem] font-semibold">
              FL-2 GODOWN:{" "}
              <span className="font-normal">
                {data?.seller?.addressGodown}{" "}
              </span>
            </p>
            <p className="text-[1rem] md:text-right font-semibold">
              TIN No.:{" "}
              <span className="font-normal">{data?.seller?.TINno} </span>
            </p>
            <p className="text-[1rem] md:text-right font-semibold">
              PAN No. :{" "}
              <span className="font-normal">{data?.seller?.PANno} </span>
            </p>
          </div>

          {/* Customer || Buyer details */}

          <div className="flex flex-row justify-between flex-wrap items-end lg:px-10 px-2 ">
            <div className="text-left ">
              <h1 className="text-xl mt-10 mb-5 md:mt-0 font-bold">
                Bill No.: {data?.bill ?? "FLV0001"}
              </h1>
              <p className="text-[1rem] font-semibold">
                Licensee:{" "}
                <span className="ml-1 font-normal">
                  {data?.customer.licensee}{" "}
                </span>
              </p>
              <p className="text-[1rem] font-semibold">
                Shop:{" "}
                <span className="ml-1 font-normal">
                  {data?.customer?.shop}{" "}
                </span>
              </p>
              <p className="text-[1rem] font-semibold">
                Firm:{" "}
                <span className="ml-1 font-normal">
                  {data?.customer?.firm}{" "}
                </span>
              </p>

              <p className="text-[1rem] font-semibold">
                PAN No.:{" "}
                <span className="ml-1 font-normal">{data?.customer?.pan} </span>
              </p>
            </div>
            <div className="text-left ">
              <p className="text-[1rem] font-semibold">
                Excise FL 36 No.:{" "}
                <span className="font-normal">{data?.excise} </span>
              </p>
              <p className="text-[1rem] font-semibold">
                P.No.: <span className="font-normal">{data?.pno} </span>
              </p>
            </div>
            <div className="text-left ">
              <p className="text-[1rem] font-semibold">
                Date:{" "}
                <span className="font-normal">
                  {new Date(data?.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>

          <TableContainer className="py-5">
            <h1 className="md:text-3xl text-2xl font-semibold text-slate-700 py-5">
              Added Products
            </h1>
            <Table
              borderAxis="both"
              sx={{
                minWidth: 650,
                border: "1px solid black",
                backgroundColor: "#f5f5f5",
                color: "black",
              }}
              size="small"
              aria-label="a dense table"
            >
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
