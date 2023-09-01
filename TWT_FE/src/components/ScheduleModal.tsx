import { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

function ScheduleModal({
  setShowModal,
}: {
  setShowModal: (showModal: string | '') => void;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isAccordionOpen, setAccordionOpen] = useState<boolean>(false);
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
          <div className="flex overflow-auto justify-evenly">
            <span className="text-md font-semibold bg-lightgray p-3 rounded-2xl duration-300 hover:bg-gray/20 cursor-pointer">
              day01
            </span>
          </div>
          <div className="flex flex-col gap-2 p-3" tabIndex={1}>
            <div className="flex cursor-pointer items-center justify-between">
              <span className="font-semibold">기존 일정</span>
              <span
                className="font-semibold transition-transform duration-300"
                style={{
                  transform: isAccordionOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
                onClick={() => setAccordionOpen(!isAccordionOpen)}
              >
                +
              </span>
            </div>

            {isAccordionOpen && (
              <div className="mt-2 flex justify-evenly">
                <span className="text-md font-semibold bg-lightgray p-3 rounded-2xl duration-300 hover:bg-gray/20 cursor-pointer">
                  day01
                </span>
                <span className="text-md font-semibold bg-lightgray p-3 rounded-2xl duration-300 hover:bg-gray/20 cursor-pointer">
                  day01
                </span>
                <span className="text-md font-semibold bg-lightgray p-3 rounded-2xl duration-300 hover:bg-gray/20 cursor-pointer">
                  day01
                </span>
                <span className="text-md font-semibold bg-lightgray p-3 rounded-2xl duration-300 hover:bg-gray/20 cursor-pointer">
                  day01
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
