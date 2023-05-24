import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function SubmitButton({ onSubmit }) {
  return (
    <Button
      variant="contained"
      endIcon={<SendIcon />}
      sx={{ width: "150px" }}
      onClick={onSubmit}
    >
      Submit
    </Button>
  );
}
