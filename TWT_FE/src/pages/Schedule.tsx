import { useState } from 'react';
import { useParams } from 'react-router-dom';

//components
import TimeModal from '../components/TimeModal';
import Feeds from '../components/Feeds';
import Distance from '../components/Distance';
import Alerts from '../components/Alerts';
import DateModal from '../components/DateModal';
import Spinner from '../components/Spinner';
import CustomMap from '../components/CustomMap';
//hooks
import { useSchedule } from '../hooks/useProducts';
//icons
import { FaShareSquare } from 'react-icons/fa';

function Schedule() {
  const [isMoreOpen, setIsMoreOpen] = useState<string | null>(null);
  const [isShowTimeModal, setIsShowTimeModal] = useState<boolean>(false);
  const [isShowAlert, setIsShowAlert] = useState<string>('');
  const [isShowDateModal, setIsShowDateModal] = useState<boolean>(false);
  const { id } = useParams();
  const scheduleId = Number(id);

  const { schedule, scheduleLoading, scheduleError } = useSchedule(scheduleId);

  return (
    <>
      {!schedule || scheduleLoading ? (
        <Spinner size={'30px'} />
      ) : (
        <section className="bg-lightgray dark:bg-gray-900 h-full flex justify-center flex-col lg:px-40 mobile:px-10 py-6">
          <div className="bg-white rounded-lg shadow-xl pb-8">
            <div className="relative w-full h-[300px] bg-darkgray rounded-tl-lg rounded-tr-lg">
              <img
                alt="일정 배경"
                src={schedule?.scheduleImageUrl}
                className="w-full h-full rounded-tl-lg rounded-tr-lg opacity-50 blur-sm"
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
                <button
                  className="text-gray text-sm"
                  onClick={() => setIsShowDateModal(true)}
                >
                  편집
                </button>
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
              <button className="flex self-end mr-3 text-white -mt-6 z-20 text-xl">
                <FaShareSquare />
              </button>
              <button
                onClick={() => setIsShowAlert('일정삭제')}
                className="flex self-end mr-4 mt-2 text-gray text-sm z-20"
              >
                일정 삭제
              </button>
              <img
                alt="일정 이미지"
                src={schedule?.scheduleImageUrl}
                className="w-64 h-64 border-8 border-white rounded-full -mt-40 z-20"
              />
            </div>

            <div className="px-6 m-auto mt-10">
              {/* Day별 */}
              {schedule.dayScheduleList.length > 0 ? (
                schedule.dayScheduleList.map((item) => (
                  <div className="grid grid-cols-4 gap-3 tablet:grid-cols-8 lg:grid-cols-12">
                    <div className="flex flex-col items-center justify-center col-span-1 lg:col-span-1">
                      <p className="text-xl font-semibold">Day</p>
                      <p className="text-xs text-gray">{item.day}</p>
                    </div>
                    <div className="col-span-7 lg:col-span-11 shadow-md shadow-gray rounded-md px-5 py-5">
                      {item.courseList && (
                        <>
                          <Feeds
                            setIsShowTimeModal={setIsShowTimeModal}
                            setIsShowAlert={setIsShowAlert}
                            data={item.courseList}
                            placeLocation={schedule.travelPlace}
                          />
                          {isMoreOpen === item.id && item.courseList && (
                            <CustomMap data={item} />
                          )}
                        </>
                      )}

                      <div className="flex justify-center mb-1 mt-2">
                        <button
                          className="text-sm"
                          onClick={() => setIsMoreOpen(item.id)}
                        >
                          {isMoreOpen === item.id ? '닫기' : '더보기'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span>스케쥴을 추가해주세요.</span>
              )}
            </div>
          </div>
        </section>
      )}

      {isShowAlert === '일정삭제' && (
        <Alerts
          title="일정 삭제"
          message="정말로 일정을 삭제하시겠습니까?"
          type="warn"
        />
      )}
      {isShowAlert === '장소삭제' && (
        <Alerts
          title="장소 삭제"
          message="정말로 장소를 삭제하시겠습니까?"
          type="warn"
        />
      )}
      {isShowTimeModal && <TimeModal setIsShowModal={setIsShowTimeModal} />}
      {isShowDateModal && <DateModal setIsShowDateModal={setIsShowDateModal} />}
    </>
  );
}

export default Schedule;
