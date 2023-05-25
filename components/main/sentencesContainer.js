import React, { useState } from "react";
import Box from "@mui/material/Box";

const SentencesContainer = ({ sentence }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "10px",
        marginBottom: "1rem",
        width: "100%",
        "min-width": "40rem",
      }}
    >
      {sentence}
    </Box>
  );
};

export default SentencesContainer;
