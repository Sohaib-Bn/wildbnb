function Button({ onClick, children, round, variation, size, ...props }) {
  let style;
  if (variation === "primary")
    style = `text-colorWhite px-6 py-[14px] font-medium transition-colors duration-300 bg-colorBlackLight hover:bg-colorBlack`;

  if (variation === "secondary")
    style =
      "bg-none text-colorGrey900 px-6 py-[14px] font-medium transition-colors duration-300 hover:bg-colorGrey100";

  if (variation === "tertiary")
    style = `text-colorWhite px-6 py-[14px] font-medium transition-colors duration-300 bg-colorBrand800 hover:bg-colorBrand900 w-full`;

  if (variation === "login")
    style = `text-colorWhite px-6 py-[14px] font-medium transition-colors duration-300 bg-colorBrand800 hover:bg-colorBrand900 w-full rounded-sm`;

  if (variation === "underline")
    style =
      "bg-none text-colorGrey900 px-4 py-[10px] transition-colors duration-300 flex items-center justifiy-center gap-2 text-md font-medium underline px-2 hover:bg-colorGrey100";

  return (
    <button
      {...props}
      className={`${style} ${
        round ? "rounded-full" : "rounded-lg"
      } text-inherit ${size === "small" ? "text-sm" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  variation: "primary",
};

export default Button;
