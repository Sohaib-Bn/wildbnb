import { useTranslation } from "react-i18next";

function SelectHorizontal({ options, value, setValue }) {
  return (
    <div className="grid grid-cols-3 items-center w-full">
      {options.map((op, index) => (
        <Option
          option={op}
          key={op.value}
          index={index}
          setValue={setValue}
          value={value}
          numOptions={options.length - 1}
        />
      ))}
    </div>
  );
}

function Option({ option, index, setValue, value, numOptions }) {
  const { t, i18n } = useTranslation(["glossary"]);

  let optionStyle;
  let selectedOptionStyle;

  function handleClick(e) {
    e.preventDefault();
    setValue(option.value);
  }

  // Define styles for activeOption option
  if (option.value === value)
    selectedOptionStyle = "bg-colorBlackLight text-colorWhite";

  // Define styles for the first and last options
  if (index === 0)
    optionStyle = `rounded-${i18n.language === "ar-DZ" ? "r" : "l"}-xl`; // FIRST OPTION
  if (index === numOptions)
    optionStyle = `rounded-${i18n.language === "ar-DZ" ? "l" : "r"}-xl`; // LAST OPTION

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-5 grow text-center font-medium border border-colorGrey300 transition-all hover:border-colorBlackLight ${optionStyle} ${selectedOptionStyle}`}
    >
      {t(`glossary:${option.label}`)}
    </button>
  );
}

export default SelectHorizontal;
