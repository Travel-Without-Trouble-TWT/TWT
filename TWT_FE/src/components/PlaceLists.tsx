import { useState } from 'react';

//components
import { PageProps } from '../api/type';
import Pagination from './Pagination';
import Loader from './Loader';
import ScheduleModal from './ScheduleModal';

interface PlaceListsProps {
  places: PageProps;
  placeLocation: string;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  placeLoading: boolean;
  setIsTitleOpen: (isTitleOpen: number) => void;
}

function PlaceLists({
  places,
  placeLocation,
  placeLoading,
  setIsTitleOpen,
  setCurrentPage,
  currentPage,
}: PlaceListsProps) {
  const [selectedPlace, setSelectedPlace] = useState<null | number>(null);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectedClick = (id: number) => {
    setSelectedPlace(id);
    setShowModal('schedule');
  };
  const [showModal, setShowModal] = useState<string | ''>('');
  return (
    <div>
      {placeLoading ? (
        <Loader size={'30px'} />
      ) : (
        <>
          {places ? (
            places.content.map((place) => (
              <div key={place.id}>
                <div className="h-32 flex justify-between border-b-2 border-lightgray p-2 dark:border-slate-500">
                  <div className="flex p-3 ">
                    <img
                      className="w-[130px] h-full mr-4"
                      src={place.placeImageUrl}
                    />
                    <div className="flex flex-col justify-evenly">
                      <p
                        className="text-lg font-bold leading-5 hover:underline hover:cursor-pointer dark:text-white md:text-sm xs:text-sm"
                        role="button"
                        onClick={() => setIsTitleOpen(place.id)}
                      >
                        {place.placeName}
                      </p>
                      <p className="leading-5 text-sm dark:text-white md:text-xs">
                        {place.placeAddress}
                      </p>
                      <p className="text-gray leading-5 text-sm dark:text-gray-300 md:text-xs xs:text-xs">
                        {place.placeType === 'STAY'
                          ? '숙소'
                          : place.placeType === 'HOT_PLACE'
                          ? '명소'
                          : place.placeType === 'RESTAURANT'
                          ? '맛집'
                          : ''}{' '}
                        | {place.placeLocation}
                      </p>
                    </div>
                  </div>
                  <div className="flex self-center mr-3">
                    <button
                      className="w-full text-blue text-sm bg-skyblue bg-opacity-20 px-3 py-1 rounded-2xl md:text-xs xs:text-xs"
                      onClick={() => handleSelectedClick(place.id)}
                    >
                      선택
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="flex justify-center items-center text-gray font-semibold">
              데이터가 존재하지 않습니다.
            </span>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={places ? places.totalPages : 0}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {showModal === 'schedule' && (
        <ScheduleModal
          setShowModal={setShowModal}
          selectedPlace={selectedPlace}
          placeLocation={placeLocation}
        />
      )}
    </div>
  );
}

export default PlaceLists;
