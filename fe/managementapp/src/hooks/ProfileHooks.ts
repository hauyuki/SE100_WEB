import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { User } from "../models"
import { UserApi } from "../api/UserApi"
const USER_PROFILE_KEY = 'userProfileKey'
type UseProfileQueryOptions = Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>
export const useProfile = (options?: UseProfileQueryOptions) => {
    return useQuery({
        ...options,
        queryKey: [USER_PROFILE_KEY],
        queryFn: UserApi.getUserProfile
    })
}