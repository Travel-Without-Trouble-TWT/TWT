import { useUserContext } from '../context';

import { MdOutlineFoodBank, MdOutlineAttractions } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';

function Feeds({
  setIsShowTimeModal,
  setIsShowAlert,
  dayScheduleId,
  setDeleteData,
  data,
  memberId,
  placeLocation,
}: {
  setIsShowTimeModal: (isShowTimeModal: boolean) => void;
  setIsShowAlert: (isShowAlert: string) => void;
  dayScheduleId: number;
  setDeleteData: any;
  data: any;
  memberId: number;
  placeLocation: string;
}) {
  const { isLogin, user } = useUserContext();

  const handleClickDeleteButton = (idx: number) => {
    setIsShowAlert('장소삭제');
    setDeleteData({
      dayScheduleId: dayScheduleId,
      index: idx,
    });
  };

  return (
    <>
      <ul
        aria-label="feed"
        role="feed"
        className="relative flex flex-col gap-4 py-12 pl-8 before:absolute before:top-0 before:left-8 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-lightgray after:absolute after:top-6 after:left-8 after:bottom-6 after:-translate-x-1/2 after:border after:border-lightgray"
      >
        {data.length > 0 ? (
          data.map((item, idx) => (
            <>
              <li className="relative pl-8" role="feed">
                <div
                  className={`absolute text-2xl left-0 z-10 flex items-center justify-center w-10 h-10 text-white -translate-x-1/2 rounded-full ring-2 ring-white ${
                    item.placeType === 'STAY' && 'bg-pink-500'
                  } ${item.placeType === 'HOT_PLACE' && 'bg-amber-500'} ${
                    item.placeType === 'RESTAURANT' && 'bg-blue'
                  }`}
                >
                  {item.placeType === 'RESTAURANT' && <MdOutlineFoodBank />}{' '}
                  {item.placeType === 'HOT_PLACE' && <MdOutlineAttractions />}{' '}
                  {item.placeType === 'STAY' && <AiOutlineHome />}
                </div>
                <div className="flex flex-1 gap-0 justify-between items-center">
                  <div>
                    <h4 className="text-base font-semibold dark:text-white">
                      {item.placeName}
                    </h4>
                    <p className="text-sm text-gray">
                      {item.arriveAt.split('T')[1] === '23:59:00'
                        ? null
                        : item.arriveAt.split('T')[1]}
                    </p>
                  </div>
                  {isLogin && user && user.memberId === memberId && (
                    <div className="flex flex-col mr-5 dark:text-gray">
                      <button
                        className="hover:font-semibold text-sm"
                        onClick={(idx) => {
                          handleClickDeleteButton(idx);
                        }}
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
                  )}
                </div>
              </li>
              {idx !== data.length - 1 && (
                <span className="text-sm text-gray -ml-4 z-20 bg-lightgray rounded-lg px-2 py-1 w-fit">
                  {item.distance.toFixed(1)}km
                </span>
              )}
            </>
          ))
        ) : (
          <a
            href={`/search/${placeLocation}`}
            className="flex justify-center mr-10 text-gray text-sm dark:text-lightgray"
          >
            장소를 추가해주세요.
          </a>
        )}
      </ul>
    </>
  );
}

export default Feeds;
