import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { TiHome } from "react-icons/ti";
import { useProduct } from "./useProduct";
import { useEffect } from "react";

function MapLocation() {
  const {
    product: { coordinates },
  } = useProduct();

  const position = coordinates
    .slice(1, -1) // Remove parentheses
    .split(",") // Split by comma
    .map((coord) => parseFloat(coord.trim())); // Convert strings to numbers

  return (
    <div id="location-section" className="flex flex-col gap-6">
      <h2 className="font-semibold text-colorBlack text-2xl">
        Where you'll be
      </h2>
      <div className="bg-colorGrey100 h-[25rem] relative">
        <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={false}
          className="h-[100%] relative"
        >
          <Map position={position} />
        </MapContainer>
      </div>
    </div>
  );
}

function Map({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 14);

    return () => {};
  }, [map, position]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
      <ResetViewButton position={position} />
    </>
  );
}

function ResetViewButton({ position }) {
  const map = useMap();

  function handleResetView() {
    map.setView(position, 14);
  }

  return (
    <button
      onClick={handleResetView}
      className="shadow-2xl bg-colorBlackLight/90 hover:bg-colorBlack text-colorWhite py-3 px-4 font-medium transition-all duration-300 rounded-full text-xl absolute bottom-5 left-1/2 transform -translate-x-1/2 z-[999]"
    >
      <TiHome />
    </button>
  );
}
export default MapLocation;
