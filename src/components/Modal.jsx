import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
const BaseModal = ({ isModalOpen, setIsModalOpen, children }) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={setIsModalOpen}
      onClick={() => setIsModalOpen(false)}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        sx={{ background: "#fff" }}
        className="absolute-center"
        borderRadius={8}
        padding={5}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default BaseModal;
