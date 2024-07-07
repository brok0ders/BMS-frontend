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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

const BeerList = () => {
  const [liquor, setLiquor] = useState([
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

  return (
    <TableContainer className="py-12 px-10">
      <Table
        sx={{ minWidth: 650, border: 1.34, borderColor: "grey.400" }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: 1.34, borderColor: "grey.400", py: 1.2 }}>
              <Typography fontWeight="bold">S.No.</Typography>
            </TableCell>
            <TableCell sx={{ border: 1.34, borderColor: "grey.400", py: 1.2 }}>
              <Typography fontWeight="bold">Brand Name</Typography>
            </TableCell>
            <TableCell sx={{ border: 1.34, borderColor: "grey.400", py: 1.2 }}>
              <Typography fontWeight="bold">Company</Typography>
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
          {liquor.length > 0 &&
            liquor.map((p, i) => (
              <TableRow key={i} sx={{ "& .MuiTableCell-root": { py: 0.5 } }}>
                <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                  <Typography fontWeight="bold">{i + 1}</Typography>
                </TableCell>
                <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                  <Typography fontWeight="normal">{p.brandName}</Typography>
                </TableCell>
                <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                  <Typography fontWeight="">{p.company}</Typography>
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
                  <Button sx={{ minWidth: 1 }} color="error">
                    <Delete sx={{ fontSize: 20 }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BeerList;
