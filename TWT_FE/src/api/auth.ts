import axios from 'axios';
import {
  BasicResponse,
  ILoginResponse,
  IUserResponse,
  VerifyResponse,
} from './type';
import { LoginProps } from '../pages/Login';
import { JoinProps } from '../pages/Join';

const BASE_URL = 'http://13.124.68.229:8080';

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

authApi.interceptors.request.use((config) => {
  const accessToken = document.cookie;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const refreshAccessToken = async () => {
  const response = await authApi.get<ILoginResponse>('/member/refresh');
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
  const response = await authApi.post<BasicResponse>('/member/join', user);
  return response.data;
};

export const nicknameFn = async (nickname: string) => {
  const response = await authApi.get<BasicResponse>(
    `member/nick?nickName=${nickname}`
  );
  return response.data;
};

export const loginFn = async (user: LoginProps) => {
  const response = await authApi.post<ILoginResponse>('/member/login', user);
  return response.data;
};

export const verifyFn = async (email: string) => {
  const response = await authApi.get<VerifyResponse>(
    `/member/verify?email=${email}`
  );
  return response.data;
};

export const logoutFn = async () => {
  const response = await authApi.get<BasicResponse>('/member/logout');
  return response.data;
};

export const getUserFn = async () => {
  const response = await authApi.get<IUserResponse>('/member/info');
  return response.data;
};
