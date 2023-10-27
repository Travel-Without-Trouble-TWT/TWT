import Pagination from './Pagination';

function ScheduleList({
  userDatas,
  isListOpen,
  currentPage,
  handlePageChange,
}: {
  userDatas: any;
  isListOpen: string | null;
  currentPage: number;
  handlePageChange: (value: number) => void;
}) {
  return (
    <>
      <ul className="w-1/3 h-full divide-y divide-slate-100 dark:divide-slate-800 shadow-md ml-5 rounded dark:bg-slate-700">
        {userDatas.content.length > 0 ? (
          userDatas.content.map((userData: any) => (
            <li key={userData.id} className="flex items-center gap-4 px-4 py-2">
              <div className="flex items-center self-center">
                <img
                  src={userData.scheduleImageUrl}
                  alt=""
                  className="w-10 h-10 rounded"
                />
              </div>

              <div className="flex min-h-[2rem] min-w-0 flex-1 flex-col items-start justify-center gap-0">
                <span className="w-full truncate text-sm dark:text-gray dark:hover:text-white xs:text-xs">
                  <a href={`/schedule/${userData.id}`}>
                    {userData.scheduleName}({userData.startAt}~{userData.endAt})
                  </a>
                </span>
              </div>
            </li>
          ))
        ) : (
          <li className="flex items-center gap-4 px-4 py-3">
            <span className="text-xs text-gray">
              해당 지역에 일정이 없습니다.
            </span>
          </li>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={userDatas ? userDatas.totalPages : 0}
          onPageChange={handlePageChange}
        />
      </ul>
    </>
  );
}

export default ScheduleList;
