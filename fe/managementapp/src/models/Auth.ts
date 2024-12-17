export type AuthModel = {
  username: string;
  password: string;
};
export type AuthResponse = {
  username: string;
  role: string;
  accessToken: string;
};
export type AuthRequest = Omit<AuthModel, "id">;
export type RegisterRequest = AuthModel & {
  name: string;
};
export type UserInfoModel = {
  name: string;
  username: string;
  avatar: string;
  site_id: number;
  is_calendar_authorize: boolean;
};
