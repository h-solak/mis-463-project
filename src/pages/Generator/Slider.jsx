import { Box, Slider, Typography } from "@mui/material";
import React from "react";

const BaseSlider = ({ value, onChange, label }) => {
  return (
    <Box
      height={275}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      textAlign={"center"}
      gap={2}
    >
      <Slider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: "slider-vertical",
          },
          "& .MuiSlider-thumb": {
            borderRadius: 1,
            width: 36,
            height: 14,
          },
          "& .MuiSlider-rail": {
            backgroundColor: "secondary.main",
            width: 7,
          },
        }}
        orientation="vertical"
        value={value}
        onChange={onChange}
        aria-label={label}
        valueLabelDisplay="off"
        className="opening-animation"

        // marks={[
        //   {
        //     value: 34.7,
        //     label: "Cafe",
        //   },
        // ]}
        // onKeyDown={preventHorizontalKeyboardNavigation}
      />
      <Box>
        <Typography fontSize={12} fontWeight={500}>
          {label}
        </Typography>
        <Typography fontSize={16} fontWeight={600}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default BaseSlider;
