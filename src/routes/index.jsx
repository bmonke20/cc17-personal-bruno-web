import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import TopPage from "../userPages/ProductPage/TopPage";
import BottomPage from "../userPages/ProductPage/BottomPage";
import AccessoriesPage from "../userPages/ProductPage/Accessories";
import ProductPage from "../userPages/ProductPage/ProductPage";
import CartPage from "../userPages/CartPage/CartPage";
import PaymentPage from "../userPages/PaymentPage/PaymentPage";
import ProfilePage from "../userPages/ProfilePage/ProfilePage";
import AdminHomePage from "../adminPages/HomePage/AdminHomePage";

const LoginPage = lazy(() => import("../userPages/LoginPage/LoginPage"));
const HomePage = lazy(() => import("../userPages/HomePage/HomePage"));
const MainContainer = lazy(() => import("../component/MainContainer"));
const AdminContainer = lazy(() => import("../component/AdminContainer"));
const AdminLogin = lazy(() => import("../adminPages/LoginPage/AdminLogin"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/product",
        element: <ProductPage />,
        children: [
          { path: "top", element: <TopPage /> },
          { path: "bottom", element: <BottomPage /> },
          { path: "accessories", element: <AccessoriesPage /> },
        ],
      },
      { path: "/cart", element: <CartPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/payment", element: <PaymentPage /> },
  { path: "/profile", element: <ProfilePage /> },

  {
    path: "/admin",
    element: <AdminContainer />,
    children: [{ path: "/", element: <AdminHomePage /> }],
  },
  { path: "/admin/login", element: <AdminLogin /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
