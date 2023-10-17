import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';

function NewScheduleSection({
  setSelectedDay,
  startAt,
  setStartAt,
  endAt,
  setEndAt,
}: {
  setSelectedDay: (value: number | null) => void;
  startAt: Date | null;
  setStartAt: (value: Date | null) => void;
  endAt: Date | null;
  setEndAt: (value: Date | null) => void;
}) {
  const [newScheduleDays, setNewScheduleDays] = useState<number[]>([]);

  const getDaysNum = ({ startAt, endAt }: { startAt: Date; endAt: Date }) => {
    let diff = Math.abs(startAt?.getTime() - endAt?.getTime());
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diff;
  };

  useEffect(() => {
    if (startAt && endAt) {
      const days = getDaysNum({ startAt: startAt, endAt: endAt });
      const arr = Array.from({ length: days + 1 }, (_, i) => i);
      setNewScheduleDays(arr);
    }
  }, [startAt, endAt]);

  return (
    <>
      <span className="text-sm text-slate-700 dark:text-slate-300">
        ✓ 여행 날짜를 입력해주세요.
      </span>
      <div className="flex justify-center gap-2 z-50">
        <DatePicker
          className="border-b border-skyblue px-2 py-1 text-sm cursor-pointer"
          onChange={(date) => setStartAt(date)}
          selected={startAt}
          selectsStart
          locale={ko}
          minDate={new Date()}
          monthsShown={1}
          placeholderText="YY.MM.dd"
          dateFormat="yy.MM.dd"
        ></DatePicker>
        <span className="dark:text-slate-300">~</span>
        <DatePicker
          className="border-b border-skyblue px-2 py-1 text-sm cursor-pointer"
          onChange={(date) => setEndAt(date)}
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
        {newScheduleDays.map((day, index) => (
          <button
            key={`day${index}`}
            onClick={() => setSelectedDay(day + 1)}
            className="text-md font-semibold bg-lightgray dark:bg-lightgray p-3 rounded-2xl duration-300 hover:bg-gray/20 hover:text-white cursor-pointer focus:bg-skyblue"
          >
            Day{day + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default NewScheduleSection;
