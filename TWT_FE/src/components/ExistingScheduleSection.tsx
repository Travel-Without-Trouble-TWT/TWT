import { useExistedSchedules } from '../hooks/useProducts';

function ExistingScheduleSection({
  selectedScheduleId,
  setSelectedScheduleId,
  placeLocation,
  setSelectedDay,
}: {
  selectedScheduleId: number | null;
  setSelectedScheduleId: (value: number | null) => void;
  placeLocation: string;
  setSelectedDay: (value: number | null) => void;
}) {
  const {
    existedSchedules,
    existedScheduling,
    existedScheduleError,
    existedScheduleRefetch,
  } = useExistedSchedules(placeLocation);
  return (
    <div className="flex flex-col gap-2 px-1">
      {existedSchedules && existedSchedules.length > 0 ? (
        existedSchedules.map((item) => (
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
                  item.days.map((day: number, index: number) => (
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
        <span className="text-sm text-gray flex justify-center">
          기존 일정이 존재하지 않습니다.
        </span>
      )}
    </div>
  );
}

export default ExistingScheduleSection;
