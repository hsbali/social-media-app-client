import serverRequest, {
  removeAuthTokenToServerRequest,
  setAuthTokenToServerRequest,
} from "../../utils/serverRequest";

import { IUser, IAuthTokenData } from "../../interfaces/server/user.interface";
import { AxiosError } from "axios";

interface IUserAuthResponse extends IAuthTokenData {
  user: IUser;
}

export async function signupUser(userData: {
  fName: string;
  lName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const { status, data } = await serverRequest.post<IUserAuthResponse>(
      "/auth/local/signup",
      userData
    );
    if (status === 200) setAuthTokenToServerRequest(data.accessToken);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const { status, data } = await serverRequest.post<IUserAuthResponse>(
      "/auth/local/login",
      { email, password }
    );
    if (status === 200) setAuthTokenToServerRequest(data.accessToken);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loadUser() {
  try {
    const { data } = await serverRequest.get<IUser>("/auth/me");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function refreshAccessToken() {
  try {
    const { status, data } = await serverRequest.get<IAuthTokenData>(
      "/auth/refresh"
    );
    if (status === 200) setAuthTokenToServerRequest(data.accessToken);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser({
  id,
  ...userData
}: { id: number } & Partial<IUser>) {
  try {
    const { data } = await serverRequest.patch<Partial<IUser>>(
      `/users/${id}`,
      userData
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    const { status, data } = await serverRequest.delete<{ message: string }>(
      "/auth/logout"
    );
    if (status === 200) removeAuthTokenToServerRequest();
    return data;
  } catch (error) {
    throw error;
  }
}
