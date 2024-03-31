import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from "@mui/styles";
import { FormControlLabel } from "@mui/material";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  checkbox: {
    transform: "scale(1.3)",
    marginRight: "10px",

    "&.Mui-checked": {
      color: "var(--color-black-light)",
    },
  },
  label: {
    fontSize: "1.1rem",
    fontFamily: "inherit",
  },
}));

function SelectCheckBox({ value, setValue, options }) {
  const handleCheckBoxChange = (option) => {
    const newValue = value.includes(option)
      ? value.filter((item) => item !== option)
      : [...value, option];

    // action
    setValue(newValue);
  };

  const classes = useStyles();
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
                className={classes.checkbox}
              />
            }
            label={t(`glossary:${option.label}`)}
            classes={{ label: classes.label }}
          />
        </div>
      ))}
    </div>
  );
}

export default SelectCheckBox;
