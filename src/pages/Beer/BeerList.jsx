import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import BeerContext from "../../context/beer/beerContext";
import { toast } from "react-toastify";
import Loader from "../../components/Layout/Loader";
import BackButton from "../../components/BackButton";

const BeerList = () => {
  const { company } = useParams();
  const [beer, setBeer] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getBeerCom, deleteBeer } = useContext(BeerContext);

  // Get beer data from the context
  const getBeer = async () => {
    setLoading(true);
    try {
      const res = await getBeerCom({ id: company });
      setBeer(res.beer);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBeer();
  }, []);

  // Extract all unique sizes
  const allSizes = Array.from(
    new Set(beer.flatMap((product) => product.stock.map((size) => size.size)))
  );

  // Handle delete action
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteBeer({ id });
      toast.success("Beer deleted successfully!");
      getBeer();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!beer || beer.length === 0 ? (
            <>
              <div className="flex flex-col items-center justify-center min-h-[75vh]">
                <div className="w-[25vw] text-center">
                  <img
                    src="/images/no-data.png"
                    alt="No Data"
                    className="w-[25vw] m-auto"
                  />
                  <p>NO BEER BRAND FOUND!</p>
                  <Box className="flex justify-center mt-5">
                    <Link to={`/dashboard/beer/create/${company}`}>
                      <Button startIcon={<Add />} variant="contained">
                        New Beer
                      </Button>
                    </Link>
                  </Box>
                </div>
              </div>
            </>
          ) : (
            <>
              <TableContainer className="px-3">
                <Box className="py-3 px-10">
                  <BackButton />
                  <h1 className="text-center py-5 text-4xl font-bold">
                    Beer Details
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
                        New Beer
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
                        colSpan={allSizes.length}
                        sx={{ border: 1.34, borderColor: "grey.400", py: 1.2 }}
                      >
                        <Typography fontWeight="bold">Stock</Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={allSizes.length}
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
                      {allSizes.map((size) => (
                        <TableCell
                          key={`stock-header-${size}`}
                          align="center"
                          sx={{ border: 1.34, borderColor: "grey.400" }}
                        >
                          <Typography fontWeight="bold">{size}</Typography>
                        </TableCell>
                      ))}
                      {allSizes.map((size) => (
                        <TableCell
                          key={`rate-header-${size}`}
                          align="center"
                          sx={{ border: 1.34, borderColor: "grey.400" }}
                        >
                          <Typography fontWeight="bold">{size}</Typography>
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
                    {beer.map((p, i) => (
                      <React.Fragment key={i}>
                        <TableRow sx={{ "& .MuiTableCell-root": { py: 0.3 } }}>
                          <TableCell
                            sx={{ border: 1.34, borderColor: "grey.400" }}
                          >
                            <Typography fontWeight="bold">{i + 1}</Typography>
                          </TableCell>
                          <TableCell
                            sx={{ border: 1.34, borderColor: "grey.400" }}
                          >
                            <Typography fontWeight="normal">
                              {p?.beer?.brandName}
                            </Typography>
                          </TableCell>
                          {allSizes.map((size, idx) => {
                            const stockItem = p.stock.find(
                              (item) => item.size === size
                            );
                            return (
                              <TableCell
                                key={`quantity-${i}-${idx}`}
                                align="center"
                                sx={{ border: 1.34, borderColor: "grey.400" }}
                              >
                                <Typography fontWeight="normal">
                                  {stockItem ? stockItem.quantity : 0}
                                </Typography>
                              </TableCell>
                            );
                          })}
                          {allSizes.map((size, idx) => {
                            const stockItem = p.stock.find(
                              (item) => item.size === size
                            );
                            return (
                              <TableCell
                                key={`price-${i}-${idx}`}
                                align="center"
                                sx={{ border: 1.34, borderColor: "grey.400" }}
                              >
                                <Typography fontWeight="normal">
                                  {stockItem ? stockItem.price : 0}
                                </Typography>
                              </TableCell>
                            );
                          })}
                          <TableCell
                            align="center"
                            className="w-0"
                            sx={{ border: 1.34, borderColor: "grey.400" }}
                          >
                            <Link to={`/dashboard/beer/edit/${p._id}`}>
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
                      </React.Fragment>
                    ))}
                    {/* Total Calculations */}
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{ border: 1.34, borderColor: "grey.400" }}
                        colSpan={2}
                      >
                        <Typography fontWeight="bold">Total</Typography>
                      </TableCell>
                      {allSizes.map((size, idx) => (
                        <TableCell
                          key={`total-quantity-${idx}`}
                          align="center"
                          sx={{ border: 1.34, borderColor: "grey.400" }}
                        >
                          <Typography fontWeight="bold">
                            {beer.reduce((acc, p) => {
                              const stockItem = p.stock.find(
                                (item) => item.size === size
                              );
                              return acc + (stockItem ? stockItem.quantity : 0);
                            }, 0)}
                          </Typography>
                        </TableCell>
                      ))}
                      {allSizes.map((size, idx) => (
                        <TableCell
                          key={`total-price-${idx}`}
                          align="center"
                          sx={{ border: 1.34, borderColor: "grey.400" }}
                        >
                          <Typography fontWeight="bold">
                            {beer.reduce((acc, p) => {
                              const stockItem = p.stock.find(
                                (item) => item.size === size
                              );
                              return acc + (stockItem ? stockItem.price : 0);
                            }, 0)}
                          </Typography>
                        </TableCell>
                      ))}
                      <TableCell
                        align="center"
                        sx={{ border: 1.34, borderColor: "grey.400" }}
                        colSpan={2}
                      >
                        <Typography fontWeight="bold">Grand Total</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      )}
    </>
  );
};

export default BeerList;
