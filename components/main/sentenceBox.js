import React from "react";
import Box from "@mui/material/Box";

const SentenceBox = ({ sentence }) => {
  return (
    <Box
      sx={{
        marginTop: "1rem",
        fontSize: "1.2rem",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "4px",
        backgroundColor: "#f5f5f5",
        width: "150px",
        height: "10px",
      }}
    >
      {sentence}
    </Box>
  );
};

export default SentenceBox;
