import { useEffect, useState } from "react";

import ProductTypeList from "./ProductTypeList";
import FavoritesOnly from "./FavoritesOnlys";
import FiltersModal from "./filters/FiltersModal";
import { useAppContext } from "../../context/AppContext";

function ProductsOperationsBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { showMapProducts } = useAppContext();
  const applyStyle = isScrolled || showMapProducts;

  useEffect(() => {
    const handleScroll = () => {
      // Check if the page is at the top
      const isAtTop = window.scrollY === 0;
      // Handle scroll events here
      if (isAtTop) {
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
      }
    };
    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`sticky top-[var(--navigation-bar-offset)] z-[1000] px-16 h-28 grid grid-cols-[53rem_auto_1fr] items-center grow gap-5 transition-[height] duration-200 bg-colorGrey50 ${
        applyStyle ? "border-b border-colorGrey200 shadow h-[5.5rem]" : ""
      }`}
    >
      <ProductTypeList />
      <FiltersModal />
      <FavoritesOnly />
    </div>
  );
}

export default ProductsOperationsBar;
