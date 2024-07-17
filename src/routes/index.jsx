import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import TopPage from "../userPages/ProductPage/TopPage";
import BottomPage from "../userPages/ProductPage/BottomPage";
import AccessoriesPage from "../userPages/ProductPage/Accessories";
import ProductPage from "../userPages/ProductPage/ProductPage";
import PaymentPage from "../userPages/PaymentPage/PaymentPage";
import ProfilePage from "../userPages/ProfilePage/ProfilePage";
import CartPage from "../userPages/CartPage/CartPage";
import AdminProduct from "../adminPages/Product/AdminProduct";
import AdminDashboard from "../adminPages/Dashboard/AdminDashboard";
import OrderHistoryForm from "../userPages/HistoryPage/OrderHistory";
import About from "../userPages/AboutPage/About";
import ProtectRoute from "./ProtectRoute";
import RedirectLogin from "./RedirectLogin";

const LoginPage = lazy(() => import("../userPages/LoginPage/LoginPage"));
const HomePage = lazy(() => import("../userPages/HomePage/HomePage"));
const MainContainer = lazy(() => import("../component/MainContainer"));
const AdminContainer = lazy(() => import("../component/AdminContainer"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/login",
        element: (
          <RedirectLogin>
            <LoginPage />
          </RedirectLogin>
        ),
      },
      {
        path: "product",
        element: <ProductPage />,
        children: [
          { path: "top", element: <TopPage /> },
          { path: "bottom", element: <BottomPage /> },
          { path: "accessories", element: <AccessoriesPage /> },
        ],
      },
      { path: "payment", element: <PaymentPage /> },
      { path: "profile/:userId", element: <ProfilePage /> },
      { path: "cart", element: <CartPage /> },
      { path: "order", element: <OrderHistoryForm /> },
      { path: "about", element: <About /> },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectRoute>
        <AdminContainer />
      </ProtectRoute>
    ),
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "product", element: <AdminProduct /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
