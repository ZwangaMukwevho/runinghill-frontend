import React from "react";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Dropdown = ({ options, value, onChange, label }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <FormControl sx={{ m: isMobile ? 1 : 2, minWidth: isMobile ? 120 : 150 }}>
      <InputLabel id="demo-simple-select-required-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-required-label"
        id="demo-simple-select-required"
        label="Plan *"
        value={value}
        onChange={onChange}
      >
        <MenuItem value="">Select an option</MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Optional</FormHelperText>
    </FormControl>
  );
};

export default Dropdown;
