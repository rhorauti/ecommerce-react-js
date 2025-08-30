import { useRoutes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "@src/components/Loading/Loading";
import ProtectedRoute from "@src/components/ProtectedRoute/ProtectedRoute";

const Home = lazy(() => import("@src/pages/Home/Home"));
const Signup = lazy(() => import("@src/pages/Auth/Signup/Signup"));
const Login = lazy(() => import("@src/pages/Auth/Login/Login"));
const PasswordRecover = lazy(() => import("@src/pages/Auth/PasswordRecover/PasswordRecover"));
const NewPassword = lazy(() => import("@src/pages/Auth/NewPassword/NewPassword"));
const RedirectPage = lazy(() => import("@src/pages/Auth/Redirect/Redirect"));
const WishList = lazy(() => import("@src/pages/WishList/WishList"));
const MyAccount = lazy(() => import("@src/pages/MyAccount/MyAccount"));
const ProductList = lazy(() => import("@src/pages/ProductList/ProductList"));
const ProductDetails = lazy(() => import("@src/pages/ProductDetails/ProductDetails"));
const Cart = lazy(() => import("@src/pages/Cart/Cart"));
const AdmProducts = lazy(() => import("@src/pages/Adm/AdmProducts/AdmProducts"));

const RoutesApp = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading isLoading={true} />}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/home",
      element: (
        <Suspense fallback={<Loading isLoading={true} />}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/signup",
      element: (
        <Suspense fallback={<Loading isLoading={true} />}>
          <Signup />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Loading isLoading={true} />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/new-password",
      element: (
        <Suspense fallback={<Loading isLoading={true} />}>
          <NewPassword />
        </Suspense>
      ),
    },
    {
      path: "/password-recover",
      element: (
        <Suspense fallback={<Loading isLoading={true} />}>
          <PasswordRecover />
        </Suspense>
      ),
    },
    {
      path: "/redirect",
      element: (
        <Suspense fallback={<Loading isLoading={true} />}>
          <RedirectPage />
        </Suspense>
      ),
    },
    {
      path: "/wish-list",
      element: (
        <Suspense fallback={<Loading isLoading={true} />}>
          <WishList />
        </Suspense>
      ),
    },
    {
      path: "/my-account",
      element: (
        <Suspense fallback={<Loading isLoading={true} />}>
          <MyAccount />
        </Suspense>
      ),
    },
    {
      path: "/product-list/search",
      element: (
        <Suspense fallback={<Loading isLoading={true} />}>
          <ProductList />
        </Suspense>
      ),
    },
    {
      path: "/product-details/:idProduct",
      element: (
        <Suspense fallback={<Loading isLoading={true} />}>
          <ProductDetails />
        </Suspense>
      ),
    },
    {
      path: "/cart",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<Loading isLoading={true} />}>
            <Cart />
          </Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: "/adm/products",
      element: (
        <Suspense fallback={<Loading isLoading={true} />}>
          <AdmProducts />
        </Suspense>
      ),
    },
    { path: "*", element: <Navigate to="/login" /> },
  ]);

  return routes;
};

export default RoutesApp;
