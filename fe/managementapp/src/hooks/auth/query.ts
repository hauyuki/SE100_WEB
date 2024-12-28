import { useQuery } from "@tanstack/react-query";
import { USER_PROFILE } from "../../utils/query-key";
import { AuthsApis } from "../../api/AuthApis";

export const useGetUserProfile = (userId: number) => {
  return useQuery({
    queryKey: [USER_PROFILE],
    queryFn: () => AuthsApis.getUserInfo(userId),
  });
};
