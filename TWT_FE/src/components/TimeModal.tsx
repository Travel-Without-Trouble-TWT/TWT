import { useRef, useState } from 'react';
import { useEditTime } from '../hooks/useProducts';

function TimeModal({
  setIsShowModal,
  timeData,
}: {
  setIsShowModal: (showModal: boolean) => void;
  timeData: any;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { editTime, timeEditing, timeEditSuccess, timeEditError } = useEditTime(
    { ...timeData, arriveAt }
  );
  const [arriveAt, setArriveAt] = useState<string | null>(null);

  const handleAddTime = () => {
    editTime(...timeData, arriveAt);
  };
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
          <h3 className="flex-1 text-xl font-bold">⏰ 시간 추가</h3>
        </header>
        <input type="time" onChange={(e) => setArriveAt(e.target.value)} />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleAddTime}
            className="inline-flex items-center justify-center flex-1 h-10 px-5 text-sm font-semibold tracking-wide duration-300 rounded whitespace-nowrap bg-skyblue/80 hover:bg-skyblue"
          >
            추가
          </button>
          <button
            className="inline-flex items-center justify-center flex-1 h-10 px-5 text-sm font-semibold tracking-wide duration-300 rounded whitespace-nowrap bg-lightgray hover:bg-gray/40"
            onClick={() => setIsShowModal(false)}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimeModal;
