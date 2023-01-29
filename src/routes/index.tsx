import { createBrowserRouter, Outlet } from "react-router-dom";

import authRoutes from "./authRoutes";
import appRoutes from "./appRoutes";

import ErrorPage from "../pages/ErrorPage";

export default createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [authRoutes, appRoutes],
  },
]);
