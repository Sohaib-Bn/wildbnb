import { useTranslation } from "react-i18next";
import { useAppContext } from "../context/AppContext";
import CurrencyChanger from "./CurrencyChanger";
import FooterLink from "./FooterLink";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useEffect, useRef } from "react";

function Footer() {
  const { t } = useTranslation("footer");

  const footerRef = useRef();

  const { setIsMapButtonVisible } = useAppContext();

  useEffect(() => {
    const options = {
      root: null, // use the viewport as the root
      rootMargin: `100px`,
      threshold: 0, // consider an element visible if 50% or more of it is in the viewport
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setIsMapButtonVisible(false);
        if (!entry.isIntersecting) setIsMapButtonVisible(true);
      });
    }, options);

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, [footerRef, setIsMapButtonVisible]);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="bg-colorGrey800 mt-10 px-16 text-colorGrey300 flex justify-between items-center py-7 "
    >
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <p>&copy; {new Date().getFullYear()} the wild oasis</p>
          <ul className="flex gap-2">
            <FooterLink>{t("terms")}</FooterLink>
            <FooterLink>{t("policy")}</FooterLink>
          </ul>
        </div>
        <hr />
        <div className="flex items-center gap-3">
          {t("author")}{" "}
          <a
            href="https://sodev.live"
            className="hover:underline transition-all duration-300"
          >
            Sohaib Benyamna
          </a>
          <span>&bull;</span>
          <p>Design inspired from airbnb</p>
          <span>&bull;</span>
          <p>The platform still in the beta copy</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-8">
        <CurrencyChanger />
        <div className="flex items-center gap-4 ">
          <a href="/" className="hover:text-colorBrand500 transition-all">
            <FaInstagram size={23} />
          </a>
          <a href="/" className="hover:text-colorBrand500 transition-all">
            <FaFacebook size={23} />
          </a>
          <a href="/" className="hover:text-colorBrand500 transition-all">
            <FaTwitter size={23} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
