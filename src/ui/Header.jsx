import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import User from "./User";

function Header() {
  return (
    <header
      id="header-app"
      className="flex flex-col sticky top-0 z-[1001] bg-colorGrey50"
    >
      <div
        className="header-home flex items-centertransition-[height] duration-200 border-b border-colorGrey200 py-4 px-14 h-full
        "
      >
        <div className="grow flex">
          <Link to="/">
            <img className="w-[5rem] " src="/logo-light.svg" alt="logo" />
          </Link>
        </div>
        <SearchBar />
        <User />
      </div>
    </header>
  );
}

export default Header;
