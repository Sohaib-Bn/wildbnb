import { FcGoogle } from "react-icons/fc";

function ButtonGoogle({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 border justify-center rounded border-colorGrey300 shadow-sm p-3 hover:bg-colorGrey100 transition-all"
    >
      <FcGoogle size={40} />
      <span className="font-medium text-[.9rem]">Continue with Google</span>
    </button>
  );
}

export default ButtonGoogle;
