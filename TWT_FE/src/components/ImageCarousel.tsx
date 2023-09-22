import { useEffect, useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  selectedIndex: number;
}

function ImageCarousel({ images, selectedIndex }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  useEffect(() => {
    setCurrentIndex(selectedIndex);
  }, [selectedIndex]);

  const goPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-lg h-[70vh] flex justify-center items-center">
      <button
        className="absolute left-0 top-1/2 z-10 p-2 bg-gray/20 text-slate-500 rounded-full transform -translate-y-1/2 hover:bg-gray/40 focus:outline-none focus:ring focus:ring-opacity-50"
        onClick={goPrev}
      >
        &lt;
      </button>
      <button
        className="absolute right-0 top-1/2 z-10 p-2 bg-gray/20 text-slate-500 rounded-full transform -translate-y-1/2 hover:bg-gray/40 focus:outline-none focus:ring focus:ring-opacity-50"
        onClick={goNext}
      >
        &gt;
      </button>
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex}`}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export default ImageCarousel;
