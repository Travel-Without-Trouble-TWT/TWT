import { AiOutlineMenu } from 'react-icons/ai';
import { BiBell } from 'react-icons/bi';

function Header() {
  return (
    <nav className="flex items-center pl-10 pr-10 flex-wrap to-sky-50 bg-gradient-to-b from-[#A5E0F8] dark:bg-gray-800 text-black">
      <a href="/" className="p-2 mr-4 inline-flex items-center">
        {/* <img src={logo} alt="logo" /> */}
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
        className="text-black inline-flex hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
        data-target="#navigation"
      >
        <AiOutlineMenu />
      </button>
      <div
        className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
        id="navigation"
      >
        <div className="text-black lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
          <a
            href="/"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <span className="flex items-center">일정</span>
          </a>
          <a
            href="/"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <span>리뷰</span>
          </a>
          <a
            href="/"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <BiBell />
          </a>
          <img />
        </div>
      </div>
    </nav>
  );
}

export default Header;
