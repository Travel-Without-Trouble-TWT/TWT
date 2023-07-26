import { useState } from 'react';

import registDragEvent from '../utils/registDragEvent';
import Container from './Container';

const containerList = [
  {
    image:
      'https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png',
    profileImg:
      'https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png',
    title: 'Title 1',
    description: 'description 1',
  },
  {
    image:
      'https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png',
    profileImg:
      'https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png',
    title: 'Title 2',
    description: 'description 2',
  },
  {
    image:
      'https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png',
    profileImg:
      'https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png',
    title: 'Title 3',
    description: 'description 3',
  },
  {
    image:
      'https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png',
    profileImg:
      'https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png',
    title: 'Title 3',
    description: 'description 3',
  },
];

function InfiniteCarousel() {
  const SLIDER_WIDTH = 400;
  const inrange = (v: number, min: number, max: number) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);
  const [animate, setAnimate] = useState(false);

  return (
    <div className="overflow-hidden">
      <div
        className="flex"
        style={{
          transform: `translateX(${-currentIndex * SLIDER_WIDTH + transX}px)`,
          transition: `transform ${animate ? 300 : 0}ms ease-in-out 0s`,
        }}
        {...registDragEvent({
          onDragChange: (deltaX) => {
            setTransX(inrange(deltaX, -SLIDER_WIDTH + 10, SLIDER_WIDTH - 10));
          },
          onDragEnd: (deltaX) => {
            const maxIndex = containerList.length - 1;

            if (deltaX < -100)
              setCurrentIndex(inrange(currentIndex + 1, 0, maxIndex));
            if (deltaX > 100)
              setCurrentIndex(inrange(currentIndex - 1, 0, maxIndex));

            setAnimate(true);
            setTransX(0);
          },
        })}
        onTransitionEnd={() => {
          setAnimate(false);

          if (currentIndex === 0) {
            setCurrentIndex(containerList.length - 2);
          } else if (currentIndex === containerList.length - 1) {
            setCurrentIndex(1);
          }
        }}
      >
        {containerList.map((container, i) => (
          <div key={i} className="flex-shrink-0">
            <Container {...container} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfiniteCarousel;
