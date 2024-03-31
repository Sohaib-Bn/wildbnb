import { Slider } from "@mui/material";
import styled from "@emotion/styled";
import tailwindConfig from "../../tailwind.config";

const colorGrey900 = tailwindConfig.theme.colors.colorGrey900;
const colorGrey700 = tailwindConfig.theme.colors.colorGrey700;

const CutomizedSlider = styled(Slider)`
  color: ${colorGrey900};
  cursor: default;
  height: 10px;
  & .MuiSlider-thumb {
    display: none;
  }

  & .MuiSlider-rail {
    background-color: ${colorGrey700};
    opacity: 0.15;
  }
`;

function ReadOnlySlider({ value }) {
  return (
    <CutomizedSlider
      value={value}
      aria-label="Rating Slider"
      step={null}
      valueLabelDisplay="off"
    />
  );
}

export default ReadOnlySlider;
