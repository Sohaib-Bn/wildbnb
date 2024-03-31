function FormRow({ children, label, error, orientaion = "horizontal" }) {
  return (
    <div
      className={`w-full gap-y-2 ${
        orientaion === "horizontal"
          ? "grid grid-cols-[8rem,1fr] items-center"
          : "flex flex-col"
      }`}
    >
      {label && (
        <label
          className={`${
            orientaion !== "horizontal" ? "text-xs font-medium" : "text-sm"
          }`}
          htmlFor={children.props.id}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="text-colorRed700 text-sm ml-1 col-start-2">{error}</p>
      )}
    </div>
  );
}

export default FormRow;
