import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useUser } from "../features/auth/useUser";
import { useNavigate } from "react-router-dom";
import { useProductsByIds } from "../features/Products/useProductsByIds";
import { formatCurrency } from "../utils/helpers";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import Skeleton from "react-loading-skeleton";

function Wishlist() {
  const [anchorEl, setAnchorEl] = useState(null);

  const { isAuthorized } = useAppContext();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    if (!isAuthorized) {
      navigate("/login");
      return;
    }

    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="px-4 py-2 rounded-full transition-all hover:bg-colorZind200 text-colorBlack font-normal"
      >
        Wishlist
      </button>
      {isAuthorized && open && (
        <WishlistMenu
          handleClose={handleClose}
          open={open}
          anchorEl={anchorEl}
        />
      )}
    </>
  );
}

export default Wishlist;

function WishlistMenu({ anchorEl, open, handleClose }) {
  const { user = {} } = useUser();
  const likedProducts = user?.user_metadata?.likedProducts || [];

  const { isLoading, products } = useProductsByIds(likedProducts);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      PaperProps={{
        style: {
          width: "max-content",
          minWidth: "15rem",
          minHeight: "5rem",
          maxHeight: "20rem",
          padding: "0",
          borderRadius: "8px",
          boxShadow: "0 2px 6px 6px rgb(0 0 0 / 0.03)",
          backgroundColor: "var(--color-grey-50)",
          overflowX: "hidden",
          overflowY: "scrool",
        },
        className: "hide-scrollbar",
      }}
    >
      {isLoading && <WishlistSkeleton />}
      {!isLoading && !products.length && (
        <div className="w-full h-full flex items-center justify-center py-5">
          Wishlist is empty
        </div>
      )}
      {!isLoading &&
        products.map((product) => (
          <WishlistItem
            key={product.id}
            product={product}
            handleClose={handleClose}
          />
        ))}
    </Menu>
  );
}

function WishlistItem({ product, handleClose }) {
  const navigate = useNavigate();
  const { selectedCurrency, convertedCurrency } = useAppContext();
  const { i18n } = useTranslation();

  const { id, averageRate, name, regularPrice, image, location } = product;

  const regularPriceConverted = regularPrice * convertedCurrency;
  function handleClick() {
    handleClose();
    navigate(`/products/cabins/${id}`);
  }
  return (
    <MenuItem
      style={{
        fontFamily: "inherit",
      }}
      onClick={handleClick}
    >
      <div className="grid grid-cols-[6rem,1fr] gap-4 items-center">
        <figure className="w-[6rem] h-[5rem]">
          <img
            className="object-cover w-full h-full rounded"
            src={image}
            alt="cabin"
          />
        </figure>
        <div className="flex flex-col gap-1">
          <p className="font-medium">{name}</p>
          <p className="text-sm">{location}</p>
          <div className="flex items-center gap-2">
            <p className="font-cairo font-semibold">
              {formatCurrency(
                regularPriceConverted,
                i18n.language,
                selectedCurrency
              )}
            </p>
            <span>&bull;</span>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-xs mb-[1px]">
                <FaStar />
              </span>
              <span>{averageRate}</span>
            </div>
          </div>
        </div>
      </div>
    </MenuItem>
  );
}

function WishlistSkeleton() {
  return Array(2)
    .fill(0)
    .map((_, i) => (
      <MenuItem
        sx={{
          pointerEvents: "none",
        }}
        key={i}
      >
        <div className="grid grid-cols-[6rem,1fr] gap-4 items-center">
          <Skeleton className="rounded" height="75px" />
          <div className="grow flex flex-col">
            <Skeleton className="mb-[3px]" height={17} width="10rem" />
            <Skeleton className="mb-[3px]" height={15} width="7rem" />

            <div className="flex items-center gap-2">
              <Skeleton className="mb-[3px]" height={17} width="4rem" />
              <Skeleton className="mb-[3px]" height={17} width="3rem" />
            </div>
          </div>
        </div>
      </MenuItem>
    ));
}
