import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useUserInfo } from '../hooks/useAuth';

type User = {
  email: string;
  nickName: string;
  profileUrl: string;
  memberId: number;
};

export const UserContext = createContext<{
  isLogin: boolean;
  user: User | null;
}>({
  isLogin: false,
  user: null,
});

export function useUserContext() {
  return useContext(UserContext);
}

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const { userInfo, userInfoLoading, userInfoError } = useUserInfo();
  const contextValue = useMemo(() => {
    return { isLogin: !!userInfo, user: userInfo || null };
  }, [userInfo]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
