import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';

function DateModal({
  setIsShowDateModal,
}: {
  setIsShowDateModal: (showModal: boolean) => void;
}) {
  const [startAt, setStartAt] = useState<Date | null>(null);
  const [endAt, setEndAt] = useState<Date | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  return (
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
          <h3 className="flex-1 text-xl font-bold">🗓️ 날짜 선택</h3>
        </header>
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

        <div className="flex justify-end gap-2">
          <button className="inline-flex items-center justify-center flex-1 h-10 px-5 text-sm font-semibold tracking-wide duration-300 rounded whitespace-nowrap bg-skyblue/80 hover:bg-skyblue">
            완료
          </button>
          <button
            className="inline-flex items-center justify-center flex-1 h-10 px-5 text-sm font-semibold tracking-wide duration-300 rounded whitespace-nowrap bg-lightgray hover:bg-gray/40"
            onClick={() => setIsShowDateModal(false)}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default DateModal;
