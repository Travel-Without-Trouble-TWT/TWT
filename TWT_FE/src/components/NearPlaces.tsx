import { useEffect, useRef } from 'react';
import { useNearPlaces } from '../hooks/useProducts';

import Glide from '@glidejs/glide';

function NearPlaces({ placeId }: { placeId: number }) {
  const { nearPlaces, nearPlacesLoading, nearPlacesError } =
    useNearPlaces(placeId);

  useEffect(() => {
    if (nearPlaces && nearPlaces.length > 0) {
      const slider = new Glide('#glide-03', {
        type: 'carousel',
        focusAt: 'center',
        perView: 3,
        autoplay: 3000,
        animationDuration: 1000,
        gap: 24,
      }).mount();
      return () => {
        slider.destroy();
      };
    }
  }, []);
  return (
    <div id="glide-03" className="w-full flex relative">
      <div className="w-full flex overflow-hidden" data-glide-el="track">
        <div className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] touch-pan-y will-change-transform w-full overflow-hidden p-0 shadow">
          {nearPlaces &&
            nearPlaces.map((place) => (
              <div className="relative shadow rounded w-1/2" key={place.id}>
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
                      {place.placeName}
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
      </div>
    </div>
  );
}

export default NearPlaces;
