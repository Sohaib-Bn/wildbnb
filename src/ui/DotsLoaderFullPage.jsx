import { createPortal } from "react-dom";

function DotsLoaderFullPage({ opacity = false }) {
  return createPortal(
    <div
      className={`h-screen fixed flex items-center justify-center ${
        opacity ? "bg-colorGrey50/75" : "bg-colorGrey50"
      }
      } top-0 right-0 w-screen z-[1002]`}
    >
      <div className="rounded-full aspect-[1] w-[8px] animate-dotsDark" />
    </div>,
    document.body
  );
}

export default DotsLoaderFullPage;
