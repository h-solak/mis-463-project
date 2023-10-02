import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div>
      <nav
        style={{
          height: 70,
        }}
      >
        <h3 onClick={() => navigate("/")}>Emayesify</h3>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
