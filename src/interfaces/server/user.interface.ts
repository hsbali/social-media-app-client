export interface IUser {
  id: number;
  fName: string;
  lName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IAuthTokenData {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}
