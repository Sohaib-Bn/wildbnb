import { useEffect, useRef } from "react";
import { useProduct } from "./useProduct";

import Modal from "../../ui/Modal";

function OverView({ setShowHeaderProduct }) {
  const {
    product: { image, description, name },
  } = useProduct();

  const overviewRef = useRef(null);

  useEffect(() => {
    const headerHeight = document.getElementById("header-app").offsetHeight;
    const headerHome = document.querySelector(".header-home");

    const options = {
      root: null,
      rootMargin: `-${headerHeight}px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setShowHeaderProduct(true);
          headerHome.classList.add("hidden");
          headerHome.classList.remove("flex");
        }
        if (entry.isIntersecting) {
          setShowHeaderProduct(false);
          headerHome.classList.remove("hidden");
          headerHome.classList.add("flex");
        }
      });
    }, options);

    if (overviewRef.current) {
      observer.observe(overviewRef.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();
      headerHome.classList.remove("hidden");
      headerHome.classList.add("flex");
    };
  }, [overviewRef, setShowHeaderProduct]);

  return (
    <div
      id="overview-section"
      ref={overviewRef}
      className="grid grid-cols-[1fr_1.2fr] gap-9 justify-start"
    >
      <div className="flex flex-col gap-10">
        <Modal>
          <Modal.Open opens="overview">
            <button>
              <img
                className="rounded-l-3xl hover:brightness-[0.65] transition-all "
                src={image}
                alt="product"
              />
            </button>
          </Modal.Open>
          <Modal.Window name="overview">
            <ImageOverview image={image} />
          </Modal.Window>
        </Modal>
      </div>
      <div>
        <h1 className="font-semibold text-colorBlack text-[1.3rem] mb-[0.6rem]">
          {name}
        </h1>
        <h2 className="font-semibold text-colorBlack text-[1.05rem] mb-3">
          About the proprety
        </h2>
        <p className="leading-7 text-sm">{description}</p>
      </div>
    </div>
  );
}

function ImageOverview({ image }) {
  return <img className="w-full" src={image} alt="product" />;
}

export default OverView;
