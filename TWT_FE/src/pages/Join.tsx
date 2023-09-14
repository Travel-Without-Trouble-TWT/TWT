import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';

import logo from '../assets/logo.png';
import { joinFn, nicknameFn, verifyFn } from '../api/auth';
import Spinner from '../components/Spinner';
import Alerts from '../components/Alerts';

export interface JoinProps {
  nickName: string;
  email: string;
  verificationCode?: string;
  password: string;
  confirmPw?: string;
}

function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    setError,
    watch,
    reset,
  } = useForm<JoinProps>({ mode: 'onBlur' });
  const navigate = useNavigate();
  const [isDuplicated, setIsDuplicated] = useState<string | null>(null);

  const [returnCode, setReturnCode] = useState<string | null>(null);
  const [isVerifyingCode, setIsVerifyingCode] = useState<boolean>(false);
  const [stepStates, setStepStates] = useState({
    nickName: false,
    email: false,
    verificationCode: false,
  });

  //닉네임 유효성 검사
  const isNickNameValid =
    watch('nickName')?.length >= 2 && watch('nickName')?.length <= 8;
  //이메일 유효성 검사
  const isEmailValid = watch('email')?.match(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  );
  //인증코드 유효성 검사
  const isCodeValid = watch('verificationCode')?.length === 6;

  //const {joinUser, joining} =

  //회원가입 mutation
  const { mutate: joinUser, isLoading: joining } = useMutation(
    (userData: JoinProps) => joinFn(userData),
    {
      onSuccess: () => {
        return (
          <>
            <Alerts
              type="success"
              title="🎉 회원가입"
              message="회원가입이 완료되었습니다!"
            />
            {navigate('/login')}
          </>
        );
      },
      onError: (error: any) => {
        if (Array.isArray((error as any).response.data.error)) {
          (error as any).response.data.error.forEach((element: any) => {
            return (
              <>
                <Alerts
                  type="error"
                  title="회원가입"
                  message="회원가입에 실패하였습니다. 다시 시도해주세요."
                />

                {navigate('/join')}
              </>
            );
          });
        } else {
          //alert
        }
      },
    }
  );

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<JoinProps> = async (values) => {
    if (!Object.values(stepStates).every((state) => state)) {
      return;
    }
    joinUser(values);
  };

  const handleCheckCode = () => {
    if (watch('verificationCode') === returnCode) {
      return (
        <Alerts
          type="success"
          title="인증 완료"
          message="인증이 완료되었습니다!"
        />
      );
    } else {
      return (
        <Alerts
          type="error"
          title="인증 실패"
          message="인증코드가 맞지 않습니다. 다시 시도해주세요."
        />
      );
    }
  };

  const handleStepValidation = (stepName: string, isValid: boolean) => {
    setStepStates((prevState) => ({
      ...prevState,
      [stepName]: isValid,
    }));
  };
  const handleStepAction = async (stepName: string, action: Function) => {
    action();
    handleStepValidation(stepName, true);
  };

  //닉네임 중복검사 요청
  const { mutate: checkNickname, isLoading: isCheckingNickname } = useMutation(
    (nickname: string) => nicknameFn(nickname),
    {
      onSuccess: (data) => {
        handleStepValidation('nickName', true);
        setIsDuplicated(data.message);
      },
      onError: (error: any) => {
        setIsDuplicated(error.message);
        handleStepValidation('nickName', false);
        setError('nickName', error.message);
      },
    }
  );

  //인증 코드 요청
  const { mutate: verifyEmail, isLoading: isVerifyingEmail } = useMutation(
    (email: string) => verifyFn(email),
    {
      onSuccess: (data) => {
        setReturnCode(data.verificationCode); //코드 저장
        setIsVerifyingCode(true);
        return (
          <Alerts
            type="success"
            title="인증 요청"
            message="인증 코드가 발송되었습니다."
          />
        );
      },
      onError: (error: any) => {
        return (
          <Alerts
            type="error"
            title="인증 요청 실패"
            message="이메일 인증 요청에 실패하였습니다. 다시 시도해주세요."
          />
        );
      },
    }
  );

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 w-4/5 h-2/3 absolute rounded-xl bg-skyblue shadow-lg">
          <div className="hidden tablet:flex tablet:flex-col tablet:justify-end">
            <div className="self-center mb-10">
              <p className="text-lg font-extrabold text-white">TWT</p>
              <p className="text-lg font-semibold text-white">TWT</p>
              <p className="text-white text-lg">TWT</p>
            </div>
            <img
              className="h-[200px] w-[250px] self-center mb-20"
              src={logo}
              alt="로고 이미지"
            />
          </div>

          <div className="tablet:flex justify-center align-middle p-12 bg-white tablet:rounded-r-xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex justify-center align-middle flex-col space-y-2"
            >
              <p className="self-center text-3xl font-bold text-left mb-9">
                회원가입
              </p>
              {/* 닉네임 입력 */}
              <div className="flex justify-between relative">
                <input
                  className={`peer w-2/3 relative h-10 rounded border border-slate-200 px-4 placeholder-transparent text-gray text-sm bg-transparent py-2 leading-tight outline-none autofill:bg-white ${
                    errors.nickName && 'border-rose-500 focus:border-rose-500'
                  }  focus:border-skyblue focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray`}
                  type="text"
                  placeholder="닉네임 입력"
                  {...register('nickName', {
                    required: '✓ 닉네임을 입력해주세요.',
                    minLength: {
                      value: 2,
                      message: '✓ 최소 2글자 이상으로 입력해주세요.',
                    },
                    maxLength: {
                      value: 8,
                      message: '✓ 최대 8글자 이하로 입력해주세요.',
                    },
                  })}
                />
                <label
                  className={`absolute text-gray left-2 -top-2 z-[1] cursor-text text-xs px-2 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-rose-500 peer-required:after:content-['*'] peer-invalid:text-rose-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-skyblue ${
                    errors.nickName && 'peer-focus:text-rose-500'
                  } peer-disabled:cursor-not-allowed peer-disabled:text-gray peer-disabled:before:bg-transparent`}
                >
                  닉네임
                </label>
                <button
                  className="text-sm bg-skyblue px-3 rounded-lg shadow disabled:bg-lightgray disabled:cursor-not-allowed"
                  disabled={
                    !isNickNameValid ||
                    isCheckingNickname ||
                    stepStates.nickName
                  }
                  onClick={() =>
                    handleStepAction('nickName', () => {
                      checkNickname(watch('nickName'));
                    })
                  }
                >
                  {isCheckingNickname ? <Spinner /> : '중복확인'}
                </button>
              </div>
              {isDuplicated ||
                (errors.nickName && (
                  <small
                    className="text-rose-500 text-xs px-1 mt-[-3px]"
                    role="alert"
                  >
                    {errors.nickName.message || isDuplicated}
                  </small>
                ))}
              {/* 이메일 입력 */}
              <div className="flex justify-between relative">
                <input
                  className={`peer w-2/3 relative h-10 rounded border border-slate-200 px-4 placeholder-transparent text-gray text-sm bg-transparent py-2 leading-tight outline-none autofill:bg-white ${
                    errors.email && 'border-rose-500 focus:border-rose-500'
                  }  focus:border-skyblue focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray`}
                  type="text"
                  placeholder="이메일 입력"
                  {...register('email', {
                    required: '✓ 이메일을 입력해주세요.',
                    pattern: {
                      value:
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                      message: '✓ 이메일 형식에 맞지 않습니다.',
                    },
                  })}
                />
                <label
                  htmlFor="email"
                  className={`absolute text-gray left-2 -top-2 z-[1] cursor-text text-xs px-2 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-rose-500 peer-required:after:content-['*'] peer-invalid:text-rose-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-skyblue ${
                    errors.email && 'peer-focus:text-rose-500'
                  } peer-disabled:cursor-not-allowed peer-disabled:text-gray peer-disabled:before:bg-transparent`}
                >
                  이메일
                </label>
                <button
                  onClick={() =>
                    handleStepAction('email', () => {
                      verifyEmail(watch('email'));
                    })
                  }
                  className="text-sm bg-skyblue px-3 rounded-lg shadow disabled:cursor-not-allowed disabled:bg-lightgray"
                  disabled={!isEmailValid || isVerifyingEmail}
                >
                  {isVerifyingEmail ? '로딩 중' : '인증하기'}
                </button>
              </div>
              {errors.email && (
                <small className="text-rose-500 text-xs px-1" role="alert">
                  {errors.email.message}
                </small>
              )}
              {/* 인증코드 입력 */}
              {isVerifyingCode && (
                <>
                  <div className="flex relative justify-between">
                    <input
                      className={`peer w-2/3 relative h-10 rounded border border-slate-200 px-4 placeholder-transparent text-gray text-sm bg-transparent py-2 leading-tight outline-none autofill:bg-white focus:border-skyblue focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray`}
                      type="text"
                      placeholder="인증코드 입력"
                      {...register('verificationCode', {
                        required: '✓ 인증코드를 입력해주세요.',
                      })}
                    />
                    <label
                      htmlFor="verificationCode"
                      className={`absolute text-gray left-2 -top-2 z-[1] cursor-text text-xs px-2 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-rose-500 peer-required:after:content-['*'] peer-invalid:text-rose-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-skyblue peer-disabled:cursor-not-allowed peer-disabled:text-gray peer-disabled:before:bg-transparent`}
                    >
                      인증 코드
                    </label>
                    <button
                      className="text-sm bg-skyblue px-3 rounded-lg shadow disabled:cursor-not-allowed disabled:bg-lightgray"
                      onClick={() =>
                        handleStepAction('verificationCode', () => {
                          handleCheckCode();
                        })
                      }
                      disabled={
                        isVerifyingEmail ||
                        stepStates.verificationCode ||
                        !isCodeValid
                      }
                    >
                      {isVerifyingEmail ? '로딩 중' : '확인'}
                    </button>
                  </div>
                  {errors.verificationCode && (
                    <small className="text-rose-500 text-xs px-1" role="alert">
                      {errors.verificationCode.message}
                    </small>
                  )}
                </>
              )}
              {/* 비밀번호 */}
              <div className="flex relative">
                <input
                  className={`peer w-full relative h-10 rounded border border-slate-200 px-4 placeholder-transparent text-gray text-sm bg-transparent py-2 leading-tight outline-none autofill:bg-white ${
                    errors.password && 'border-rose-500 focus:border-rose-500'
                  }  focus:border-skyblue focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray`}
                  type="password"
                  placeholder="비밀번호 입력"
                  {...register('password', {
                    required: '✓ 비밀번호를 입력해주세요.',
                    pattern: {
                      value:
                        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
                      message: '✓ 영문, 숫자, 특수문자 조합 8자리 이상 입력',
                    },
                  })}
                />
                <label
                  htmlFor="password"
                  className={`absolute text-gray left-2 -top-2 z-[1] cursor-text text-xs px-2 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-rose-500 peer-required:after:content-['*'] peer-invalid:text-rose-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-skyblue ${
                    errors.password && 'peer-focus:text-rose-500'
                  } peer-disabled:cursor-not-allowed peer-disabled:text-gray peer-disabled:before:bg-transparent`}
                >
                  비밀번호
                </label>
              </div>
              {errors.password && (
                <small className="text-rose-500 text-xs px-1" role="alert">
                  {errors.password.message}
                </small>
              )}
              {/* 비밀번호 확인 */}
              <div className="flex relative">
                <input
                  className={`peer w-full relative h-10 rounded border border-slate-200 px-4 placeholder-transparent text-gray text-sm bg-transparent py-2 leading-tight outline-none autofill:bg-white ${
                    errors.confirmPw && 'border-rose-500 focus:border-rose-500'
                  }  focus:border-skyblue focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray`}
                  type="password"
                  placeholder="비밀번호 확인"
                  {...register('confirmPw', {
                    required: '✓ 비밀번호를 다시 입력해주세요.',
                    validate: (value) =>
                      value === watch('password') ||
                      '✓ 비밀번호가 일치하지 않습니다.',
                  })}
                />
                <label
                  htmlFor="password"
                  className={`absolute text-gray left-2 -top-2 z-[1] cursor-text text-xs px-2 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-rose-500 peer-required:after:content-['*'] peer-invalid:text-rose-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-skyblue ${
                    errors.confirmPw && 'peer-focus:text-rose-500'
                  } peer-disabled:cursor-not-allowed peer-disabled:text-gray peer-disabled:before:bg-transparent`}
                >
                  비밀번호 확인
                </label>
              </div>
              {errors.confirmPw && (
                <small className="text-rose-500 text-xs px-1" role="alert">
                  {errors.confirmPw.message}
                </small>
              )}
              {/* 회원가입 버튼 */}
              <button
                className={`w-full h-[60px] font-bold rounded-lg ${
                  isValid && Object.values(stepStates).every((state) => state)
                    ? 'bg-skyblue'
                    : 'bg-lightgray'
                }`}
                type="submit"
                disabled={
                  !isValid ||
                  joining ||
                  !Object.values(stepStates).every((state) => state)
                }
              >
                {joining ? '로딩 중' : '회원가입'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Join;
