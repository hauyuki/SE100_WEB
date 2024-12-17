import { User } from "../models";
import { apiGet } from "../utils";

export const UserApi = {
  getUserProfile(): Promise<User> {
    return apiGet(`/users`);
  },
};
