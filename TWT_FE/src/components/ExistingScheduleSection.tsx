import { postScheduleProps } from '../api/type';

type ExistingScheduleSectionProps = {
  data: postScheduleProps[];
  setSelectedScheduleId: (id: number | null) => void;
  setSelectedDay: (day: number | null) => void;
  selectedScheduleId: number | null;
};

function ExistingScheduleSection({
  data,
  setSelectedScheduleId,
  setSelectedDay,
  selectedScheduleId,
}: ExistingScheduleSectionProps) {
  return (
    <div className="flex flex-col gap-2 px-1">
      {data.length > 0 ? (
        data.map((item: postScheduleProps) => (
          <span
            onClick={() => {
              setSelectedScheduleId(item.id);
              setSelectedDay(item.days ? item.days[0] : null);
            }}
            key={`schedule${item.id}`}
            className="flex flex-col text-sm text-slate-700 cursor-pointer"
          >
            ✓ {item.scheduleName} ({item.startAt} ~ {item.endAt})
            {selectedScheduleId === item.id && (
              <div className="flex gap-2 overflow-auto p-2">
                {item.days &&
                  item.days.map((day, index) => (
                    <button
                      key={`day${index}`}
                      onClick={() => setSelectedDay(day)}
                      className="text-md font-semibold bg-lightgray p-3 rounded-2xl duration-300 hover:bg-gray/20 cursor-pointer focus:bg-skyblue"
                    >
                      Day{day}
                    </button>
                  ))}
              </div>
            )}
          </span>
        ))
      ) : (
        <span>기존 일정이 존재하지 않습니다.</span>
      )}
    </div>
  );
}

export default ExistingScheduleSection;
