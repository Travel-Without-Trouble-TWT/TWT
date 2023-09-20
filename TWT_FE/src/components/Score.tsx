import { FaStarHalfAlt, FaStar } from 'react-icons/fa';

import { useState } from 'react';

function Score({ setScore }: { setScore: (score: number | null) => void }) {
  const [rating, setRating] = useState(0);
  const [isHalf, setIsHalf] = useState(false);

  const handleClickRating = (value: number) => {
    setRating(value);
    setIsHalf(value % 1 !== 0);
    setScore(value);
  };
  const handleMouseMove = (event: any) => {
    const target = event.currentTarget; // currentTarget을 사용하여 label 요소에 접근합니다.
    const rect = target.getBoundingClientRect();
    const isLeftHalf = event.clientX < rect.left + rect.width / 2;
    setIsHalf(isLeftHalf);
  };

  return (
    <div className="flex flex-row-reverse justify-end text-3xl gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const value = 5 - index; // 5, 4, 3, 2, 1

        return (
          <>
            <input
              type="radio"
              className="peer hidden"
              id={`value${value}`}
              value={value}
              name="star"
            />
            <label
              id={`${value}`}
              onMouseMove={handleMouseMove}
              onClick={() => handleClickRating(isHalf ? value - 0.5 : value)}
              htmlFor={`value${value}`}
              className="cursor-pointer text-gray peer-hover:text-yellow/60 peer-checked:text-yellow"
            >
              {isHalf && value - 0.5 === rating ? (
                <FaStarHalfAlt />
              ) : (
                <FaStar />
              )}
            </label>
          </>
        );
      })}
    </div>
  );
}

export default Score;
