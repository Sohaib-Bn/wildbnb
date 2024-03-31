import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useProducts } from "./useProducts";
import { formatCurrency } from "../../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { useGeolocation } from "../../hooks/UseGealocation";
import { useAppContext } from "../../context/AppContext";
import { useTranslation } from "react-i18next";

import L from "leaflet";

import DotsLoader from "../../ui/DotsLoader";

function MapProducts() {
  const {
    isLoading: isLoadingLocation,
    position,
    getPosition,
  } = useGeolocation();

  const { isConverting } = useAppContext();

  const { isLoading: isLoadingProducts, products } = useProducts(false);

  const mapProducts = products.map((product) => {
    return {
      id: product.id,
      price: product.regularPrice,
      position: product.coordinates
        .slice(1, -1)
        .split(",")
        .map((coord) => parseFloat(coord.trim())),
    };
  });

  useEffect(() => {
    if (!position) getPosition();
  }, [getPosition, position]);
  const initialView = position ? [position.lat, position.lng] : [36, 3];

  const isLoading = isLoadingLocation || isLoadingProducts || isConverting;

  return (
    <div className="h-full overflow-hidden">
      {isLoading && (
        <div className="absolute flex items-center justify-center rounded-lg w-[5rem] h-[3rem] bg-colorWhite shadow-lg z-[10000] right-[50%] top-32 translate-x-[50%]">
          <DotsLoader type="dark" />
        </div>
      )}
      <MapContainer center={initialView} zoom={7} className="h-[100%] relative">
        <Map mapProducts={mapProducts} initialView={initialView} />
      </MapContainer>
    </div>
  );
}

function Map({ initialView, mapProducts }) {
  const map = useMap();

  useEffect(() => {
    map.setView(initialView, 7);

    return () => {};
  }, [map, initialView]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {mapProducts.map((product) => (
        <MarkerProduct key={product.id} product={product} />
      ))}
    </>
  );
}

function MarkerProduct({ product: { price, position, id } }) {
  const { productType } = useParams();
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/products/${productType}/${id}`);
  }

  const { convertedCurrency, selectedCurrency } = useAppContext();
  const { i18n } = useTranslation();
  const priceConverted = price * convertedCurrency;
  const priceFormatted = formatCurrency(
    priceConverted,
    i18n.language,
    selectedCurrency
  );

  return (
    <Marker
      eventHandlers={{ click: handleClick }}
      position={position}
      icon={customMarker(priceFormatted)}
    />
  );
}

// Custom marker component
function customMarker(priceFormatted) {
  return L.divIcon({
    html: `
    <div class="font-extrabold text-colorBlack bg-colorWhite text-[1rem] rounded-[100px] px-3 flex items-center justify-center transition-all hover:scale-110 shadow-mapPopup hover:shadow-xl">
      <span>${priceFormatted}</span>
    </div>`,
    className: "rounded-full flex item-center justify-center font-cairo",
    iconSize: [80, 35],
  });
}

export default MapProducts;
