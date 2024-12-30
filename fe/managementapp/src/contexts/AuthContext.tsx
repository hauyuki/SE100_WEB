import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserInfoModel } from "../models/Auth";
import { useGetUserProfile } from "../hooks/auth/query";

interface AuthContextProps {
  setUserId: (val: number) => void;
  user: UserInfoModel | undefined;
}
export const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  setUserId: (val: number) => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfoModel | undefined>(undefined);
  const [userId, setUserId] = useState<number>(0);
  const { data: userInfo } = useGetUserProfile();
  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  return (
    <AuthContext.Provider
      value={{
        setUserId,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
