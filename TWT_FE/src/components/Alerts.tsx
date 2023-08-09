import { useState } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineWarning,
} from 'react-icons/ai';

function Alerts({ type = 'success', title = '', message = '' }) {
  const [dismiss, setDismiss] = useState(false);

  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const borderColor =
    type === 'success' ? 'border-green-400' : 'border-red-400';
  const textColor = type === 'success' ? 'text-green-500' : 'text-rose-600';
  const icon =
    type === 'success' ? (
      <AiOutlineCheckCircle className="h-5 w-5 shrink-0" />
    ) : (
      <AiOutlineWarning className="h-5 w-5 shrink-0" />
    );
  return (
    <>
      <div
        role="alert"
        className={`${
          dismiss && 'hidden'
        } flex w-full flex-col rounded border ${borderColor} ${bgColor} px-4 py-3 text-sm ${textColor}`}
      >
        <div className="mb-2 flex items-center gap-4">
          {icon}
          <h3 className="flex-1 font-semibold">{title}</h3>
          <button aria-label="close" onClick={() => setDismiss(true)}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="px-9">
          <p>{message}</p>
        </div>
        <div>
          <button className="inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded bg-teal-400 px-4 text-xs font-medium tracking-wide text-white transition duration-300 hover:bg-teal-500">
            <span className="relatvie">확인</span>
          </button>
          <button className="inline-flex h-8 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded px-4 text-xs font-medium tracking-wide text-teal-500 transition duration-300 hover:bg-green-200 hover:text-bold">
            <span className="relative">취소</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Alerts;
