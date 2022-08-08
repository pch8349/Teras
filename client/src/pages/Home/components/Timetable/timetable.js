import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function TimeTable({ rows }) {
  return (
    <TableContainer
      sx={{
        width: 250,
      }}
      component={Paper}
    >
      <Table aria-label="timeTable">
        <TableHead>
          <TableRow>
            <TableCell align="center">오늘의 시간표</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TimeTable;
