import { useLocation } from "react-router-dom";
import Footer from "@components/Footer/Footer";
import Menu from "@components/Menu/Menu";
import RoutesApp from "@router/router";
import SideCart from "@components/SideCart/SidecCart";
import { ProductProvider } from "@context/productsContext";

function App() {
  const location = useLocation();
  const hiddenPaths = ["/login", "/signup", "/redirect", "/password-recover", "/new-password"];
  const isMenuAndFooterHidden = !hiddenPaths.some((path) => location.pathname.includes(path));

  return (
    <>
      <ProductProvider>
        <div className="flex flex-col min-h-screen">
          {isMenuAndFooterHidden && <Menu />}
          <div className="container grow bg-standard-white w-full h-full m-auto">
            <RoutesApp />
            <SideCart />
          </div>
          {isMenuAndFooterHidden && <Footer />}
        </div>
      </ProductProvider>
    </>
  );
}

export default App;
