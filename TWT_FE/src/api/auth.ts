import axios from 'axios';
import { BasicResponse, IUserResponse, VerifyResponse } from './type';
import { LoginProps, JoinProps } from './type';

const BASE_URL = 'http://13.124.68.229:8080';

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

authApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const refreshAccessToken = async () => {
  const response = await authApi.get('/member/refresh');
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
//추후 로컬스토리지에 저장하기
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

export const editNickNameFn = async (nickname: string) => {
  const response = await authApi.put(
    `/member/edit?nickName=${nickname}`,
    nickname
  );
  return response.data;
};

export const editProfileImgFn = async (file: File | null) => {
  const formData = new FormData();
  if (file !== null) {
    formData.append('file', file);
  }
  const response = await authApi.put('/member/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const loginFn = async (user: LoginProps) => {
  const response = await authApi.post<LoginProps>('/member/login', user);
  return response.data;
};

export const getGoogleTokenFn = async (accessToken: string) => {
  const response = await authApi.get(`/oauth/google?token=${accessToken}`);
  return response.data;
};

export const verifyFn = async (email: string) => {
  const response = await authApi.get<VerifyResponse>(
    `/member/verify?email=${email}`
  );
  return response.data;
};

export const logoutFn = async () => {
  const response = await authApi.post('/member/logout');
  return response.data;
};

export const getUserFn = async () => {
  const response = await authApi.get<IUserResponse>('/member/info');
  return response.data;
};

export const changePasswordFn = async (password: string) => {
  const response = await authApi.put(`/member/password?password=${password}`);
  return response.data;
};

//알람
export const subscribeFn = async () => {
  const response = await authApi.get('/emitter/sub');
  return response.data;
};
//전체알람
export const getEmitterFn = async () => {
  const response = await authApi.get('/emitter/all');
  return response.data;
};
//알람삭제
export const deleteEmitterFn = async (id: number) => {
  const response = await authApi.delete(`/emitter/delete?emitterId=${id}`);
  return response.data;
};
