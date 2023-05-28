import React from "react";
import Box from "@mui/material/Box";
import classes from "./sentenceBox.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const SentenceBox = ({ sentence }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.sentence}>
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
          "min-width": isMobile ? "20rem" : "40rem",
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
