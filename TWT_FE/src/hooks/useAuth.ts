import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { LoginProps } from '../api/type';
import {
  editNickNameFn,
  editProfileImgFn,
  getEmitterFn,
  loginFn,
  logoutFn,
} from '../api/auth';
import { getUserInfoFn } from '../api';
import { subscribeFn } from '../api/auth';

//로그인
export const useLogin = () => {
  const { mutate: loginUser, isLoading: logining } = useMutation(
    (userData: LoginProps) => loginFn(userData),
    {
      onSuccess: (data) => {
        localStorage.setItem('accessToken', data.accessToken);
        subscribeFn();
      },
      onError: (error: any) => {},
    }
  );
  return { loginUser, logining };
};

//로그아웃
export const useLogout = () => {
  const {
    mutate: logout,
    isLoading: logouting,
    isError: logoutError,
  } = useMutation(() => logoutFn(), {
    onSuccess: () => {
      localStorage.removeItem('accessToken');
    },
  });
  return { logout, logouting, logoutError };
};

export const useEditNickName = (nickname: string) => {
  const {
    mutate: editNickName,
    isLoading: nickNameEditing,
    isError: nickNameError,
  } = useMutation(() => editNickNameFn(nickname), {});
  return { editNickName, nickNameEditing, nickNameError };
};

export const useEditProfileImg = (file: File) => {
  const queryClient = useQueryClient();
  const {
    mutate: editProfileImg,
    isLoading: editingProfileImg,
    isError: editingProfileImgError,
  } = useMutation(() => editProfileImgFn(file), {
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo']);
    },
    onError: (error) => console.log('업로드 중 오류 발생'),
  });
  return { editProfileImg, editingProfileImg, editingProfileImgError };
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

//알람 정보
export const useGetEmitters = () => {
  const {
    data: emitters,
    isLoading: emittersGetting,
    isError: emittersError,
  } = useQuery(['emitters'], () => getEmitterFn(), {});
  return { emitters, emittersGetting, emittersError };
};
