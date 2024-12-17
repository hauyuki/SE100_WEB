import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthRequest, RegisterRequest } from "../../models/Auth";
import { AuthsApis } from "../../api/AuthApis";
export const useLogin = () => {
  return useMutation({
    mutationFn: (authRequest: AuthRequest) => AuthsApis.login(authRequest),
  });
};
export const useRegister = () => {
  return useMutation({
    mutationFn: (registerRequest: RegisterRequest) =>
      AuthsApis.register(registerRequest),
  });
};
