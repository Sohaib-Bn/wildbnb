import { CgFormatSlash } from "react-icons/cg";
import { NavLink, useParams } from "react-router-dom";
import { useProduct } from "./useProduct";

import ShareButton from "./ShareButton";
import LikeButton from "../../ui/ButtonLike";

function OperationsBar() {
  const { productType } = useParams();
  const {
    product: { id },
  } = useProduct();

  return (
    <div className="flex items-center justify-between mt-2">
      <ul className="flex text-sm items-center text-colorGrey500 ">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-colorBlack font-medium" : ""
            }
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <CgFormatSlash />
        <li>
          <NavLink
            to={`/products/${productType}`}
            className={({ isActive }) =>
              isActive ? "text-colorBlack font-medium" : ""
            }
          >
            {productType}
          </NavLink>
        </li>
      </ul>
      <div className="flex text-sm items-center">
        <ShareButton />
        <LikeButton redirectTo={window.location.href} productId={id} />
      </div>
    </div>
  );
}

export default OperationsBar;
