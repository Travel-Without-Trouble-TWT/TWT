import { useEffect } from 'react';
import { useNearPlaces } from '../hooks/useProducts';

import Glide from '@glidejs/glide';

import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

function NearPlaces({ placeId }: { placeId: number }) {
  const { nearPlaces, nearPlacesLoading, nearPlacesError } =
    useNearPlaces(placeId);

  useEffect(() => {
    if (nearPlaces && nearPlaces.length > 0) {
      const slider = new Glide('.glide-01', {
        type: 'carousel',
        focusAt: 'center',
        perView: 3,
        autoplay: 3000,
        animationDuration: 1000,
        gap: 24,
        breakpoints: {
          1024: {
            perView: 3,
          },
          640: {
            perView: 2,
          },
        },
      }).mount();
      return () => {
        slider.destroy();
      };
    }
  }, []);
  return (
    <>
      <div className="glide-01 w-full relative">
        <div className="overflow-hidden" data-glide-el="track">
          <div className="flex whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] touch-pan-y will-change-transform w-full overflow-hidden p-0 shadow">
            {nearPlaces &&
              nearPlaces.map((place) => (
                <div
                  className="relative shadow rounded m-auto max-h-full w-full max-w-full"
                  key={place.id}
                >
                  <figure>
                    <img
                      src={place.placeImageUrl}
                      alt="placeImage"
                      className="aspect-video w-full"
                    />
                  </figure>
                  <div className="p-6">
                    <header className="mb-4">
                      <h3 className="text-xl text-black font-semibold">
                        <a href={`/detail/${place.id}`}>{place.placeName}</a>
                      </h3>
                      <p className="text-sm text-gray">
                        {place.placeType} | {place.placeLocation}
                      </p>
                    </header>
                    <p className="h-[200px] text-slate-500">
                      {place.placeDescription}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div>
            <button aria-label="이전슬라이드">
              <FaArrowCircleLeft className="text-skyblue" />
            </button>
            <button aria-label="이후슬라이드">
              <FaArrowCircleRight className="text-skyblue" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NearPlaces;
