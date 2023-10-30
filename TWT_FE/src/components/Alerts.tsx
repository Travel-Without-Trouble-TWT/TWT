import { useRecoilState } from 'recoil';
import { alertState } from '../atom/recoil';
import { AiOutlineClose } from 'react-icons/ai';

export interface AlertsProps {
  type?: 'success' | 'error';
  title?: string;
  message?: string;
  onConfirm?: () => void;
}

function Alerts({
  type = 'success',
  title = '',
  message = '',
  onConfirm,
}: AlertsProps) {
  const [alert, setAlert] = useRecoilState(alertState);
  const bgColor = type === 'success' ? 'bg-sky-100' : 'bg-rose-100';
  const textColor = type === 'success' ? 'text-sky-600' : 'text-rose-400';
  const icon =
    type === 'success' ? (
      <span className="h-6 w-6 shrink-0">💡</span>
    ) : (
      <span className="h-6 w-6 shrink-0">🚨</span>
    );
  const buttonColor = type === 'success' ? 'bg-sky-500' : 'bg-rose-400';
  const buttonHoverColor = type === 'success' ? 'bg-sky-600' : 'bg-rose-500';

  if (!alert) {
    return null;
  } else {
    return (
      <div
        role="alert"
        className={`${
          alert === null && 'hidden'
        } flex flex-col rounded ${bgColor} px-4 py-3 text-sm ${textColor} animate-fadeInRight fixed top-20 right-0 w-[500px] xs:w-[200px] z-50`}
      >
        <div className="mb-2 flex items-center gap-4">
          {icon}
          <h3 className="flex-1 font-semibold">{title}</h3>
          <button aria-label="close" onClick={() => setAlert(null)}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="px-9">
          <p>{message}</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              if (onConfirm) {
                onConfirm();
                setAlert(null);
              } else {
                setAlert(null);
              }
            }}
            className={`inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded ${buttonColor} px-4 text-xs font-medium tracking-wide text-white transition duration-300 hover:${buttonHoverColor}`}
          >
            <span className="relatvie">확인</span>
          </button>
          {type === 'error' && (
            <button
              onClick={() => setAlert(null)}
              className={`inline-flex h-8 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded px-4 text-xs font-medium tracking-wide ${textColor} transition duration-300 hover:${buttonColor} hover:font-bold`}
            >
              <span className="relative">취소</span>
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Alerts;
