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
        <h3 onClick={() => navigate("/")}>
          Zortify<span className="ms-1 fs-6">v1</span>
        </h3>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
