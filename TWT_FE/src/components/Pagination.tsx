interface PaginationProps {
  perPage: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

function Pagination({
  perPage,
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = [];

  const middlePage = Math.ceil(currentPage / 10) * 10; // 가장 가까운 10의 배수 페이지
  const startPage = Math.max(1, middlePage - 9); // 최소 페이지 번호
  const endPage = Math.min(totalPages, middlePage); // 최대 페이지 번호

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav
      aria-label="Page Navigation"
      className="flex justify-center self-center mt-2 mb-2"
    >
      <ul className="inline-flex space-x-2">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-7 h-7 text-skyblue transition-colors duration-150 rounded focus:shadow-outline ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-skyblue hover:text-white'
            }  `}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => onPageChange(pageNumber)}
              className={`w-7 h-7 transition-colors text-gray duration-150 rounded focus:shadow-outline ${
                currentPage === pageNumber
                  ? 'bg-skyblue text-white'
                  : 'hover:bg-skyblue/70 hover:text-white focus:bg-skyblue focus:text-white'
              }`}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`flex items-center justify-center w-7 h-7 text-skyblue transition-colors ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-skyblue hover:text-white'
            }`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
