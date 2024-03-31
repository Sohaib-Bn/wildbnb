import LanguageChanger from "./LanguageChanger";
import AccountMenu from "./AccountMenu";
import Wishlist from "./Wishlist";

function User() {
  return (
    <div className="user flex items-center gap-2 grow-[0.6] justify-end">
      <Wishlist />
      <LanguageChanger />
      <AccountMenu />
    </div>
  );
}

export default User;
