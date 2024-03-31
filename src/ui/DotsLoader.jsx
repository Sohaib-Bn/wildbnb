function DotsLoader({ size, type = "light" }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`rounded-full aspect-[1] ${
          type === "dark" ? "animate-dotsDark" : "animate-dotsLight"
        } ${size === "small" ? "w-[6px]" : "w-[8px]"}`}
      />
    </div>
  );
}

export default DotsLoader;
