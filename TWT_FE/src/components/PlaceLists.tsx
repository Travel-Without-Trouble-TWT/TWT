import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//components
import { PageProps } from '../api/type';
import Pagination from './Pagination';
import Loader from './Loader';
import ScheduleModal from './ScheduleModal';
import { useUserContext } from '../context';
import { useAlert } from '../hooks/useAlert';
import Alerts from './Alerts';

interface PlaceListsProps {
  places: PageProps | undefined;
  placeLocation: string;
  onTitleClick: (value: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  placeLoading: boolean;
}

function PlaceLists({
  places,
  placeLocation,
  onTitleClick,
  placeLoading,
  setCurrentPage,
  currentPage,
}: PlaceListsProps) {
  const [selectedPlace, setSelectedPlace] = useState<null | number>(null);
  const { isLogin } = useUserContext();
  const navigate = useNavigate();
  const { alert, showAlert } = useAlert();

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectedClick = (id: number) => {
    if (!isLogin) {
      showAlert({
        type: 'success',
        title: '로그인을 먼저 진행해주세요.',
        message: '해당 페이지로 이동하시겠습니까?',
        onConfirm: () => navigate('/login'),
      });
    } else {
      setSelectedPlace(id);
      setShowModal('schedule');
    }
  };
  const [showModal, setShowModal] = useState<string | ''>('');
  return (
    <div>
      {placeLoading ? (
        <Loader size={'30px'} />
      ) : (
        <>
          {places && places.totalPages > 0 ? (
            places.content.map((place: any) => (
              <div key={place.id}>
                <div className="h-32 flex justify-between border-b-2 border-lightgray p-2 dark:border-slate-500">
                  <div className="flex p-3 ">
                    <img
                      className="w-[130px] h-full mr-4 object-cover"
                      src={place.placeImageUrl}
                      alt={place.placeName}
                    />
                    <div className="flex flex-col justify-evenly">
                      <p
                        className="text-lg font-bold leading-5 hover:underline hover:cursor-pointer dark:text-white md:text-sm xs:text-sm"
                        role="button"
                        onClick={() => onTitleClick(place.id)}
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
      {alert && <Alerts {...alert} />}
    </div>
  );
}

export default PlaceLists;
