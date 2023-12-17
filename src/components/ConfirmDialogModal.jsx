import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const ConfirmDialogModal = ({
  isModalOpen,
  setIsModalOpen,
  question,
  action,
  icon,
}) => {
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
        gap={3}
        sx={{ background: "light.main" }}
        className="absolute-center rounded"
        padding={5}
        onClick={(e) => e.stopPropagation()}
      >
        {icon ? icon : <ErrorOutlineIcon color="error" sx={{ fontSize: 90 }} />}
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={2}
        >
          <Typography fontSize={18} fontWeight={500} textAlign={"center"}>
            {question}
          </Typography>
          <Typography className="text-secondary" textAlign={"center"}>
            Are you sure?
          </Typography>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={4}
          justifyContent={"center"}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={() => setIsModalOpen(false)}
          >
            No
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              action();
              setIsModalOpen(false);
            }}
          >
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDialogModal;
