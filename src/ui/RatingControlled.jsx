import styled from "@emotion/styled";
import RatingMui from "@mui/material/Rating";
import tailwindConfig from "../../tailwind.config.js";
import { TiStarFullOutline } from "react-icons/ti";
import { HiOutlineStar } from "react-icons/hi2";

const colorGrey900 = tailwindConfig.theme.colors.colorGrey900;

const CustomizedRating = styled(RatingMui)`
  font-size: ${({ size }) => size};
  & .MuiRating-icon {
    color: ${colorGrey900};
  }
`;

function RatingControlled({ size = "1.3rem", setValue, value = 4, ...props }) {
  return (
    <div>
      <CustomizedRating
        {...props}
        size={size}
        emptyIcon={<HiOutlineStar />}
        icon={<TiStarFullOutline />}
        name="controlled"
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}

export default RatingControlled;
