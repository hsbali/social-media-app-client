import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import LinearProgressLoader from "../loaders/LinearProgressLoader";

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { isAuthenticated, fetching } = useAuth(true);

  if (!isAuthenticated && fetching) {
    return <LinearProgressLoader />;
  }

  return <>{children}</>;
}
