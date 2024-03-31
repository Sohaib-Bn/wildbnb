import { useTranslation } from "react-i18next";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";

function ProductTypeLink({ icon, label }) {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation("header");
  const navigate = useNavigate();

  const handleNavLinkClick = (e) => {
    e.preventDefault();
    // Get the current search parameters
    const currentSearchParams = new URLSearchParams(searchParams);

    // Construct the new URL with the updated productType parameter
    const newUrl = `/products/${label.toLowerCase()}?${currentSearchParams.toString()}`;

    // Use the navigate function to update the URL without a full page reload
    navigate(newUrl);
  };

  return (
    <div className="h-full flex items-center" key={label}>
      <NavLink
        to={`/products/${label.toLowerCase()}`}
        className="h-full flex items-center"
        onClick={handleNavLinkClick}
      >
        {({ isActive }) => (
          <div
            className={`transition-colors duration-200 flex items-center flex-col gap-2 justify-center hover:text-colorBlack hover:border-colorGrey300 h-[4.5rem] ${
              isActive
                ? "border-b-[2.5px] border-colorBlack text-colorBlack/100 cursor-default pointer-events-none"
                : "border-b-[2.5px] border-colorBlack/0 text-colorGrey500 "
            }`}
          >
            <span className="text-[1.55rem]">{icon}</span>
            <span className="text-[0.8rem] font-medium captilized">
              {t(`products_type.${label}`)}
            </span>
          </div>
        )}
      </NavLink>
    </div>
  );
}

export default ProductTypeLink;
