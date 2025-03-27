import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Layout/Loader";
import BackButton from "../../components/BackButton";
import ClContext from "../../context/cl/clContext";

const CLList = () => {
  const headers = ["750ml", "375ml", "180ml", "200ml", "200ml tetra"];
  const [loading, setLoading] = useState(false);

  const { getAllCL, CL } = useContext(ClContext);

  const getCLData = async () => {
    await getAllCL();
  };
  // Calculating total quantities and prices
  const totals = headers.reduce(
    (acc, size) => ({
      ...acc,
      stock: { ...acc.stock, [size]: 0 },
      price: { ...acc.price, [size]: 0 },
    }),
    { stock: {}, price: {} }
  );

  CL?.forEach((p) => {
    headers.forEach((size) => {
      const stockItem = p.stock.find((item) => item.size === size);
      if (stockItem) {
        totals.stock[size] += stockItem.quantity;
        totals.price[size] += stockItem.price;
      }
    });
  });
  useEffect(() => {
    getCLData();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box className="py-0 px-10">
            <h1 className="text-center py-5 text-4xl font-bold">Cl Details</h1>
          </Box>
          <TableContainer className="py-5">
            <>
              <Table
                sx={{
                  minWidth: 650,
                  border: 1.34,
                  borderColor: "grey.400",
                  marginTop: "1rem",
                }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        border: 1.34,
                        borderColor: "grey.400",
                        py: 1.2,
                      }}
                    >
                      <Typography fontWeight="bold">S.No.</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 1.34,
                        borderColor: "grey.400",
                        py: 1.2,
                      }}
                    >
                      <Typography fontWeight="bold">Brand Name</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={headers.length}
                      sx={{
                        border: 1.34,
                        borderColor: "grey.400",
                        py: 1.2,
                      }}
                    >
                      <Typography fontWeight="bold">Stock</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={headers.length}
                      sx={{
                        border: 1.34,
                        borderColor: "grey.400",
                        py: 1.2,
                      }}
                    >
                      <Typography fontWeight="bold">Rate</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      className="w-0"
                      sx={{
                        border: 1.34,
                        borderColor: "grey.400",
                        py: 1.2,
                      }}
                    >
                      <Typography fontWeight="bold">Action</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{ border: 1.34, borderColor: "grey.400" }}
                    ></TableCell>
                    <TableCell
                      sx={{ border: 1.34, borderColor: "grey.400" }}
                    ></TableCell>
                    {headers.map((s, idx) => (
                      <TableCell
                        key={idx}
                        align="center"
                        sx={{ border: 1.34, borderColor: "grey.400" }}
                      >
                        <Typography fontWeight="bold">{s}</Typography>
                      </TableCell>
                    ))}
                    {headers.map((s, idx) => (
                      <TableCell
                        key={idx}
                        align="center"
                        sx={{ border: 1.34, borderColor: "grey.400" }}
                      >
                        <Typography fontWeight="bold">{s}</Typography>
                      </TableCell>
                    ))}
                    <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                      <Typography fontWeight="bold">Edit</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {CL?.map((p, i) => (
                    <TableRow
                      key={i}
                      sx={{ "& .MuiTableCell-root": { py: 0.3 } }}
                    >
                      <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                        <Typography fontWeight="bold">{i + 1}</Typography>
                      </TableCell>
                      <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                        <Typography fontWeight="normal">
                          {p.brandName}
                        </Typography>
                      </TableCell>
                      {headers.map((header, idx) => {
                        const stockItem = p.stock.find(
                          (item) => item.size === header
                        );
                        // console.log("stockItem is: ", stockItem);
                        return (
                          <TableCell
                            key={idx}
                            align="center"
                            sx={{ border: 1.34, borderColor: "grey.400" }}
                          >
                            <Typography fontWeight="normal">
                              {stockItem
                                ? stockItem.quantity +
                                  "  [" +
                                  stockItem?.leak +
                                  "]"
                                : 0}
                            </Typography>
                          </TableCell>
                        );
                      })}
                      {headers.map((header, idx) => {
                        const stockItem = p.stock.find(
                          (item) => item.size === header
                        );
                        return (
                          <TableCell
                            key={idx}
                            align="center"
                            sx={{ border: 1.34, borderColor: "grey.400" }}
                          >
                            <Typography fontWeight="normal">
                              {stockItem ? stockItem.price.toFixed(2) : 0}
                            </Typography>
                          </TableCell>
                        );
                      })}
                      <TableCell
                        align="center"
                        className="w-0"
                        sx={{ border: 1.34, borderColor: "grey.400" }}
                      >
                        <Link to={`/dashboard/CL/edit/${p._id}`}>
                          <Button
                            className="hover:text-blue-800"
                            sx={{ minWidth: 1 }}
                          >
                            <Edit sx={{ fontSize: 20 }} />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ border: 1.34, borderColor: "grey.400" }}
                      colSpan={2}
                    >
                      <Typography fontWeight="bold">Total</Typography>
                    </TableCell>
                    {headers.map((size, idx) => (
                      <TableCell
                        key={idx}
                        align="center"
                        sx={{ border: 1.34, borderColor: "grey.400" }}
                      >
                        <Typography fontWeight="bold">
                          {totals.stock[size]}
                        </Typography>
                      </TableCell>
                    ))}
                    {headers.map((size, idx) => (
                      <TableCell
                        key={idx}
                        align="center"
                        sx={{ border: 1.34, borderColor: "grey.400" }}
                      >
                        <Typography fontWeight="bold">
                          {totals.price[size].toFixed(2)}
                        </Typography>
                      </TableCell>
                    ))}
                    <TableCell
                      colSpan={2}
                      sx={{ border: 1.34, borderColor: "grey.400" }}
                    />
                  </TableRow>
                </TableBody>
              </Table>
            </>
          </TableContainer>

          <p className="text-center py-5">
            <em className="italic">
              {" "}
              <b>*Note:</b> Values inside [ ] represent leak measurements.
            </em>
          </p>
        </>
      )}
    </>
  );
};

export default CLList;
