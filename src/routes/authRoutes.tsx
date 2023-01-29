import { lazy } from "react";
import { Outlet, RouteObject } from "react-router-dom";

import Loadable from "../components/loaders/Loadable";

const LoginPage = Loadable(lazy(() => import("../pages/LoginPage")));
const SignupPage = Loadable(lazy(() => import("../pages/SignupPage")));

const authRoutes: RouteObject = {
  path: "/",
  element: <Outlet />,
  children: [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ],
};

export default authRoutes;
