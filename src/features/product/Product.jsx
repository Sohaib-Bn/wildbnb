import { useProduct } from "./useProduct";
import { HeaderProduct } from "./HeaderProduct";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

import OverView from "./OverView";
import Details from "./Details";
import Reviews from "./Reviews";
import MapLocation from "./MapLocation";
import OperationsBar from "./OperationsBar";
import SkeletonProduct from "./SkeletonProduct";

import DotsLoaderFullPage from "../../ui/DotsLoaderFullPage";
import { useProductReviews } from "./useProductReviews";

function Product() {
  const { isLoadingProduct, product = {} } = useProduct();
  const { isLoading } = useProductReviews();
  const [showHeaderProduct, setShowHeaderProduct] = useState(false);
  const [showHeaderProductBookView, setShowHeaderProductBookView] =
    useState(false);
  const { isConverting } = useAppContext();

  const { name } = product;

  useEffect(() => {
    if (name) document.title = name;

    return () => {
      document.title = "The Wild Oasis | Book Cabins &more";
    };
  }, [name]);

  useEffect(() => {
    const hash = window.location.hash;
    const queryString = hash.substring(1);

    const headerHeight = document.getElementById("header-app").offsetHeight;
    const targetElement = document.getElementById(queryString);

    if (targetElement) {
      const targetPosition = targetElement.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      return;
    }

    window.scroll({
      top: 0,
    });
  }, []);

  if (isConverting) return <DotsLoaderFullPage opacity={75} />;

  if (isLoadingProduct || isLoading) return <SkeletonProduct />;

  return (
    <div className="px-32 py-5 flex flex-col gap-6">
      {showHeaderProduct && (
        <HeaderProduct showHeaderProductBookView={showHeaderProductBookView} />
      )}
      <OperationsBar />
      <OverView setShowHeaderProduct={setShowHeaderProduct} />
      <Details setShowHeaderProductBookView={setShowHeaderProductBookView} />
      <MapLocation />
      <Reviews />
    </div>
  );
}

export default Product;
