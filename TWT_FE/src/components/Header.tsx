import { useState } from 'react';
import { useUserContext } from '../context';

function Header() {
  const { user, logout } = useUserContext();
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const alertItems = [{ content: '알람1' }, { content: '알람2' }];

  return (
    <header className="border-b-1 relative sticky z-50 w-full border-b border-slate-200 shadow-lg shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full  lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden to-sky-50 bg-gradient-to-b from-[#A5E0F8]">
      <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
        <nav
          aria-label="main navigation"
          className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
          role="navigation"
        >
          <a
            id="TWT"
            aria-label="TWT logo"
            aria-current="page"
            className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
            href="/"
          >
            <span className="flex flex-col text-xs">
              <span>
                <strong>T</strong>ravel
              </span>
              <span>
                <strong>W</strong>ithout
              </span>
              <span>
                <strong>T</strong>rouble
              </span>
            </span>
          </a>
          <button
            className={`relative order-10 block h-10 w-10 self-center lg:hidden
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
            className={`absolute top-0 left-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
              isToggleOpen
                ? 'visible opacity-100 backdrop-blur-sm'
                : 'invisible opacity-0'
            }`}
          >
            {user ? (
              <>
                <li role="none" className="flex items-stretch">
                  <a
                    role="menuitem"
                    aria-haspopup="false"
                    tabIndex={0}
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-blue focus:bg-emerald-50 focus:outline-none focus-visible:outline-none lg:px-8"
                    href="/mypage"
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
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-blue lg:px-8"
                    href="/profile"
                  >
                    <span>프로필 수정</span>
                  </a>
                </li>
                <li role="none" className="flex items-stretch">
                  <a
                    role="menuitem"
                    aria-haspopup="false"
                    tabIndex={0}
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-blue lg:px-8"
                    href="/logout"
                  >
                    <span>로그아웃</span>
                  </a>
                </li>
              </>
            ) : null}
          </ul>
          <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
            {user ? (
              <>
                <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white">
                  <img
                    src={
                      user.profileUrl === null
                        ? 'https://mblogthumb-phinf.pstatic.net/20150427_73/ninevincent_1430122793329pvryW_JPEG/kakao_7.jpg?type=w420'
                        : user.profileUrl
                    }
                    alt="user profile"
                    title="user profile"
                    width="40"
                    height="40"
                    className="max-w-full rounded-full cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  />
                  <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 p-1 text-sm text-white"></span>
                </div>
                <ul
                  className={`${
                    isDropdownOpen ? 'flex' : 'hidden'
                  } absolute right-0 top-full z-50 mt-1 flex flex-col w-72 list-none rounded bg-white py-2 shadow-md`}
                >
                  {alertItems.map((item, index) => {
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
                            {item.content}
                          </span>
                        </span>
                      </li>
                    );
                  })}
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
    </header>
  );
}

export default Header;
