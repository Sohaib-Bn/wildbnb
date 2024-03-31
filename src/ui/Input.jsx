function Input({ register, variation = "primary", ...props }) {
  const style =
    variation === "primary"
      ? "p-4 bg-colorGrey100 backdrop:blur-md rounded-lg focus:outline-none placeholder:font-light placeholder:text-colorGrey400 w-full focus:border focus:border-colorBlack"
      : "border border-colorGrey300 text-sm bg-transparent rounded-sm focus:outline-none focus:border focus:border-colorBrand800 shadow-sm py-[0.6rem] px-[1.2rem]";
  return <input className={style} {...register} {...props} />;
}

export default Input;
