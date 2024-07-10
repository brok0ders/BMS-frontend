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

const BeerList = () => {
  const { company } = useParams();
  const [beer, setBeer] = useState([]);
  const { getAllBeer, deleteBeer } = useContext(BeerContext);
  const headers = [
    "750ml",
    "180ml",
    "375ml",
    "125ml",
    "330ml",
    "275ml",
    "L 30",
    "650ml",
    "500ml",
  ];

  const getBeer = async () => {
    try {
      const res = await getAllBeer();
      setBeer(res.beer);
      console.log(res.beer);
    } catch (e) {}
  };

  let total650mlStock = 0;
  let total650mlPrice = 0;
  let total500mlStock = 0;
  let total500mlPrice = 0;

  const getTotalData = () => {
    if (beer.length > 0) {
      beer.forEach((beer) => {
        total650mlStock += beer.stock[650];
        total650mlPrice += beer.price[650];
        total500mlStock += beer.stock[500];
        total500mlPrice += beer.price[500];
      });
    }
  };
  // getTotalData();

  // temporary delete for testing purposes
  const handleDelete = async (id) => {
    const res = await deleteBeer({ id });
    toast.success("Beer deleted succesfully!");
    getLiquor();
  };

  useEffect(() => {
    getBeer();
  }, []);

  return (
    <Box className="py-5 px-10">
      <h1 className="text-center py-5 text-4xl font-bold">Liquor Details</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Link to={`/dashboard/liquor/create/${company}`}>
          <Button startIcon={<Add />} variant="contained">
            New Liquor
          </Button>
        </Link>
      </Box>
      <TableContainer className="py-5">
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
                colSpan={9}
                sx={{ border: 1.34, borderColor: "grey.400", py: 1.2 }}
              >
                <Typography fontWeight="bold">Stock</Typography>
              </TableCell>
              <TableCell
                align="center"
                colSpan={9}
                sx={{ border: 1.34, borderColor: "grey.400", py: 1.2 }}
              >
                <Typography fontWeight="bold">Rate (In Case)</Typography>
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
              {headers.map((s) => (
                <TableCell
                  align="right"
                  sx={{ border: 1.34, borderColor: "grey.400" }}
                >
                  <Typography fontWeight="bold">{s}</Typography>
                </TableCell>
              ))}
              {headers.map((s) => (
                <TableCell
                  align="right"
                  sx={{ border: 1.34, borderColor: "grey.400" }}
                >
                  <Typography fontWeight="bold">{s}</Typography>
                </TableCell>
              ))}

              <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                {" "}
                <Typography fontWeight="bold">Edit</Typography>
              </TableCell>
              <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                {" "}
                <Typography fontWeight="bold">Delete</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {beer?.map((p, i) => (
              <TableRow key={i} sx={{ "& .MuiTableCell-root": { py: 0.3 } }}>
                <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                  <Typography fontWeight="bold">{i + 1}</Typography>
                </TableCell>
                <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                  <Typography fontWeight="normal">
                    {p?.liquor?.brandName}
                  </Typography>
                </TableCell>
                {headers.map((header, idx) => {
                  const stockItem = p?.stock?.find(
                    (item) => item.size === header
                  );
                  return (
                    <TableCell
                      key={idx}
                      align="right"
                      sx={{ border: 1.34, borderColor: "grey.400" }}
                    >
                      <Typography fontWeight="normal">
                        {stockItem ? stockItem.quantity : 0}
                      </Typography>
                    </TableCell>
                  );
                })}
                {headers.map((header, idx) => {
                  const stockItem = p?.stock?.find(
                    (item) => item.size === header
                  );
                  return (
                    <TableCell
                      key={idx}
                      align="right"
                      sx={{ border: 1.34, borderColor: "grey.400" }}
                    >
                      <Typography fontWeight="normal">
                        {stockItem ? stockItem.price : 0}
                      </Typography>
                    </TableCell>
                  );
                })}

                <TableCell
                  align="right"
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
                  align="right"
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
            {/* Total Calculations */}
            <TableRow>
              <TableCell
                align="center"
                sx={{ border: 1.34, borderColor: "grey.400" }}
                colSpan={2}
              >
                <Typography fontWeight="bold">Total</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="bold">{}</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="bold">{}</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="bold">{}</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="bold">{}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BeerList;
