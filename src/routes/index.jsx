import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import TopPage from "../pages/ProductPage/TopPage";
import BottomPage from "../pages/ProductPage/BottomPage";
import AccessoriesPage from "../pages/ProductPage/Accessories";
import CartPage from "../pages/CartPage/CartPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";

const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MainContainer = lazy(() => import("../component/MainContainer"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [{ path: "/", element: <HomePage /> }],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/top", element: <TopPage /> },
  { path: "/bottom", element: <BottomPage /> },
  { path: "/accessories", element: <AccessoriesPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/payment", element: <PaymentPage /> },
  { path: "/profile", element: <ProfilePage /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
