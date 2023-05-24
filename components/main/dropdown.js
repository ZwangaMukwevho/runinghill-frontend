import React from "react";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

const Dropdown = ({ options, value, onChange, label }) => {
  return (
    <FormControl sx={{ m: 2, minWidth: 150 }}>
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
