function ScheduleList({
  userDatas,
  isListOpen,
}: {
  userDatas: any;
  isListOpen: string | null;
}) {
  return (
    <>
      <ul className="divide-y divide-slate-100 shadow-md ml-5 rounded">
        <li className="flex items-center gap-4 px-4 py-3">
          <div className="flex items-center self-center">
            <img
              src="https://tailwindmix.b-cdn.net/products/product-shoe-01.jpeg"
              alt="schedule image"
              className="w-8 rounded"
            />
          </div>

          <div className="flex min-h-[2rem] min-w-0 flex-1 flex-col items-start justify-center gap-0">
            <span className="w-full truncate text-sm text-gray">
              2023.07.07-2023.07.10
            </span>
          </div>
        </li>
      </ul>
    </>
  );
}

export default ScheduleList;
