import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { LoginProps, JoinProps } from '../api/type';
import {
  editNickNameFn,
  editProfileImgFn,
  getEmitterFn,
  loginFn,
  logoutFn,
  joinFn,
  nicknameFn,
  verifyFn,
} from '../api/auth';
import { getUserInfoFn } from '../api';
import { subscribeFn } from '../api/auth';

//로그인
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate: loginUser, isLoading: logining } = useMutation(
    (userData: LoginProps) => loginFn(userData),
    {
      onSuccess: (data) => {
        localStorage.setItem('accessToken', data.accessToken);
        subscribeFn();
        queryClient.invalidateQueries(['userInfo']);
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

//닉네임 변경
export const useEditNickName = (nickname: string) => {
  const {
    mutate: editNickName,
    isLoading: nickNameEditing,
    isError: nickNameError,
  } = useMutation(() => editNickNameFn(nickname), {});
  return { editNickName, nickNameEditing, nickNameError };
};

//프로필 변경
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

//회원가입
export const useJoin = () => {
  const {
    mutate: joinUser,
    isLoading: joining,
    isSuccess: joinSuccess,
    isError: joinError,
  } = useMutation((userData: JoinProps) => joinFn(userData));
  return { joinUser, joining, joinSuccess, joinError };
};

type HandleStepValidationFunction = (
  stepName: string,
  isValid: boolean
) => void;

// setError 함수의 타입 정의
type SetErrorFunction = <FieldName extends keyof JoinProps>(
  field: FieldName,
  error: { type: string; message: string }
) => void;
//닉네임 중복검사 요청
export const useCheckNickname = (
  handleStepValidation: HandleStepValidationFunction,
  setError: SetErrorFunction
) => {
  const {
    mutate: checkNickname,
    isLoading: isCheckingNickname,
    isSuccess: checkingNicknameSuccess,
  } = useMutation((nickname: string) => nicknameFn(nickname), {
    onSuccess: (data) => {
      handleStepValidation('nickName', true);
    },
    onError: (error: any) => {
      handleStepValidation('nickName', false);
      setError('nickName', {
        type: 'manual',
        message: '이미 사용 중인 닉네임입니다.',
      });
    },
  });
  return { checkNickname, isCheckingNickname, checkingNicknameSuccess };
};

//인증 코드 요청
export const useVerifyCode = (
  handleStepValidation: HandleStepValidationFunction,
  setError: SetErrorFunction
) => {
  const [returnCode, setReturnCode] = useState<number | null>(null);
  const {
    mutate: verifyEmail,
    isLoading: isVerifyingEmail,
    isSuccess: verifyingEmailSuccess,
  } = useMutation((email: string) => verifyFn(email), {
    onSuccess: (data) => {
      handleStepValidation('email', true);
      setReturnCode(data);
    },
    onError: (error: any) => {
      setError('email', {
        type: 'manual',
        message: '인증 요청 에러! 다시 시도해주세요.',
      });
    },
  });
  return { verifyEmail, isVerifyingEmail, verifyingEmailSuccess, returnCode };
};
