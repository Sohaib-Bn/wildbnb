import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useAppContext } from "../context/AppContext";

function AppLayout() {
  const { showMapProducts } = useAppContext();

  return (
    <div className="transition-all duration-800 grid grid-rows-[var(--navigation-bar-offset)_1fr_auto] min-h-screen bg-colorGrey50 relative">
      <Header />
      <main>
        <Outlet />
      </main>
      {!showMapProducts && <Footer />}
    </div>
  );
}

export default AppLayout;
