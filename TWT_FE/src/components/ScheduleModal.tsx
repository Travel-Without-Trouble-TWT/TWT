import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

//components
import NewScheduleSection from './NewScheduleSection';
import ExistingScheduleSection from './ExistingScheduleSection';

import { AiOutlineClose } from 'react-icons/ai';
import { useAddSchedule, usePostSchedule } from '../hooks/useProducts';

type ScheduleModalProps = {
  setShowModal: (value: string | '') => void;
  data: any;
  selectedPlace: number | null;
};

function ScheduleModal({
  setShowModal,
  data,
  selectedPlace,
}: ScheduleModalProps) {
  const { location } = useParams();
  const placeLocation = decodeURIComponent(String(location));
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [accordionType, setAccordionType] = useState<string | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [startAt, setStartAt] = useState<Date | null>(null);
  const [endAt, setEndAt] = useState<Date | null>(null);
  const [isNewSchedule, setIsNewSchedule] = useState<boolean>(false);

  const {
    postSchedule,
    schedulePosting,
    schedulePostingSuccess,
    schedulePostingError,
  } = usePostSchedule();

  const {
    addSchedule,
    scheduleAdding,
    scheduleAddingSuccess,
    scheduleAddingError,
  } = useAddSchedule();

  const getDatetoString = (date: Date) => {
    const year = date.getFullYear();
    const month = ('0' + (1 + date.getMonth())).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  };

  const handleAddButtonClick = () => {
    if (isNewSchedule) {
      // 새로운 일정 추가 시
      if (startAt && endAt && selectedDay) {
        const newPostData = {
          startAt: getDatetoString(startAt),
          endAt: getDatetoString(endAt),
          placeId: selectedPlace,
          placeLocation: placeLocation,
          when: selectedDay,
        };
        postSchedule(newPostData);
      } else {
        // startAt 또는 endAt, when이 null일 때 오류 처리
        console.error('모든 정보를 입력하지 않았습니다.');
      }
    } else {
      addSchedule({
        scheduleId: selectedScheduleId,
        placeId: selectedPlace,
        when: selectedDay,
      });
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-lightgray/20 backdrop-blur-sm"
        aria-labelledby="header-5a content-5a"
        aria-modal="true"
        tabIndex={-1}
        role="dialog"
      >
        <div
          ref={wrapperRef}
          className="flex max-h-[90vh] w-4/5 max-w-2xl flex-col gap-6 overflow-hidden rounded-xl bg-white p-6 shadow-xl"
          id="modal"
          role="document"
        >
          <header id="header-5a" className="flex gap-4">
            <h3 className="flex-1 text-xl font-bold">🗓️ 일정 추가</h3>
            <button aria-label="close" onClick={() => setShowModal('')}>
              <AiOutlineClose />
            </button>
          </header>
          <div className="flex flex-col gap-2 p-3" tabIndex={1}>
            <div className="flex cursor-pointer items-center justify-between">
              <span className="font-semibold">새로운 일정 추가</span>
              <span
                className="font-semibold transition-transform duration-300"
                style={{
                  transform:
                    accordionType === '새로운일정'
                      ? 'rotate(45deg)'
                      : 'rotate(0deg)',
                }}
                onClick={() => {
                  setAccordionType('새로운일정');
                  setIsNewSchedule(true);
                }}
              >
                +
              </span>
            </div>

            {accordionType === '새로운일정' && (
              <NewScheduleSection
                startAt={startAt}
                setStartAt={setStartAt}
                endAt={endAt}
                setEndAt={setEndAt}
                setSelectedDay={setSelectedDay}
              />
            )}
          </div>

          <div className="flex flex-col gap-2 p-3" tabIndex={1}>
            <div className="flex cursor-pointer items-center justify-between">
              <span className="font-semibold">기존 일정</span>
              <span
                className="font-semibold transition-transform duration-300"
                style={{
                  transform:
                    accordionType === '기존일정'
                      ? 'rotate(45deg)'
                      : 'rotate(0deg)',
                }}
                onClick={() => {
                  setAccordionType('기존일정');
                  setIsNewSchedule(false);
                }}
              >
                +
              </span>
            </div>

            {accordionType === '기존일정' && (
              <ExistingScheduleSection
                data={data}
                setSelectedScheduleId={setSelectedScheduleId}
                setSelectedDay={setSelectedDay}
                selectedScheduleId={selectedScheduleId}
              />
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddButtonClick}
              className="inline-flex items-center justify-center flex-1 h-10 gap-2 px-5 text-sm font-semibold tracking-wide duration-300 rounded whitespace-nowrap bg-skyblue/80 hover:bg-skyblue"
            >
              추가
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleModal;
