import { IoCopy } from "react-icons/io5";
import { useState } from "react";

function CopyPathButton() {
  const [buttonText, setButtonText] = useState("Copy link");

  const copyPath = () => {
    const path = window.location.href;
    navigator.clipboard
      .writeText(path)
      .then(() => {
        setButtonText("Copied");
        setTimeout(() => {
          setButtonText("Copy link");
        }, 1000);
      })
      .catch((err) => {
        console.error("Error copying path: ", err);
      });
  };

  return (
    <button
      onClick={copyPath}
      className="flex items-center gap-4 transition-all p-4 rounded-xl border-colorGrey300 border-solid border-[1px] hover:bg-colorGrey100"
    >
      <span className="text-[1.2rem]">
        <IoCopy />
      </span>
      <span>{buttonText}</span>
    </button>
  );
}

export default CopyPathButton;
