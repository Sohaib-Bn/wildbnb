import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function RangeSlider({ rangeValue, setValue }) {
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        getAriaLabel={() => "Price range"}
        value={rangeValue}
        onChange={handleChange}
        sx={{
          color: "#222222",
          "& .MuiSlider-thumb": {
            "&:hover, &.Mui-focusVisible": {
              boxShadow: "0px 0px 0px 8px rgba(0,0,0, 0.16)",
            },
            "&.Mui-active": {
              boxShadow: "0px 0px 0px 14px rgba(0,0,0, 0.16)",
            },
          },
        }}
      />
    </Box>
  );
}

export default RangeSlider;
