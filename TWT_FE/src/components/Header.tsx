import { useState } from 'react';
import { useUserContext } from '../context';

import logo from '../assets/logo.png';
import { useGetEmitters, useLogout } from '../hooks/useAuth';
import Alerts from './Alerts';

function Header() {
  const { isLogin, user } = useUserContext();
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isShowAlert, setIsShowAlert] = useState<string>('');

  const { logout, logouting, logoutError } = useLogout();
  const { emitters, emittersGetting, emittersError } = useGetEmitters();

  return (
    <header className="border-b-1 relative sticky z-50 w-full border-b border-slate-200 shadow-lg shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full  xl:border-slate-200 xl:backdrop-blur-sm xl:after:hidden to-sky-50 bg-gradient-to-b from-[#A5E0F8]">
      <div className="relative mx-auto max-w-full px-6 md:max-w-5xl lg:max-w-7xl xl:max-w-[96rem]">
        <nav
          aria-label="main navigation"
          className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
          role="navigation"
        >
          <a
            id="TWT"
            aria-label="TWT logo"
            aria-current="page"
            className="flex items-center whitespace-nowrap py-3 text-lg focus:outline-none xl:flex-1"
            href="/"
          >
            <img
              className="h-[90px] w-[90px] self-center py-3 xs:h-[80px] xs:w-[80px]"
              src={logo}
              alt="로고 이미지"
            />
            <span className="flex flex-col text-xs ml-[-19px] mb-3 xs:text-[0.2rem]">
              <span className="text-slate-500">
                <strong className="text-black">T</strong>ravel
              </span>
              <span className="text-slate-500">
                <strong className="text-black">W</strong>ithout
              </span>
              <span className="text-slate-500">
                <strong className="text-black">T</strong>rouble
              </span>
            </span>
          </a>
          <button
            className={`relative order-10 block h-10 w-10 self-center xl:hidden lg:hidden
          ${
            isToggleOpen
              ? 'visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 '
              : ''
          }
        `}
            onClick={() => setIsToggleOpen(!isToggleOpen)}
            aria-expanded={isToggleOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
              ></span>
            </div>
          </button>
          <ul
            role="menubar"
            aria-label="Select page"
            className={`absolute top-0 left-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 xl:visible xl:relative xl:top-0 xl:z-0 xl:flex xl:h-full xl:w-auto xl:items-stretch xl:overflow-visible xl:bg-white/0 xl:px-0 xl:py-0 xl:pt-0 xl:opacity-100 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
              isToggleOpen
                ? 'visible opacity-100 backdrop-blur-sm'
                : 'invisible opacity-0'
            }`}
          >
            {isLogin ? (
              <>
                <li role="none" className="flex items-stretch">
                  <a
                    role="menuitem"
                    aria-haspopup="false"
                    tabIndex={0}
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-blue focus:bg-emerald-50 focus:outline-none focus-visible:outline-none lg:px-8 xl:px-8"
                    href="/mypage/schedule/1"
                  >
                    <span>마이페이지</span>
                  </a>
                </li>
                <li role="none" className="flex items-stretch">
                  <a
                    role="menuitem"
                    aria-current="page"
                    aria-haspopup="false"
                    tabIndex={0}
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-blue lg:px-8 xl:px-8"
                    href="/profile"
                  >
                    <span>프로필 수정</span>
                  </a>
                </li>
                <li role="none" className="flex items-stretch">
                  <span
                    onClick={() => setIsShowAlert('로그아웃')}
                    role="menuitem"
                    aria-haspopup="false"
                    tabIndex={0}
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-blue lg:px-8 xl:px-8"
                  >
                    <span>로그아웃</span>
                  </span>
                </li>
              </>
            ) : null}
          </ul>
          <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0 xl:ml-0 xl:p-0">
            {isLogin ? (
              <>
                <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white">
                  <img
                    src={
                      user?.profileUrl !== null
                        ? user?.profileUrl
                        : 'https://mblogthumb-phinf.pstatic.net/20150427_73/ninevincent_1430122793329pvryW_JPEG/kakao_7.jpg?type=w420'
                    }
                    alt="user profile"
                    title="user profile"
                    width="40"
                    height="40"
                    className="max-w-full rounded-full cursor-pointer"
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                  />
                  {emitters && emitters.length > 0 && (
                    <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 p-1 text-sm text-white"></span>
                  )}
                </div>
                <ul
                  className={`${
                    isDropdownOpen ? 'flex' : 'hidden'
                  } absolute right-0 top-full z-50 mt-1 flex flex-col w-72 list-none rounded bg-white py-2 shadow-md`}
                >
                  {emitters && emitters.length > 0 ? (
                    emitters.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className={`${
                            index === currentItem
                              ? 'bg-lightgray/30 text-white'
                              : 'bg-none'
                          } flex items-start justify-start gap-2 p-2 px-5 transition-colors duration-300 hover:bg-lightgray/80`}
                        >
                          <span className="flex flex-col gap-1 overflow-hidden  whitespace-wrap">
                            <span className="leading-5 text-sm">
                              {item.message}
                            </span>
                          </span>
                        </li>
                      );
                    })
                  ) : (
                    <li className="text-gray flex items-start justify-start gap-2 p-2 px-5">
                      <span className="flex flex-col gap-1 overflow-hidden  whitespace-wrap">
                        <span className="leading-5 text-sm">
                          알림을 모두 확인하였습니다.
                        </span>
                      </span>
                    </li>
                  )}
                </ul>
              </>
            ) : (
              <div className="flex">
                <a
                  href="/login"
                  className="text-slate-700 hover:text-blue mr-2"
                >
                  로그인
                </a>
                <a href="/join" className="text-slate-700 hover:text-blue">
                  회원가입
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>
      {isShowAlert === '로그아웃' && (
        <Alerts
          type="success"
          title="로그아웃"
          message="정말 로그아웃하시겠습니까?"
          onConfirm={() => {
            setIsShowAlert('');
            logout();
          }}
        />
      )}
    </header>
  );
}

export default Header;
