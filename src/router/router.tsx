import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/auth/signup";
import Login from "../pages/auth/login";
import Home from "../pages/home/home";
import NewPassword from "../pages/auth/newPassword";
import { PasswordRecover } from "../pages/auth/passwordRecover";
import Redirect from "@src/pages/auth/redirect";
import AdmProducts from "@src/pages/adm/admProducts";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/password-recover" element={<PasswordRecover />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/adm/products" element={<AdmProducts />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
