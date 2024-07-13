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
import LiquorContext from "../../context/liquor/liquorContext";
import Loader from "../../components/Layout/Loader";

const LiquorList = () => {
  const { company } = useParams();
  const { getLiquorCom, deleteLiquor } = useContext(LiquorContext);
  const [liquor, setLiquor] = useState([]);
  const headers = ["750ml", "700ml", "375ml", "180ml"];
  const [loading, setLoading] = useState(false);

  const getLiquor = async () => {
    try {
      setLoading(true);
      const res = await getLiquorCom({ id: company });
      console.log(res);
      setLiquor(res.liquor);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteLiquor({ id });
    getLiquor();
  };

  useEffect(() => {
    getLiquor();
  }, []);

  // Calculating total quantities and prices
  const totals = headers.reduce(
    (acc, size) => ({
      ...acc,
      stock: { ...acc.stock, [size]: 0 },
      price: { ...acc.price, [size]: 0 },
    }),
    { stock: {}, price: {} }
  );

  liquor.forEach((p) => {
    headers.forEach((size) => {
      const stockItem = p.stock.find((item) => item.size === size);
      if (stockItem) {
        totals.stock[size] += stockItem.quantity;
        totals.price[size] += stockItem.price;
      }
    });
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!liquor || liquor.length === 0 ? (
            <>
              <div className="flex flex-col items-center justify-center min-h-[75vh]">
                <div className="w-[25vw] text-center">
                  <img
                    src="/images/no-data.png"
                    alt="No Data"
                    className="w-[25vw] m-auto"
                  />
                  <p>NO LIQUOR BRAND FOUND!</p>
                  <Box className="flex justify-center mt-5">
                    <Link to={`/dashboard/liquor/create/${company}`}>
                      <Button startIcon={<Add />} variant="contained">
                        New Liquor
                      </Button>
                    </Link>
                  </Box>
                </div>
              </div>
            </>
          ) : (
            <TableContainer className="py-5">
              <>
                <Box className="py-3 px-10">
                  <h1 className="text-center py-5 text-4xl font-bold">
                    Liquor Details
                  </h1>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                    }}
                  >
                    <Link to={`/dashboard/beer/create/${company}`}>
                      <Button startIcon={<Add />} variant="contained">
                        New Liquor
                      </Button>
                    </Link>
                  </Box>
                </Box>
                <Table
                  sx={{ minWidth: 650, border: 1.34, borderColor: "grey.400" }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ border: 1.34, borderColor: "grey.400", py: 1.2 }}
                      >
                        <Typography fontWeight="bold">S.No.</Typography>
                      </TableCell>
                      <TableCell
                        sx={{ border: 1.34, borderColor: "grey.400", py: 1.2 }}
                      >
                        <Typography fontWeight="bold">Brand Name</Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={4}
                        sx={{ border: 1.34, borderColor: "grey.400", py: 1.2 }}
                      >
                        <Typography fontWeight="bold">Stock</Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={4}
                        sx={{ border: 1.34, borderColor: "grey.400", py: 1.2 }}
                      >
                        <Typography fontWeight="bold">Rate</Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={2}
                        className="w-0"
                        sx={{ border: 1.34, borderColor: "grey.400", py: 1.2 }}
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
                      <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                        <Typography fontWeight="bold">Delete</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {liquor.map((p, i) => (
                      <TableRow
                        key={i}
                        sx={{ "& .MuiTableCell-root": { py: 0.3 } }}
                      >
                        <TableCell
                          sx={{ border: 1.34, borderColor: "grey.400" }}
                        >
                          <Typography fontWeight="bold">{i + 1}</Typography>
                        </TableCell>
                        <TableCell
                          sx={{ border: 1.34, borderColor: "grey.400" }}
                        >
                          <Typography fontWeight="normal">
                            {p.liquor.brandName}
                          </Typography>
                        </TableCell>
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
                                {stockItem ? stockItem.quantity : 0}
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
                          <Link to={`/dashboard/liquor/edit/${p._id}`}>
                            <Button
                              className="hover:text-blue-800"
                              sx={{ minWidth: 1 }}
                            >
                              <Edit sx={{ fontSize: 20 }} />
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell
                          align="center"
                          className="w-0"
                          sx={{ border: 1.34, borderColor: "grey.400" }}
                        >
                          <Button
                            onClick={() => handleDelete(p._id)}
                            color="error"
                            sx={{ minWidth: 1 }}
                          >
                            <Delete sx={{ fontSize: 20 }} />
                          </Button>
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
          )}
        </>
      )}
    </>
  );
};

export default LiquorList;
