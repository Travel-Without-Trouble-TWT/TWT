function Pagination() {
  return (
    <nav aria-label="PageNavigation">
      <ul className="inline-flex space-x-2">
        <li>
          <button className="flex items-center justify-center w-7 h-7 text-skyblue transition-colors duration-150 rounded focus:shadow-outline hover:bg-skyblue hover:text-white">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button className="w-7 h-7 transition-colors text-gray duration-150 rounded focus:shadow-outline hover:bg-skyblue/70 hover:text-white focus:bg-skyblue focus:text-white">
            1
          </button>
        </li>
        <li>
          <button className="w-7 h-7 text-gray transition-colors duration-150 rounded focus:shadow-outline hover:bg-skyblue/70 hover:text-white focus:bg-skyblue focus:text-white">
            2
          </button>
        </li>
        <li>
          <button className="w-7 h-7 text-gray transition-colors duration-150 focus:bg-skyblue focus:text-white rounded focus:shadow-outline hover:bg-skyblue/70 hover:text-white">
            3
          </button>
        </li>
        <li>
          <button className="flex items-center justify-center w-7 h-7 text-skyblue transition-colors duration-150 bg-white rounded focus:shadow-outline hover:bg-skyblue hover:text-white">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
