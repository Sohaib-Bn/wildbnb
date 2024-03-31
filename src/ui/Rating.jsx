import styled from "@emotion/styled";
import RatingMui from "@mui/material/Rating";
import tailwindConfig from "../../tailwind.config.js";
import { TiStarFullOutline } from "react-icons/ti";
import { HiOutlineStar } from "react-icons/hi2";
// import { TiStarHalfOutline } from "react-icons/ti";

const colorGrey900 = tailwindConfig.theme.colors.colorGrey900;

const CustomizedRating = styled(RatingMui)`
  font-size: ${({ size }) => size};
  & .MuiRating-icon {
    color: ${colorGrey900};
  }
`;

function Rating({ size = "1.4rem", value = 4, ...props }) {
  return (
    <div>
      <CustomizedRating
        {...props}
        size={size}
        emptyIcon={<HiOutlineStar />}
        icon={<TiStarFullOutline />}
        name="read-only"
        value={value}
        readOnly
      />
    </div>
  );
}

export default Rating;
