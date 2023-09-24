import { useState } from 'react';
import { useUserContext } from '../context';

function Profile() {
  const { isLogin, user } = useUserContext();
  const [nickName, setNickName] = useState(user?.nickName);
  const [password, setPassword] = useState();
  return (
    <div className="flex justify-center items-center min-w-full min-h-screen">
      {isLogin ? (
        <form className="w-[500px] overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
          <div className="p-10">
            <header className="mb-4 text-center">
              <h3 className="text-2xl font-semibold text-slate-700">
                프로필 수정
              </h3>
            </header>
            <div className="flex flex-col space-y-8">
              <div className="relative my-6">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder={user?.email}
                  value={user?.email}
                  readOnly
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 focus:border-skyblue focus:outline-none invalid:focus:border-rose-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="email"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-rose-500 peer-required:after:content-['\00a0*'] peer-invalid:text-rose-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-skyblue peer-invalid:peer-focus:text-rose-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  이메일
                </label>
              </div>
              <div className="relative my-6">
                <input
                  id="nickName"
                  type="text"
                  name="nickName"
                  placeholder={user?.nickName}
                  value={user?.nickName}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-rose-500 focus:border-skyblue focus:outline-none invalid:focus:border-rose-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="nickName"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-rose-500 peer-required:after:content-['\00a0*'] peer-invalid:text-rose-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-skyblue peer-invalid:peer-focus:text-rose-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  닉네임
                </label>
                <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-slate-400 transition peer-invalid:text-pink-500">
                  <span>Input field with trailing icon</span>
                </small>
              </div>
              <div className="relative my-6">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="your password"
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-rose-500 focus:border-skyblue focus:outline-none invalid:focus:border-rose-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="password"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-rose-500 peer-required:after:content-['\00a0*'] peer-invalid:text-rose-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-skyblue peer-invalid:peer-focus:text-rose-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  비밀번호 변경
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
                <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-slate-400 transition peer-invalid:text-rose-500">
                  <span>Input field with trailing icon</span>
                </small>
              </div>
            </div>
          </div>
          <div className="flex justify-end p-6 ">
            <button className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-skyblue/80 hover:bg-skyblue px-5 text-sm font-medium tracking-wide text-white transition duration-300  focus:bg-skyblue focus-visible:outline-none disabled:cursor-not-allowed disabled:border-lightgray disabled:bg-lightgray disabled:shadow-none">
              <span>수정하기</span>
            </button>
          </div>
        </form>
      ) : (
        <span>로그인을 해주세요.</span>
      )}
    </div>
  );
}

export default Profile;
