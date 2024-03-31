import * as React from "react";
import MuiSwitch, { switchClasses } from "@mui/joy/Switch";

export default function Switch({ checked }) {
  return (
    <MuiSwitch
      checked={checked}
      sx={(theme) => ({
        pointerEvents: "none",
        display: "inherit",
        "--Switch-thumbShadow": theme.vars.shadow.sm,
        "--Switch-thumbSize": "18px",
        "--Switch-trackWidth": "42px",
        "--Switch-trackHeight": "22px",
        "--Switch-trackBackground": "var(--color-black-light-800)",

        [theme.getColorSchemeSelector("dark")]: {
          "--Switch-trackBackground": "rgba(255 255 255 / 0.4)",
        },
        [`&.${switchClasses.checked}`]: {
          "--Switch-trackBackground": "var(--color-brand-600)",
          "&:hover": {
            "--Switch-trackBackground": "var(--color-brand-600)",
          },
        },
      })}
    />
  );
}
