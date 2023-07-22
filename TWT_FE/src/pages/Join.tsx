import { useForm } from 'react-hook-form';

import Header from '../components/Header';
import logo from '../assets/img/logo.png';

interface JoinProps {
  nickName: string;
  email: string;
  password: string;
  confirmPw?: string;
}
function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    watch,
  } = useForm<JoinProps>({ mode: 'onBlur' });

  const password = watch('password');
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="grid grid-cols-2 gap-4w-4/5 absolute rounded-xl bg-skyblue">
          <div className="flex justify-center align-middle">
            <img className="h-[200px] w-[250px]" src={logo} alt="로고 이미지" />
          </div>

          <div className="flex justify-center align-middle p-12">
            <form className="flex justify-center align-middle flex-col space-y-3">
              <p className="self-center text-3xl font-bold text-left mb-9">
                회원가입
              </p>
              <label className="text-base font-medium" htmlFor="email">
                닉네임
              </label>
              <input
                className="placeholder:text-sm text-lightgray appearance-none bg-skyblue py-2 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="닉네임 입력"
                {...register('nickName', {
                  required: '닉네임은 필수 입력입니다.',
                  minLength: {
                    value: 2,
                    message: '최소 2글자 이상으로 입력해주세요.',
                  },
                  maxLength: {
                    value: 8,
                    message: '최대 8글자 이하로 입력해주세요.',
                  },
                })}
              />
              {errors.nickName && (
                <small className="text-red italic" role="alert">
                  {errors.nickName.message}
                </small>
              )}
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
              <label className="text-md font-medium" htmlFor="password">
                비밀번호 확인
              </label>
              <input
                className="placeholder:text-sm text-lightgray appearance-none bg-skyblue py-2 px-2 leading-tight focus:outline-none"
                type="password"
                placeholder="비밀번호 확인"
                {...register('confirmPw', {
                  required: '비밀번호를 다시 입력해주세요.',
                  validate: (value) =>
                    value === password || '비밀번호가 일치하지 않습니다.',
                })}
              />
              {errors.confirmPw && (
                <small className="text-red italic" role="alert">
                  {errors.confirmPw.message}
                </small>
              )}
              {isValid ? (
                <button className="w-full h-[60px] font-bold rounded-lg border-solid bg-white">
                  회원가입
                </button>
              ) : (
                <button className="w-full h-[60px] font-bold rounded-lg border-2 border-white border-solid">
                  회원가입
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Join;
