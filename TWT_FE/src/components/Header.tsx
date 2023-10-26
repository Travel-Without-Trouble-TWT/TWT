import { useState } from 'react';
import { useUserContext } from '../context';

import logo from '../assets/logo.png';
import { useGetEmitters, useLogout } from '../hooks/useAuth';

import { useAlert } from '../hooks/useAlert';
import { useNavigate } from 'react-router-dom';
//components
import DropDown from './dropDown';
import Alerts from './Alerts';

function Header() {
  const { isLogin, user } = useUserContext();
  const { alert, showAlert } = useAlert();
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { logout } = useLogout();
  const { emitters } = useGetEmitters();

  const handleClickLogout = () => {
    showAlert({
      type: 'success',
      title: '로그아웃',
      message: '정말로 로그아웃하시겠습니까?',
      onConfirm: () => {
        logout();
        navigate('/login');
      },
    });
  };

  return (
    <header className="border-b-1 fixed z-50 w-full border-b border-slate-200 shadow-lg shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full  xl:border-slate-200 xl:backdrop-blur-sm xl:after:hidden to-sky-50 bg-gradient-to-b from-[#A5E0F8]">
      <div className="relative mx-auto max-w-full px-6 md:max-w-5xl lg:max-w-7xl xl:max-w-[96rem]">
        <nav
          aria-label="main navigation"
          className="flex h-[5rem] items-stretch justify-between font-medium text-slate-700"
          role="navigation"
        >
          {/* 로고 */}
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
              alt="logo"
            />
            <span className="flex flex-col text-xs ml-[-19px] mb-3 xs:text-[0.5rem] space-y-0">
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
          {/* 메뉴 버튼 */}
          <button
            className={`${
              !isLogin && 'hidden'
            } relative order-10 block h-10 w-10 self-center xl:hidden lg:hidden
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
          {/* 메뉴들 */}
          <ul
            role="menubar"
            aria-label="Select page"
            className={`absolute top-0 left-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 xl:visible xl:relative xl:top-0 xl:z-0 xl:flex xl:h-full xl:w-auto xl:items-stretch xl:overflow-visible xl:bg-white/0 xl:px-0 xl:py-0 xl:pt-0 xl:opacity-100 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
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
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-blue hover:font-semibold focus:bg-emerald-50 focus:outline-none focus-visible:outline-none lg:px-8 xl:px-8"
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
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-blue hover:font-semibold lg:px-8 xl:px-8"
                    href="/profile"
                  >
                    <span>프로필 수정</span>
                  </a>
                </li>
                <li role="none" className="flex items-stretch">
                  <span
                    onClick={handleClickLogout}
                    role="menuitem"
                    aria-haspopup="false"
                    tabIndex={0}
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-blue hover:font-semibold cursor-pointer lg:px-8 xl:px-8"
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
                    alt="profileImg"
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
                {/* 드롭다운 */}
                {isDropdownOpen && <DropDown data={emitters} />}
              </>
            ) : (
              <div className="flex">
                <a
                  href="/login"
                  className="text-slate-700 hover:text-blue hover:font-semibold mr-2"
                >
                  로그인
                </a>
                <a
                  href="/join"
                  className="text-slate-700 hover:text-blue hover:font-semibold"
                >
                  회원가입
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>
      {alert && <Alerts {...alert} />}
    </header>
  );
}

export default Header;
