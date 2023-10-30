import { useEffect, useRef } from 'react';
import { useNearPlaces } from '../hooks/useProducts';

import Glide from '@glidejs/glide';

import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

function NearPlaces({ placeId }: { placeId: number }) {
  const { nearPlaces, nearPlacesLoading, nearPlacesError } =
    useNearPlaces(placeId);

  const glideRef = useRef<null | Glide>(null);

  useEffect(() => {
    if (nearPlaces && nearPlaces.length > 0) {
      const slider = new Glide('.glide-01', {
        type: 'carousel',
        focusAt: 'center',
        perView: 2,
        autoplay: 3000,
        animationDuration: 1000,
        gap: 24,
        breakpoints: {
          1024: {
            perView: 3,
          },
          760: {
            perView: 2,
          },
          640: {
            perView: 1,
          },
        },
      }).mount();

      glideRef.current = slider;
      return () => {
        slider.destroy();
      };
    }
  }, [nearPlaces]);

  const goToPrev = () => {
    glideRef.current && glideRef.current.go('<');
  };

  const goToNext = () => {
    glideRef.current && glideRef.current.go('>');
  };
  return (
    <>
      <div className="glide-01 w-full relative">
        <div className="overflow-hidden" data-glide-el="track">
          <div className="flex whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] touch-pan-y will-change-transform w-full h-full overflow-hidden p-2 shadow">
            {nearPlaces &&
              nearPlaces.length > 0 &&
              nearPlaces.map((place) => (
                <div
                  className="relative shadow rounded w-full max-w-full min-h-full"
                  key={place.id}
                >
                  <figure>
                    <img
                      src={place.placeImageUrl}
                      alt="placeImage"
                      className="aspect-video w-full"
                    />
                  </figure>
                  <div className="h-full p-6 overflow-hidden">
                    <header className="mb-4">
                      <h3 className="text-xl text-black dark:text-white font-semibold hover:underline">
                        <a href={`/detail/${place.id}`}>{place.placeName}</a>
                      </h3>
                      <p className="text-sm text-gray">
                        {place.placeType} | {place.placeLocation}
                      </p>
                    </header>
                    <p className="h-full text-slate-500 text-sm overflow-hidden">
                      {place.placeDescription}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center gap-5 mt-3">
            <button aria-label="이전슬라이드" onClick={goToPrev}>
              <FaArrowCircleLeft className="text-skyblue" />
            </button>
            <button aria-label="이후슬라이드" onClick={goToNext}>
              <FaArrowCircleRight className="text-skyblue" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NearPlaces;
