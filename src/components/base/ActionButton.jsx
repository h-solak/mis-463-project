import { Button } from "@mui/material";
import React from "react";

const ActionButton = ({ children, onClick, sx, fontSize }) => {
  return (
    <Button
      variant="contained"
      color="highlight"
      onClick={onClick}
      sx={{
        ...sx,
        color: "#fff",
        fontSize: fontSize ? fontSize : 24,
        textTransform: "capitalize",
        borderRadius: "99px",
        paddingX: 4,
        paddingY: 1,
      }}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
