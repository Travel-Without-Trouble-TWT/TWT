import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginProps } from '../api/type';
import { useLogin } from '../hooks/useAuth';

import logo from '../assets/logo.png';
import GoogleLogo from '../assets/google.png';

import googleUrl from '../utils/googleUrl';
//컴포넌트
import Spinner from '../components/Loader';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    reset,
  } = useForm<LoginProps>({ mode: 'onBlur' });

  const { loginUser, logining } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = ((location.state as any)?.from.pathname as string) || '/';

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<LoginProps> = (values) => {
    try {
      loginUser(values);
      navigate('/');
    } catch (error) {}
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="grid xs:grid-cols-1 sm:grid-cols-1 grid-cols-2 gap-4 w-2/3 absolute rounded-xl bg-skyblue shadow-lg">
          <div className="xs:hidden sm:hidden flex flex-col justify-end">
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
          <div className="flex justify-center align-middle p-12 bg-white rounded-r-xl sm:rounded-xl xs:rounded-xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex justify-center align-middle py-10 flex-col space-y-2"
            >
              <p className="self-center text-3xl font-bold text-left mb-9">
                로그인
              </p>
              <div className="flex relative">
                <input
                  className={`peer w-full relative h-10 rounded border border-slate-200 px-4 placeholder-transparent text-gray text-sm bg-transparent py-2 leading-tight outline-none autofill:bg-white ${
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
                  className={`absolute text-gray left-2 -top-2 z-[1] cursor-text text-xs px-2 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-rose-500 peer-required:after:content-['*'] peer-invalid:text-rose-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-skyblue ${
                    errors.email && 'peer-focus:text-rose-500'
                  } peer-disabled:cursor-not-allowed peer-disabled:text-gray peer-disabled:before:bg-transparent`}
                  htmlFor="email"
                >
                  이메일
                </label>
              </div>
              {errors.email && (
                <small
                  className="text-rose-500 text-xs px-1 mt-[-3px]"
                  role="alert"
                >
                  {errors.email.message}
                </small>
              )}
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
                  className={`absolute text-gray left-2 -top-2 z-[1] cursor-text text-xs px-2 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-rose-500 peer-required:after:content-['*'] peer-invalid:text-rose-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-skyblue ${
                    errors.password && 'peer-focus:text-rose-500'
                  } peer-disabled:cursor-not-allowed peer-disabled:text-gray peer-disabled:before:bg-transparent`}
                  htmlFor="password"
                >
                  비밀번호
                </label>
              </div>
              {errors.password && (
                <small
                  className="text-rose-500 text-xs px-1 mt-[-3px]"
                  role="alert"
                >
                  {errors.password.message}
                </small>
              )}
              <button
                className={`w-full h-[60px] mt-4 font-bold rounded-lg ${
                  isValid ? 'bg-skyblue' : ' bg-lightgray'
                }`}
                type="submit"
                disabled={logining || !isValid}
              >
                {logining ? <Spinner size={'5'} /> : '로그인'}
              </button>
              <hr className="w-full h-1"></hr>
              <a
                className="relative px-3 py-3 text-white font-medium text-sm leading-snug rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center mb-3"
                style={{ backgroundColor: '#90DCE1' }}
                href={googleUrl(from)}
                role="button"
              >
                <div className="bg-white p-3 absolute rounded-l left-0 top-0 h-full">
                  <img
                    src={GoogleLogo}
                    alt="구글 로그인"
                    style={{ height: '18px', width: '18px' }}
                  />
                </div>
                <span className="">Sign in with Google</span>
              </a>
              <a className="flex self-center" href="/join">
                <p className="text-sm text-gray hover:font-semibold">
                  회원가입 하러가기
                </p>
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
