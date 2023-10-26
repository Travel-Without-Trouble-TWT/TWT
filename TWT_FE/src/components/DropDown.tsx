import { useState } from 'react';
import { EmittersProps } from '../api/type';
import { FiTrash2 } from 'react-icons/fi';
import { useDeleteEmitter } from '../hooks/useAuth';

function DropDown(data: any) {
  const [currentEmitter, setCurrentEmitter] = useState<null | number>(null);

  const {
    deleteEmitter,
    deletingEmitter,
    deletingEmitterSuccess,
    deletingEmitterError,
  } = useDeleteEmitter();

  return (
    <ul className="absolute right-0 top-full z-50 mt-1 flex flex-col w-72 list-none rounded bg-white py-2 shadow-md">
      {data && data.length > 0 ? (
        data.map((item: EmittersProps, index: number) => {
          return (
            <li
              key={index}
              className={`${
                index === currentEmitter
                  ? 'bg-lightgray/30 text-white'
                  : 'bg-none'
              } flex items-start justify-start gap-2 p-2 px-5 transition-colors duration-300 hover:bg-lightgray/80 hover:cursor-pointer`}
            >
              <span className="leading-5 text-sm overflow-hidden whitespace-wrap hover:cursor-pointer">
                🔔 {item.message}
              </span>
            </li>
          );
        })
      ) : (
        <li className="text-gray flex items-start justify-start gap-2 p-2 px-5">
          <span className="flex flex-col gap-1 overflow-hidden  whitespace-wrap">
            <span className="leading-5 text-sm">🔔 알림함이 비어있습니다.</span>
          </span>
        </li>
      )}
    </ul>
  );
}

export default DropDown;
