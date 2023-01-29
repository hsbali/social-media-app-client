import { Suspense, lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

import Loadable from "../components/loaders/Loadable";
import LinearProgressLoader from "../components/loaders/LinearProgressLoader";
import AuthProvider from "../components/AuthProvider";
import RootLayout from "../components/layouts/RootLayout";

const HomePage = Loadable(lazy(() => import("../pages/HomePage")));
const AccountPage = Loadable(lazy(() => import("../pages/AccountPage")));

const appRoutes: RouteObject = {
  path: "/",
  element: (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  ),
  children: [
    {
      index: true,
      element: (
        <>
          <Suspense fallback={<LinearProgressLoader />}>
            <Navigate to="/home" />
          </Suspense>
        </>
      ),
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/account",
      element: <AccountPage />,
    },
  ],
};

export default appRoutes;
