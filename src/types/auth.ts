export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginUser {
  id: string;
  username: string;
  displayName: string;
}

export interface LoginResult {
  token: string;
  user: LoginUser;
}
