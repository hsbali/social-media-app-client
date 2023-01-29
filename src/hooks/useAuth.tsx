import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "./store";
import {
  selectAuth,
  loadUserThunk,
  refreshAccessTokenThunk,
} from "../features/auth/auth.slice";

import usePrevious from "../hooks/usePrevious";

export default function useAuth(doAuth: boolean = false) {
  const location = useLocation();
  const prevLocation = usePrevious<typeof location>(location);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    isAuthenticated,
    isLoggedOut,
    doRefresh,
    user,
    accessTokenExpiresIn,
    fetching,
    error,
  } = useAppSelector((state) => selectAuth(state));

  const onAuthError = () => {
    if (!location.pathname.includes("/login")) {
      navigate(
        `/login?redirect_url=${prevLocation.pathname + prevLocation.search}`
      );
    }
  };

  const refreshInterval = useRef<number | null>(null);

  useEffect(() => {
    if (doAuth) {
      dispatch(refreshAccessTokenThunk())
        .unwrap()
        .then(() => dispatch(loadUserThunk()))
        .catch(onAuthError);
    }
  }, [doAuth]);

  useEffect(() => {
    if (doAuth) {
      if (isLoggedOut || error) onAuthError();
    }
  }, [doAuth, error, isLoggedOut]);

  useEffect(() => {
    if (doAuth && doRefresh) {
      if (refreshInterval.current) clearInterval(refreshInterval.current);

      if (accessTokenExpiresIn !== 0) {
        refreshInterval.current = setInterval(function () {
          if (doRefresh)
            dispatch(refreshAccessTokenThunk()).unwrap().catch(onAuthError);
        }, accessTokenExpiresIn);
      }
    }
    return () => {
      if (refreshInterval.current) clearInterval(refreshInterval.current);
    };
  }, [doAuth, doRefresh, accessTokenExpiresIn]);

  return {
    isAuthenticated,
    doRefresh,
    user,
    accessTokenExpiresIn,
    fetching,
    error,
  };
}
