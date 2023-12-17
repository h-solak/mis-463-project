import { Button } from "@mui/material";
import React from "react";

const ChoiceButton = ({ children, onClick, sx }) => {
  return (
    <Button
      variant="contained"
      color="highlight"
      onClick={onClick}
      sx={{
        ...sx,
        color: "light.main",
        fontSize: 24,
        textTransform: "capitalize",
        borderRadius: "99px",
        paddingX: 4,
        // paddingY: 1,
      }}
    >
      {children}
    </Button>
  );
};

export default ChoiceButton;
