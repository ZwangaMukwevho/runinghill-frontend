import React from "react";
import Box from "@mui/material/Box";

const SentenceBox = ({ sentence }) => {
  return (
    <div>
      <Box
        component="div"
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          height: "50px",
          overflow: "hidden",
          overflowY: "scroll",
          border: "1px solid #ccc",
          borderRadiuss: "4px",
          padding: "10px",
          width: "100%",
          "min-width": "40rem",
          borderRadius: "10px",
          backgroundColor: "#d2d6d3",
        }}
      >
        {sentence}
      </Box>
    </div>
  );
};

export default SentenceBox;
