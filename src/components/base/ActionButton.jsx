import { Button } from "@mui/material";
import React from "react";

const ActionButton = ({
  children,
  onClick,
  sx,
  fontSize,
  variant,
  startIcon,
}) => {
  return (
    <Button
      variant={variant ? variant : "contained"}
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
      startIcon={startIcon ? startIcon : null}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
