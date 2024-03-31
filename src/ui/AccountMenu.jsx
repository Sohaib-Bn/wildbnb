import { useState } from "react";
import { HiOutlineBars3, HiUserCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useLogout } from "../features/auth/useLogout";
import { useUser } from "../features/auth/useUser";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import DotsLoaderFullPage from "./DotsLoaderFullPage";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { isAuthorized } = useAppContext();
  const { user = {} } = useUser();
  const { isPending, logout } = useLogout();

  const userAvatar = user?.user_metadata?.picture || "";

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isPending) return <DotsLoaderFullPage opacity={true} />;

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip sx={{}} title="Account settings">
          <button
            className="px-[0.9rem] py-2 border border-colorGrey200 hover:shadow-md rounded-full flex items-center gap-3"
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <HiOutlineBars3 size={20} />
            {userAvatar !== "" ? (
              <img className="w-9 rounded-full" src={userAvatar} alt="avatar" />
            ) : (
              <HiUserCircle size={35} color="#71717a" />
            )}
          </button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          style: {
            width: "14rem",
            padding: "0",
            transform: "translateY(10px)",
            borderRadius: "8px",
            boxShadow: "0 2px 6px 6px rgb(0 0 0 / 0.03)",
            backgroundColor: "var(--color-grey-50)",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {isAuthorized && (
          <MenuItem
            style={{
              fontSize: "0.85rem",
              fontFamily: "inherit",
              padding: "0.8rem 1rem",
            }}
            onClick={() => {
              handleClose();
              navigate("/account");
            }}
          >
            Account
          </MenuItem>
        )}

        {isAuthorized && (
          <MenuItem
            style={{
              fontSize: "0.85rem",
              fontFamily: "inherit",
              padding: "0.8rem 1rem",
            }}
            onClick={() => {
              handleClose();
              navigate("/stays");
            }}
          >
            your stays
          </MenuItem>
        )}

        {!isAuthorized && (
          <MenuItem
            style={{
              fontSize: "0.85rem",
              fontFamily: "inherit",
              fontWeight: "500",
              padding: "0.8rem 1rem",
            }}
            onClick={() => {
              handleClose();
              navigate("/signup");
            }}
          >
            Sign up
          </MenuItem>
        )}

        {!isAuthorized && (
          <MenuItem
            style={{
              fontSize: "0.85rem",

              fontFamily: "inherit",
              padding: "0.8rem 1rem",
            }}
            onClick={() => {
              handleClose();
              navigate("/login");
            }}
          >
            Log in
          </MenuItem>
        )}

        <Divider />

        <MenuItem
          style={{
            fontSize: "0.85rem",
            fontFamily: "inherit",
            padding: "0.8rem 1rem",
          }}
          onClick={handleClose}
        >
          Help center
        </MenuItem>

        {isAuthorized && (
          <MenuItem
            style={{
              color: "var(--color-red-800)",
              fontSize: "0.85rem",
              fontFamily: "inherit",
              padding: "0.8rem 1rem",
            }}
            onClick={() => {
              handleClose();
              logout();
            }}
          >
            Log out
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
