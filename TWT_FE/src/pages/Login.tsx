import { useForm } from 'react-hook-form';

import Header from '../components/Header';

import logo from '../assets/img/logo.png';
//import googleLoginIcon from '../assets/img/googleIcon.png';

interface LoginProps {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<LoginProps>({ mode: 'onBlur' });

  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 w-4/5 absolute rounded-xl bg-skyblue shadow-lg">
          <div className="hidden tablet:flex tablet:flex-col tablet:justify-end border-white border-r">
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
          <div className="tablet:flex justify-center align-middle p-12">
            <form className="flex justify-center align-middle flex-col space-y-3">
              <p className="self-center text-3xl font-bold text-left mb-9">
                로그인
              </p>
              <label className="text-md font-medium" htmlFor="email">
                이메일
              </label>
              <input
                className="placeholder:text-sm text-lightgray appearance-none bg-skyblue py-2 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="이메일 입력"
                {...register('email', {
                  required: '이메일은 필수 입력입니다.',
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: '이메일 형식에 맞지 않습니다.',
                  },
                })}
              />
              {errors.email && (
                <small className="text-red italic" role="alert">
                  {errors.email.message}
                </small>
              )}
              <label className="text-md font-medium" htmlFor="password">
                비밀번호
              </label>
              <input
                className="placeholder:text-sm text-lightgray appearance-none bg-skyblue py-2 px-2 leading-tight focus:outline-none"
                type="password"
                placeholder="비밀번호 입력"
                {...register('password', {
                  required: '비밀번호는 필수 입력입니다.',
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
                    message: '영문, 숫자, 특수문자 조합 8자리 이상 입력',
                  },
                })}
              />
              {errors.password && (
                <small className="text-red italic" role="alert">
                  {errors.password.message}
                </small>
              )}
              {isValid ? (
                <button className="w-full h-[60px] font-bold rounded-lg border-solid bg-white">
                  로그인
                </button>
              ) : (
                <button className="w-full h-[60px] font-bold rounded-lg border-2 border-white border-solid">
                  로그인
                </button>
              )}

              {/* <img
                className="w-full h-[60px]"
                src={googleLoginIcon}
                alt="구글 로그인"
              /> */}

              <a className="flex self-center" href="/join">
                <p className="text-white">회원가입하기</p>
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
