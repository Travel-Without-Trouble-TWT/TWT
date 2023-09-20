import { useMutation, useQuery } from '@tanstack/react-query';

import { LoginProps } from '../api/type';
import { loginFn } from '../api/auth';
import { getUserInfoFn } from '../api';

//로그인 로직
export const useLogin = () => {
  const { mutate: loginUser, isLoading: logining } = useMutation(
    (userData: LoginProps) => loginFn(userData),
    {
      onSuccess: (data) => {
        localStorage.setItem('accessToken', data.accessToken);
      },
      onError: (error: any) => {},
    }
  );
  return { loginUser, logining };
};

//유저 정보
export const useUserInfo = () => {
  const {
    data: userInfo,
    isLoading: userInfoLoading,
    isError: userInfoError,
  } = useQuery(['userInfo'], () => getUserInfoFn(), {
    staleTime: 6 * 60 * 60 * 1000,
  });
  return { userInfo, userInfoLoading, userInfoError };
};
