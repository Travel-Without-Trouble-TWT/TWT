import { useMutation } from '@tanstack/react-query';

import { LoginProps } from '../api/type';
import { loginFn } from '../api/auth';

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
