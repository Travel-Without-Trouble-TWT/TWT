import { MdOutlineFoodBank, MdOutlineAttractions } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';

function Feeds({
  setIsShowTimeModal,
  setIsShowAlert,
  schedule,
}: {
  setIsShowTimeModal: (isShowTimeModal: boolean) => void;
  setIsShowAlert: (isShowAlert: string) => void;
  schedule: string[];
}) {
  return (
    <>
      <ul
        aria-label="feed"
        role="feed"
        className="relative flex flex-col gap-4 py-12 pl-8 before:absolute before:top-0 before:left-8 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-lightgray after:absolute after:top-6 after:left-8 after:bottom-6 after:-translate-x-1/2 after:border after:border-lightgray"
      >
        <li className="relative pl-8" role="feed">
          <div className="absolute text-2xl left-0 z-10 flex items-center justify-center w-10 h-10 text-white -translate-x-1/2 rounded-full bg-blue ring-2 ring-white">
            <MdOutlineFoodBank />
          </div>
          <div className="flex flex-1 gap-0 justify-between items-center">
            <div>
              <h4 className="text-base font-semibold">장소명</h4>
              <p className="text-sm text-gray">10:00</p>
            </div>
            <div className="flex flex-col mr-5">
              <button
                className="hover:font-semibold text-sm"
                onClick={() => setIsShowAlert('장소삭제')}
              >
                장소 삭제
              </button>
              <button
                className="hover:font-semibold text-sm"
                onClick={() => setIsShowTimeModal(true)}
              >
                시간 입력
              </button>
            </div>
          </div>
        </li>
        <span className="text-sm text-gray -ml-4 z-20 bg-lightgray rounded-lg px-2 py-1 w-fit">
          123km
        </span>
        <li className="relative pl-8" role="feed">
          <div className="absolute text-2xl left-0 z-10 flex items-center justify-center w-10 h-10 text-white -translate-x-1/2 rounded-full bg-pink-500  ring-2 ring-white">
            <AiOutlineHome />
          </div>
          <div className="flex flex-1 gap-0 justify-between items-center">
            <div>
              <h4 className="text-base font-semibold">장소명</h4>
              <p className="text-sm text-gray">10:00</p>
            </div>
            <div className="flex flex-col mr-5">
              <button className="hover:font-semibold text-sm">장소 삭제</button>
              <button
                className="hover:font-semibold text-sm"
                onClick={() => setIsShowTimeModal(true)}
              >
                시간 입력
              </button>
            </div>
          </div>
        </li>
        <li className="relative pl-8" role="feed">
          <div className="absolute text-2xl left-0 z-10 flex items-center justify-center w-10 h-10 text-white -translate-x-1/2 rounded-full bg-amber-500  ring-2 ring-white">
            <MdOutlineAttractions />
          </div>
          <div className="flex flex-1 gap-0 justify-between items-center">
            <div>
              <h4 className="text-base font-semibold">장소명</h4>
              <p className="text-sm text-gray">10:00</p>
            </div>
            <div className="flex flex-col mr-5">
              <button className="hover:font-semibold text-sm">장소 삭제</button>
              <button
                className="hover:font-semibold text-sm"
                onClick={() => setIsShowTimeModal(true)}
              >
                시간 입력
              </button>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}

export default Feeds;
