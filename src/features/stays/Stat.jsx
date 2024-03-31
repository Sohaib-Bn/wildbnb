function Stat({ icon, label, value, color }) {
  return (
    <div className=" bg-colorWhite min-h-[7rem] p-[1.4rem] grid grid-cols-[4rem,1fr] border border-colorGrey100 gap-x-[1.2rem] gap-y-[0.4rem] grid-rows-[auto,auto] rounded-lg">
      <div
        className={`aspect-square row-start-1 row-end-3 flex items-center justify-center rounded-full ${
          color === "brand" ? "bg-colorBrand100" : "bg-colorGreen100"
        }`}
      >
        <span
          className={`w-[1.9rem] h-[1.9rem] ${
            color === "brand" ? "text-colorBrand700" : "text-colorGreen700"
          }`}
        >
          {icon}
        </span>
      </div>
      <h5 className="font-semibold text-xs text-colorGrey500 uppercase self-end tracking-[0.4px]">
        {label}
      </h5>
      <p className="text-xl leading-[1] font-cairo font-extrabold">{value}</p>
    </div>
  );
}

export default Stat;
