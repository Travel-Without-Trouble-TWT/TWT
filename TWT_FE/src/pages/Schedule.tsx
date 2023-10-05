import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
//components
import TimeModal from '../components/TimeModal';
import Feeds from '../components/Feeds';
import Alerts from '../components/Alerts';
import DateModal from '../components/DateModal';
import Loader from '../components/Loader';
import CustomMap from '../components/CustomMap';
//hooks
import {
  useDeletePlace,
  useDeleteSchedule,
  useSchedule,
  useShareSchedule,
} from '../hooks/useProducts';
import { useUserContext } from '../context';
//icons
import { FaShareSquare } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';

function Schedule() {
  const [isMoreOpen, setIsMoreOpen] = useState<string | null>(null);
  const [isShowTimeModal, setIsShowTimeModal] = useState<boolean>(false);
  const [isShowAlert, setIsShowAlert] = useState<string | number>('');
  const [isShowDateModal, setIsShowDateModal] = useState<string | null>(null);
  const { id } = useParams();
  const scheduleId = Number(id);
  const { isLogin, user } = useUserContext();
  const navigate = useNavigate();

  const { schedule, scheduleLoading, scheduleError } = useSchedule(scheduleId);
  const [deleteData, setDeleteData] = useState({
    dayScheduleId: null,
    index: null,
  });
  const [timeData, setTimeData] = useState({
    dayScheduleId: null,
    index: null,
    arriveAt: null,
  });
  const {
    deleteSchedule,
    scheduleDeleting,
    scheduleDeletingSuccess,
    scheduleDeletingError,
  } = useDeleteSchedule(scheduleId);
  const { deletePlace, placeDeleting, placeDeleteSuccess, placeDeleteError } =
    useDeletePlace(deleteData);

  if (scheduleDeletingSuccess)
    return (
      <Alerts
        type="success"
        title="삭제 성공"
        message="일정이 삭제되었습니다."
        onConfirm={() => navigate('/mypage')}
      />
    );
  if (placeDeleteSuccess) {
    return (
      <Alerts
        type="success"
        title="삭제 성공"
        message="해당 장소가 삭제되었습니다."
      />
    );
  } else if (placeDeleteError) {
    return (
      <Alerts
        type="error"
        title="삭제 실패"
        message="해당 장소 삭제에 실패하였습니다. 다시 시도해주세요."
      />
    );
  }

  const divRef = useRef<HTMLDivElement>(null);
  const handleDownload = async () => {
    if (!divRef.current) return;
    try {
      const canvas = await html2canvas(divRef.current, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, 'travelschedule.png');
        }
      });
    } catch (error) {
      <Alerts
        title="다운로드 오류"
        message="이미지 다운로드 중 오류가 발생하였습니다. 다시 시도해주세요."
      />;
    }
  };

  return (
    <>
      <section className="min-w-full min-h-screen bg-lightgray dark:bg-slate-950 flex justify-center items-center flex-col py-3">
        {!schedule || scheduleLoading ? (
          <Loader size={'30px'} />
        ) : (
          <div
            ref={divRef}
            className="w-2/3 bg-white rounded-lg shadow-xl pb-8 dark:bg-slate-900 md:w-full sm:w-full xs:w-full"
          >
            <div className="relative w-full h-[300px] bg-darkgray rounded-tl-lg rounded-tr-lg">
              <img
                alt="일정 배경"
                src={schedule?.scheduleImageUrl}
                className="w-full h-full rounded-tl-lg rounded-tr-lg opacity-50 blur-xs"
              />
            </div>
            <div className="absolute gap-2 flex flex-col -mt-60 justify-center ml-10">
              <span className="font-bold text-2xl text-white">
                {schedule.scheduleName}
              </span>
              <div className="flex gap-2">
                <span className="text-white underline">
                  {schedule.startAt}~{schedule.endAt}
                </span>
                {isLogin && schedule.memberId === user?.memberId && (
                  <button
                    className="text-gray text-sm"
                    onClick={() => setIsShowDateModal('일정편집')}
                  >
                    편집
                  </button>
                )}
              </div>
              <span className="font-bold text-2xl text-white">
                D
                {Math.ceil(
                  (new Date(schedule.startAt) - new Date()) / (1000 * 3000 * 24)
                ) > 0
                  ? Math.ceil(
                      (new Date() - new Date(schedule.startAt)) /
                        (1000 * 3000 * 24)
                    )
                  : '-day'}
              </span>
            </div>
            <div className="absoulte flex flex-col items-center">
              <button
                onClick={() => setIsShowDateModal('일정공유')}
                aria-label="share"
                className="flex self-end mr-3 text-white -mt-6 z-20 text-xl"
              >
                <FaShareSquare />
              </button>
              <button
                aria-label="download"
                onClick={handleDownload}
                className="flex self-end mr-10 text-white -mt-5 z-20 text-xl"
              >
                <FiDownload />
              </button>
              {isLogin && schedule.memberId === user?.memberId && (
                <button
                  onClick={() => setIsShowAlert('일정삭제')}
                  className="flex self-end mr-4 mt-2 text-gray text-sm z-20 dark:text-white"
                >
                  일정 삭제
                </button>
              )}
              <img
                alt="일정 이미지"
                src={schedule?.scheduleImageUrl}
                className="w-64 h-64 border-8 border-white rounded-full -mt-40 z-20  dark:border-slate-900 xs:w-44 xs:h-44 xs:-mt-28"
              />
            </div>

            <div className="px-6 m-auto mt-10">
              {/* Day별 */}
              {schedule.dayScheduleList.length > 0 &&
                schedule.dayScheduleList.map((item, idx) => (
                  <div className="grid grid-cols-4 gap-3 tablet:grid-cols-8 lg:grid-cols-12">
                    <div className="flex flex-col items-center justify-center col-span-1 lg:col-span-1">
                      <p className="text-xl font-semibold dark:text-white">
                        Day{idx + 1}
                      </p>
                      <p className="text-xs text-gray dark:text-skyblue">
                        {item.day}
                      </p>
                    </div>
                    <div className="col-span-7 lg:col-span-11 shadow-md shadow-gray rounded-md px-5 py-5 dark:bg-slate-800 dark:shadow-slate-700">
                      {item.courseList && (
                        <>
                          <Feeds
                            setIsShowTimeModal={setIsShowTimeModal}
                            setIsShowAlert={setIsShowAlert}
                            dayScheduleId={schedule.dayScheduleList.id}
                            setDeleteData={setDeleteData}
                            setTimeData={setTimeData}
                            memberId={schedule.memberId}
                            data={
                              isMoreOpen === item.id
                                ? item.courseList
                                : item.courseList.slice(0, 3)
                            }
                            placeLocation={schedule.travelPlace}
                          />
                          {isMoreOpen === item.id &&
                            item.courseList.length > 0 && (
                              <CustomMap data={item} />
                            )}
                          {item.courseList.length > 0 && (
                            <div className="flex justify-center mb-1 mt-2">
                              <button
                                className="text-sm dark:text-white"
                                onClick={() => setIsMoreOpen(item.id)}
                              >
                                {isMoreOpen === item.id ? '닫기' : '더보기'}
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>

      {isShowAlert === '일정삭제' && (
        <Alerts
          title="일정 삭제"
          message="정말로 일정을 삭제하시겠습니까?"
          type="error"
          onConfirm={() => {
            deleteSchedule(scheduleId);
            setIsShowAlert('');
          }}
        />
      )}
      {isShowAlert === '장소삭제' && (
        <Alerts
          title="장소 삭제"
          message="정말로 장소를 삭제하시겠습니까?"
          type="error"
          onConfirm={() => {
            setIsShowAlert('');
            deletePlace(deleteData);
          }}
        />
      )}
      {isShowTimeModal && (
        <TimeModal setIsShowModal={setIsShowTimeModal} timeData={timeData} />
      )}
      {isShowDateModal !== null && (
        <DateModal
          setIsShowDateModal={setIsShowDateModal}
          isShowModal={isShowDateModal}
          id={scheduleId}
        />
      )}
    </>
  );
}

export default Schedule;
