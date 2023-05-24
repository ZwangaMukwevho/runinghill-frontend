import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function SubmitButton() {
  return (
    <Button variant="contained" endIcon={<SendIcon />} sx={{ width: "150px" }}>
      Submit
    </Button>
  );
}
