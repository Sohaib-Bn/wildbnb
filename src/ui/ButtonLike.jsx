import { useAppContext } from "../context/AppContext";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useLikeProduct } from "../features/product/useLikeDislikeProduct";
import { useUser } from "../features/auth/useUser";

import Button from "./Button";

function LikeButton({ productId, redirectTo, type, ...props }) {
  const { isAuthorized } = useAppContext();
  const { isPending, likeDislikeProduct } = useLikeProduct();
  const navigate = useNavigate();

  const { user = {} } = useUser();

  // Check if user and user_metadata exist before destructuring
  const likedProducts = user?.user_metadata?.likedProducts || [];

  const isLiked = likedProducts.includes(productId);

  function handleLikeProduct() {
    if (!isAuthorized) {
      redirectTo && sessionStorage.setItem("redirectTo", redirectTo);
      navigate(`/login`);
      return;
    }

    let newLikedProducts;

    if (isLiked)
      newLikedProducts = likedProducts.filter(
        (product) => product !== productId
      );
    else newLikedProducts = [...likedProducts, productId];

    likeDislikeProduct(newLikedProducts);
  }

  if (type === "icon")
    return (
      <button disabled={isPending} onClick={handleLikeProduct} {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          height={26}
          width={26}
          stroke="var(--color-grey-0)"
          fill={`${isLiked ? "white" : "rgba(0, 0, 0, 0.6)"}`}
          strokeWidth={2}
        >
          <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
        </svg>
      </button>
    );

  return (
    <Button
      // className={`${isPending ? "pointer-events-none" : ""}`}
      onClick={handleLikeProduct}
      disabled={isPending}
      variation="underline"
    >
      {isLiked ? <GoHeartFill size={20} /> : <GoHeart size={20} />}
      <span>{isLiked ? "Dislike" : "Like"}</span>
    </Button>
  );
}

export default LikeButton;
