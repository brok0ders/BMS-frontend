import React, { useEffect, useState } from "react";
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
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

const BeerList = () => {
  const { company } = useParams();

  const [beer, setbeer] = useState([
    {
      _id: "12313",
      brandName: "Test brand",
      stock: {
        650: 56,
        500: 56,
      },
      price: {
        650: 5600,
        500: 5006,
      },
      company: "NK traders",
    },
    {
      _id: "1213",
      brandName: "Test2 brand",
      stock: {
        650: 36,
        500: 12,
      },
      price: {
        650: 1600,
        500: 1000,
      },
      company: "Pandey traders",
    },
  ]);

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
  getTotalData();

  // temporary delete for testing purposes
  const handleDelete = (id) => {
    const updatedbeer = beer.filter((beer) => beer._id !== id);
    setbeer(updatedbeer);
  };

  return (
    <Box className="py-5 px-10">
      <h1 className="text-center text-4xl font-bold">Beer Details</h1>
      <TableContainer className="py-10 ">
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
                colSpan={2}
                sx={{ border: 1.34, borderColor: "grey.400", py: 1.2 }}
              >
                <Typography fontWeight="bold">Stock</Typography>
              </TableCell>
              <TableCell
                align="center"
                colSpan={2}
                sx={{ border: 1.34, borderColor: "grey.400", py: 1.2 }}
              >
                <Typography fontWeight="bold">Rate (In Case)</Typography>
              </TableCell>
              <TableCell
                align="center"
                className="w-0"
                colSpan={2}
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

              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="bold">650</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="bold">500</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="bold">650</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="bold">500</Typography>
              </TableCell>
              <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                <Typography fontWeight="bold">Edit</Typography>
              </TableCell>
              <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                <Typography fontWeight="bold">Delete</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {beer.length > 0 &&
              beer.map((p, i) => (
                <TableRow key={i} sx={{ "& .MuiTableCell-root": { py: 0.5 } }}>
                  <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                    <Typography fontWeight="bold">{i + 1}</Typography>
                  </TableCell>
                  <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                    <Typography fontWeight="normal">{p.brandName}</Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ border: 1.34, borderColor: "grey.400" }}
                  >
                    <Typography fontWeight="normal">{p.stock[650]}</Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ border: 1.34, borderColor: "grey.400" }}
                  >
                    <Typography fontWeight="normal">{p.stock[500]}</Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ border: 1.34, borderColor: "grey.400" }}
                  >
                    <Typography fontWeight="normal">{p.price[650]}</Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ border: 1.34, borderColor: "grey.400" }}
                  >
                    <Typography fontWeight="normal">{p.price[500]}</Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    className="w-0"
                    sx={{ border: 1.34, borderColor: "grey.400" }}
                  >
                    <Link to={`edit/${p._id}`}>
                      <Button sx={{ minWidth: 1 }}>
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
                      sx={{ minWidth: 1 }}
                      color="error"
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
                <Typography fontWeight="normal">{total650mlStock}</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="normal">{total500mlStock}</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="normal">{total650mlPrice}</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="normal">{total500mlPrice}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BeerList;
