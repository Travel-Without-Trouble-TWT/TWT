import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//components
import Spinner from './Spinner';
import NewScheduleSection from './NewScheduleSection';
import ExistingScheduleSection from './ExistingScheduleSection';

import { AiOutlineClose } from 'react-icons/ai';
import { useAddSchedule, usePostSchedule } from '../hooks/useProducts';
import dateFormat from '../utils/toStringByFormat';
import Alerts from './Alerts';

type ScheduleModalProps = {
  setShowModal: (value: string | '') => void;
  selectedPlace: number | null;
  placeLocation: string;
};

function ScheduleModal({
  setShowModal,
  selectedPlace,
  placeLocation,
}: ScheduleModalProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [accordionType, setAccordionType] = useState<string | null>(null);
  const [isNewSchedule, setIsNewSchedule] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null
  );
  const [startAt, setStartAt] = useState<Date | null>(null);
  const [endAt, setEndAt] = useState<Date | null>(null);
  const newScheduleData = {
    endAt: endAt ? dateFormat(endAt) : null,
    placeId: selectedPlace,
    placeLocation: placeLocation,
    startAt: startAt ? dateFormat(startAt) : null,
    when: selectedDay,
  };
  const existedScheduleData = {
    scheduleId: selectedScheduleId,
    placeId: selectedPlace,
    when: selectedDay,
  };

  const {
    postSchedule,
    schedulePosting,
    schedulePostingSuccess,
    schedulePostingError,
  } = usePostSchedule(newScheduleData);

  const {
    addSchedule,
    scheduleAdding,
    scheduleAddingSuccess,
    scheduleAddingError,
  } = useAddSchedule(existedScheduleData);

  const handleAddButtonClick = async () => {
    if (isNewSchedule) {
      // 새로운 일정 추가 시
      await postSchedule(newScheduleData);
    } else {
      await addSchedule(existedScheduleData);
    }
    if (schedulePostingSuccess || scheduleAddingSuccess) {
      setShowModal('');
      return (
        <Alerts
          type="success"
          title="일정 추가 성공"
          message="해당 장소가 일정에 등록되었습니다. 확인하러 가시겠습니까?"
          onConfirm={() => navigate('/mypage')}
        />
      );
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
          className="flex max-h-[90vh] w-4/5 max-w-2xl flex-col gap-6 overflow-hidden rounded-xl bg-white p-6 shadow-xl dark:bg-slate-800"
          id="modal"
          role="document"
        >
          <header id="header-5a" className="flex gap-4 dark:text-white">
            <h3 className="flex-1 text-xl font-bold">🗓️ 일정 추가</h3>
            <button aria-label="close" onClick={() => setShowModal('')}>
              <AiOutlineClose />
            </button>
          </header>
          <div className="flex flex-col gap-2 p-3" tabIndex={1}>
            <div className="flex cursor-pointer items-center justify-between dark:text-white">
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
                setSelectedDay={setSelectedDay}
                startAt={startAt}
                setStartAt={setStartAt}
                endAt={endAt}
                setEndAt={setEndAt}
              />
            )}
          </div>

          <div className="flex flex-col gap-2 p-3" tabIndex={1}>
            <div className="flex cursor-pointer items-center justify-between dark:text-white">
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
                placeLocation={placeLocation}
                selectedScheduleId={selectedScheduleId}
                setSelectedScheduleId={setSelectedScheduleId}
                setSelectedDay={setSelectedDay}
              />
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddButtonClick}
              className="inline-flex items-center justify-center flex-1 h-10 gap-2 px-5 text-sm font-semibold tracking-wide duration-300 rounded whitespace-nowrap bg-skyblue/80 hover:bg-skyblue"
            >
              {schedulePosting || scheduleAdding ? (
                <Spinner size={'5'} />
              ) : (
                '추가'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleModal;
