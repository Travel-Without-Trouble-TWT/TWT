import axios from 'axios';
import {
  BasicResponse,
  ILoginResponse,
  IUserResponse,
  VerifyResponse,
} from './type';
import { LoginProps } from '../pages/Login';
import { JoinProps } from '../pages/Join';

const BASE_URL = 'http://localhost:80000/member';

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const refreshAccessToken = async () => {
  const response = await authApi.get<ILoginResponse>('/refresh');
  return response.data;
};

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalReq = error.config;
    const errorMessage = error.response.data.message as string;
    if (
      errorMessage.includes('인가되지 않은 토큰입니다.') &&
      !originalReq._retry
    ) {
      originalReq._retry = true;
      await refreshAccessToken();
      return authApi(originalReq);
    }
    return Promise.reject(error);
  }
);

export const joinFn = async (user: JoinProps) => {
  const response = await authApi.post<BasicResponse>('/join', user);
  return response.data;
};

export const nicknameFn = async (nickname: string) => {
  const response = await authApi.get<BasicResponse>(
    `/nick?/nickName=${nickname}`
  );
  return response.data;
};

export const loginFn = async (user: LoginProps) => {
  const response = await authApi.post<ILoginResponse>('/login', user);
  return response.data;
};

export const verifyFn = async (email: string) => {
  const response = await authApi.get<VerifyResponse>(`/verify?email=${email}`);
  return response.data;
};

export const logoutFn = async () => {
  const response = await authApi.get<BasicResponse>('/logout');
  return response.data;
};

export const getUserFn = async () => {
  const response = await authApi.get<IUserResponse>('/info');
  return response.data;
};
