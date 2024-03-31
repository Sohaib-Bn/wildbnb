import { CgFormatSlash } from "react-icons/cg";
import { NavLink, useParams } from "react-router-dom";
import ShareButton from "./ShareButton";

import LikeButton from "../../ui/ButtonLike";
import { useProduct } from "./useProduct";

function OperationsBar() {
  const { productType } = useParams();
  const {
    product: { id },
  } = useProduct();

  return (
    <div className="flex items-center justify-between">
      <ul className="flex items-center text-colorGrey500">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-colorBlack font-medium" : ""
            }
            to={"/"}
          >
            {/* {t("common:home")} */}
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
            {/* {t(`header:${productType}`)} */}
            {productType}
          </NavLink>
        </li>
      </ul>
      <div className="flex items-center">
        <ShareButton />
        <LikeButton redirectTo={window.location.href} productId={id} />
      </div>
    </div>
  );
}

export default OperationsBar;
