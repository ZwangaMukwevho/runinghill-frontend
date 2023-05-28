import React, { useState } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const SentencesContainer = ({ sentence }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "10px",
        marginBottom: "1rem",
        width: "100%",
        "min-width": isMobile ? "15rem" : "40rem",
      }}
    >
      {sentence}
    </Box>
  );
};

export default SentencesContainer;
