import { useLocation } from "react-router-dom";
import Footer from "./components/footer/footer";
import Menu from "./components/menu/menu";
import RoutesApp from "./router/router";
import SideCart from "./components/sideCart/sidecCart";

function App() {
  const location = useLocation();
  const hiddenPaths = ["/login", "/signup", "/redirect", "/password-recover", "/new-password"];
  const isMenuAndFooterHidden = !hiddenPaths.some((path) => location.pathname.includes(path));

  return (
    <>
      {isMenuAndFooterHidden && <Menu />}
      <div className="container bg-standard-white w-full h-full m-auto">
        <RoutesApp />
        <SideCart />
      </div>
      {isMenuAndFooterHidden && <Footer />}
    </>
  );
}

export default App;
