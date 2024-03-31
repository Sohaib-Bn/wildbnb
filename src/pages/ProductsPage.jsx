import { useAppContext } from "../context/AppContext";

import Products from "../features/Products/Products";
import ProductsContext from "../context/ProductsContext";
import ButtonMap from "../ui/ButtonMap";
import ProductsOperationsBar from "../features/Products/ProductsOperationsBar";
import MapProducts from "../features/Products/MapProducts";

function ProductsPage() {
  const { isMapButtonVisible, showMapProducts } = useAppContext();

  return (
    <ProductsContext>
      <div
        className={`flex flex-col relative ${showMapProducts ? " h-full" : ""}`}
      >
        <ProductsOperationsBar />
        {showMapProducts && <MapProducts />}
        <div className="px-14">
          {!showMapProducts && <Products />}
          <div
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[1010] transition-all duration-200 ${
              !isMapButtonVisible ? "opacity-0 invisible" : ""
            }`}
          >
            <ButtonMap />
          </div>
        </div>
      </div>
    </ProductsContext>
  );
}

export default ProductsPage;
