import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLogin } from '../hooks/useAuth';

type User = {
  email: string;
  nickName: string;
  profileUrl: string;
};

type UserContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const { loginUser } = useLogin();

  const login = async (userData) => {
    try {
      const data = await loginUser(userData);
      setUser({
        email: data.email,
        nickName: data.nickName,
        profileUrl: data.profileUrl,
      });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    // 로그아웃 로직을 구현하고, setUser(null)로 유저 정보 초기화
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
