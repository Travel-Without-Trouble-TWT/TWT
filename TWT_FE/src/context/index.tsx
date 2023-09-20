import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from 'react';
import { useUserInfo } from '../hooks/useAuth';

type User = {
  email: string;
  nickName: string;
  profileUrl: string;
};

const accessToken = localStorage.getItem('accessToken');
export const UserContext = createContext<{
  isLogin: boolean;
  user: User | null;
}>({
  isLogin: accessToken !== null ? true : false,
  user: null,
});

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext는 UserProvider 내에서 사용해야 합니다');
  }
  return context;
}

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [isLogin, setIsLogin] = useState<boolean>(
    accessToken !== null ? true : false
  );
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(
    () => ({ isLogin, setIsLogin, user }),
    [isLogin, setIsLogin, user]
  );
  const { userInfo, userInfoLoading, userInfoError } = useUserInfo();
  useEffect(() => {
    if (isLogin) {
      if (!userInfoLoading && !userInfoError) {
        setUser(userInfo);
      }
    }
  }, [isLogin, userInfo, userInfoLoading, userInfoError]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
