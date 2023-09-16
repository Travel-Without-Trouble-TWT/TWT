//components
import { PageProps } from '../api/type';
import Pagination from './Pagination';
import Spinner from './Spinner';

interface PlaceListsProps {
  places: PageProps;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  placeLoading: boolean;
  setIsTitleOpen: (isTitleOpen: number) => void;
}

function PlaceLists({
  places,
  placeLoading,
  setIsTitleOpen,
  setCurrentPage,
  currentPage,
}: PlaceListsProps) {
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      {placeLoading ? (
        <Spinner size={'30px'} />
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
                        className="text-lg font-bold leading-5 hover:underline hover:cursor-pointer dark:text-white"
                        role="button"
                        onClick={() => setIsTitleOpen(place.id)}
                      >
                        {place.placeName}
                      </p>
                      <p className="leading-5 text-sm dark:text-white">
                        {place.placeAddress}
                      </p>
                      <p className="text-gray leading-5 text-sm dark:text-gray-300">
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
                    <button className="text-blue text-sm bg-skyblue bg-opacity-20 px-3 py-1 rounded-2xl">
                      선택
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span>데이터가 존재하지 않습니다.</span>
          )}
          <Pagination
            currentPage={currentPage}
            perPage={10}
            totalPages={places ? places.totalPages : 0}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default PlaceLists;
