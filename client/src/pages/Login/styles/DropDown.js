import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0.8),
  },
  "& .MuiInputBase-input": {
    maxheight: 27,
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#ffffff",
    border: "1px solid #096c25",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#096c25",
      boxShadow: "0 0 0 0.2rem rgba(9,108,37,.25)",
    },
  },
}));

export const DropDown = ({ arr, getDropDownValue }) => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Role"
          // onChange={handleChange}
          input={<BootstrapInput />}
        >
          {arr.map(
            //상위에서 보낸 값 배열로 해서 받은거 map을 이용해 반복
            (posi) => (
              <MenuItem
                key={posi.id}
                value={posi.id}
                onClick={() => getDropDownValue(posi.id)}
              >
                {posi.name}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </Box>
  );
};
