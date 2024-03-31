// import MuiSwitch, { switchClasses } from "@mui/joy/Switch";
import MuiSwitch from "@mui/material/Switch";

export default function Switch({ checked }) {
  return (
    <MuiSwitch
      checked={checked}
      sx={() => ({
        pointerEvents: "none",
        display: "inherit",
        "--Switch-thumbSize": "18px",
        "--Switch-trackWidth": "42px",
        "--Switch-trackHeight": "22px",
        "--Switch-trackBackground": "var(--color-black-light-800)",
        ".Mui-checked": {
          ".MuiSwitch-thumb": {
            backgroundColor: "var(--color-brand-600)",
          },
        },
        ".css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
          {
            backgroundColor: "var(--color-brand-600)",
          },
      })}
    />
  );
}

// [theme.getColorSchemeSelector("dark")]: {
//   "--Switch-trackBackground": "rgba(255 255 255 / 0.4)",
// },
// [`&.${switchClasses.checked}`]: {
//   "--Switch-trackBackground": "var(--color-brand-600)",
//   "&:hover": {
//     "--Switch-trackBackground": "var(--color-brand-600)",
//   },
// },
