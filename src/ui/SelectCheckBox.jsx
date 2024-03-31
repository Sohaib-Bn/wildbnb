import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import { useTranslation } from "react-i18next";

function SelectCheckBox({ value, setValue, options }) {
  const handleCheckBoxChange = (option) => {
    const newValue = value.includes(option)
      ? value.filter((item) => item !== option)
      : [...value, option];

    // action
    setValue(newValue);
  };

  const { t } = useTranslation(["glossary"]);

  return (
    <div className="grid grid-cols-2 w-full">
      {options.map((option) => (
        <div key={option.value}>
          <FormControlLabel
            control={
              <Checkbox
                checked={value.includes(option.value)}
                onChange={() => handleCheckBoxChange(option.value)}
                sx={{
                  transform: "scale(1.3)",
                  marginRight: "10px",
                  "&.Mui-checked": {
                    color: "var(--color-black-light)",
                  },
                  "&:hover ": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              />
            }
            label={t(`glossary:${option.label}`)}
            sx={{
              ".MuiFormControlLabel-label": {
                fontSize: "1rem",
                fontFamily: "inherit",
              },
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default SelectCheckBox;
