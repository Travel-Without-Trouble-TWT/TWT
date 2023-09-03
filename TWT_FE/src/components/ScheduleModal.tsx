import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { dateRangeState } from '../recoil/Atoms';

function ScheduleModal({
  setShowModal,
}: {
  setShowModal: (showModal: string | '') => void;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isAccordionOpen, setAccordionOpen] = useState<string | null>(null);
  const [startAt, setStartAt] = useState<Date | null>(null);
  const [endAt, setEndAt] = useState<Date | null>(null);
  const [newScheduleDays, setNewScheduleDays] = useState<number[]>([]);

  const getDaysNum = ({ startAt, endAt }: { startAt: Date; endAt: Date }) => {
    let diff = Math.abs(startAt?.getTime() - endAt?.getTime());
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diff;
  };

  useEffect(() => {
    if (startAt && endAt) {
      const days = getDaysNum({ startAt, endAt });
      const arr = Array.from({ length: days + 1 }, (_, i) => i);
      setNewScheduleDays(arr);
    }
  }, [startAt, endAt]);

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
                    isAccordionOpen === '새로운일정'
                      ? 'rotate(45deg)'
                      : 'rotate(0deg)',
                }}
                onClick={() => setAccordionOpen('새로운일정')}
              >
                +
              </span>
            </div>

            {isAccordionOpen === '새로운일정' && (
              <>
                <span className="text-sm text-slate-700">
                  ✓ 여행 날짜를 입력해주세요.
                </span>
                <div className="flex justify-center gap-2">
                  <DatePicker
                    className="border-b border-skyblue px-2 py-1 text-sm cursor-pointer"
                    onChange={(date) => {
                      setStartAt(date);
                    }}
                    selected={startAt}
                    selectsStart
                    locale={ko}
                    minDate={new Date()}
                    monthsShown={1}
                    placeholderText="YY.MM.dd"
                    dateFormat="yy.MM.dd"
                  ></DatePicker>
                  <span>~</span>
                  <DatePicker
                    className="border-b border-skyblue px-2 py-1 text-sm cursor-pointer"
                    onChange={(date) => {
                      setEndAt(date);
                    }}
                    selected={endAt}
                    selectsEnd
                    locale={ko}
                    minDate={startAt}
                    monthsShown={1}
                    placeholderText="YY.MM.dd"
                    dateFormat="yy.MM.dd"
                  ></DatePicker>
                </div>

                <div className="mt-2 flex w-full overflow-auto gap-2">
                  {newScheduleDays.length > 0 &&
                    newScheduleDays.map((day, index) => (
                      <span
                        key={`day${index}`}
                        className="text-md font-semibold bg-lightgray p-3 rounded-2xl duration-300 hover:bg-gray/20 cursor-pointer"
                      >
                        DAY{day + 1}
                      </span>
                    ))}
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2 p-3" tabIndex={1}>
            <div className="flex cursor-pointer items-center justify-between">
              <span className="font-semibold">기존 일정</span>
              <span
                className="font-semibold transition-transform duration-300"
                style={{
                  transform:
                    isAccordionOpen === '기존일정'
                      ? 'rotate(45deg)'
                      : 'rotate(0deg)',
                }}
                onClick={() => setAccordionOpen('기존일정')}
              >
                +
              </span>
            </div>

            {isAccordionOpen === '기존일정' && (
              <div className="mt-2 flex justify-evenly">
                <span className="text-md font-semibold bg-lightgray p-3 rounded-2xl duration-300 hover:bg-gray/20 cursor-pointer">
                  day01
                </span>
                <span className="text-md font-semibold bg-lightgray p-3 rounded-2xl duration-300 hover:bg-gray/20 cursor-pointer">
                  day02
                </span>
                <span className="text-md font-semibold bg-lightgray p-3 rounded-2xl duration-300 hover:bg-gray/20 cursor-pointer">
                  day03
                </span>
                <span className="text-md font-semibold bg-lightgray p-3 rounded-2xl duration-300 hover:bg-gray/20 cursor-pointer">
                  day04
                </span>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button className="inline-flex items-center justify-center flex-1 h-10 gap-2 px-5 text-sm font-semibold tracking-wide duration-300 rounded whitespace-nowrap bg-skyblue/80 hover:bg-skyblue">
              추가
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleModal;
