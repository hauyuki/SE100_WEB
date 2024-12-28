import { AuthRequest, AuthResponse, UserInfoModel } from "../models/Auth";
import { apiGet, apiPost } from "../utils";

export const AuthsApis = {
  login(request: AuthRequest): Promise<AuthResponse> {
    return apiPost("/auth/sign-in", request);
  },
  register(request: AuthRequest): Promise<AuthResponse> {
    return apiPost("/auth/sign-up", request);
  },
  getUserInfo(id: number): Promise<UserInfoModel> {
    return apiGet(`/auth/${id}`);
  },
};
