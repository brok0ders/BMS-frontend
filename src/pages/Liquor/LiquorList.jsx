import React, { useState } from "react";
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
import { Link, useParams } from "react-router-dom";

const LiquorList = () => {
  const { company } = useParams();
  const [liquor, setLiquor] = useState([
    {
      _id: "343254t234",
      brandName: "Test brand this is a brand from",
      stock: {
        Q: 56,
        P: 56,
        N: 56,
      },
      price: {
        Q: 5600,
        P: 5006,
        N: 1526,
      },
      company: "NK traders",
    },
    {
      _id: "4353",
      brandName: "Test2 brand",
      stock: {
        Q: 36,
        P: 12,
        N: 23,
      },
      price: {
        Q: 1600,
        P: 1000,
        N: 1500,
      },
      company: "Pandey traders",
    },
  ]);

  let totalQStock = 0;
  let totalQPrice = 0;
  let totalPStock = 0;
  let totalPPrice = 0;
  let totalNStock = 0;
  let totalNPrice = 0;
  const getTotalData = () => {
    if (liquor.length > 0) {
      liquor.forEach((liquor) => {
        totalQStock += liquor.stock.Q;
        totalQPrice += liquor.price.Q;
        totalPStock += liquor.stock.P;
        totalPPrice += liquor.price.P;
        totalNStock += liquor.stock.N;
        totalNPrice += liquor.price.N;
      });
    }
  };
  getTotalData();

  // temporary delete for testing purposes
  const handleDelete = (id) => {
    const updatedLiquor = liquor.filter((liquor) => liquor._id !== id);
    setLiquor(updatedLiquor);
  };

  return (
    <Box>
      <h1 className="text-center py-5 text-4xl font-bold">Liquor Details</h1>
      <TableContainer className="py-5 px-10">
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
                colSpan={3}
                sx={{ border: 1.34, borderColor: "grey.400", py: 1.2 }}
              >
                <Typography fontWeight="bold">Stock</Typography>
              </TableCell>
              <TableCell
                align="center"
                colSpan={3}
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
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="bold">Q</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="bold">P</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="bold">N</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="bold">Q</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="bold">P</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="bold">N</Typography>
              </TableCell>
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
            {liquor.length > 0 &&
              liquor.map((p, i) => (
                <TableRow key={i} sx={{ "& .MuiTableCell-root": { py: 0.3 } }}>
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
                    <Typography fontWeight="normal"> {p.stock.Q}</Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ border: 1.34, borderColor: "grey.400" }}
                  >
                    <Typography fontWeight="normal"> {p.stock.P}</Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ border: 1.34, borderColor: "grey.400" }}
                  >
                    <Typography fontWeight="normal"> {p.stock.N}</Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ border: 1.34, borderColor: "grey.400" }}
                  >
                    <Typography fontWeight="normal"> {p.price.Q} </Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ border: 1.34, borderColor: "grey.400" }}
                  >
                    <Typography fontWeight="normal"> {p.price.P} </Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ border: 1.34, borderColor: "grey.400" }}
                  >
                    <Typography fontWeight="normal"> {p.price.N}</Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    className="w-0"
                    sx={{ border: 1.34, borderColor: "grey.400" }}
                  >
                    <Link to={`edit/${p._id}`}>
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
                <Typography fontWeight="normal">{totalQStock}</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="normal">{totalPStock}</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="normal">{totalNStock}</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="normal">{totalQPrice}</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="normal">{totalPPrice}</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: 1.34, borderColor: "grey.400" }}
              >
                <Typography fontWeight="normal">{totalNPrice}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LiquorList;
