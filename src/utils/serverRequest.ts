import axios from "axios";

import { setAlert } from "./alert";

const EXEMPTED_REQUESTS_FOR_ALERT = ["/auth/refresh"];

const serverRequest = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  withCredentials: true,
});

// Adding interceptors for server response error
serverRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!EXEMPTED_REQUESTS_FOR_ALERT.includes(error.config.url)) {
      setAlert({
        message: error.message || "Oops! Something went wrong",
        type: "error",
      });
    }
    return Promise.reject(error);
  }
);

export const setAuthTokenToServerRequest = (token: string) => {
  serverRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthTokenToServerRequest = () => {
  delete serverRequest.defaults.headers.common["Authorization"];
};

export default serverRequest;
