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

const LiquorList = () => {
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
                <TableCell sx={{ border: 1.34, borderColor: "grey.400" }}>
                  <Typography fontWeight="">{p.company}</Typography>
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
                  <Button color="error" sx={{ minWidth: 1 }}>
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

export default LiquorList;
