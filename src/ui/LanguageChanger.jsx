import "/node_modules/flag-icons/css/flag-icons.min.css";

import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { capitalize } from "../utils/helpers";
import { SUPPORTED_LANGUAGES } from "../utils/constants";

function LanguageChanger() {
  const buttonStyle = {
    padding: "0.7rem 1rem",
    color: "var(--color-black)",
    borderRadius: "9999px",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    gap: "0.5rem",
    alignItems: "center",
    display: "flex",
    textTransform: "inherit",
    fontFamily: "inherit",
    fontWeight: "meduim",

    "&:hover": { backgroundColor: "var(--color-zinc-200)" },
  };

  // Merge styles based on hover state
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e, code) => {
    code && i18n.changeLanguage(code);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={buttonStyle}
      >
        <HiOutlineGlobeAlt size={22} />
        <span>
          {capitalize(SUPPORTED_LANGUAGES[i18n.language]?.name.split(",")[0])} (
          {SUPPORTED_LANGUAGES[i18n.language]?.countryCode?.toUpperCase()})
        </span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(e) => handleClose(e, null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          style: {
            padding: "0",
            transform: "translateX(-15px)",
            borderRadius: "8px",
            boxShadow: "0 2px 6px 6px rgb(0 0 0 / 0.03)",
            backgroundColor: "var(--color-grey-50)",
          },
        }}
      >
        {Object.keys(SUPPORTED_LANGUAGES).map((lng) => (
          <MenuItem
            // selected={i18n.language === lng}
            disabled={i18n.language === lng}
            style={{
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            onClick={(e) => handleClose(e, lng)}
            key={lng}
          >
            <span
              className={`fi fi-${SUPPORTED_LANGUAGES[lng]?.countryCode}`}
            />
            <span
              className={`${
                SUPPORTED_LANGUAGES[lng].code === "ar" ? "font-cairo" : ""
              }`}
            >
              {SUPPORTED_LANGUAGES[lng].name}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default LanguageChanger;
