import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';

//component
import Loader from '../components/Loader';
import PlaceLists from '../components/PlaceLists';
//icons
import { MdOutlineFoodBank, MdOutlineAttractions } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { usePlaces } from '../hooks/useProducts';
import { DataProps } from '../api/type';

const buttonData = [
  { id: 'ALL', text: '전체' },
  { id: 'HOT_PLACE', text: '명소', icon: <MdOutlineAttractions /> },
  { id: 'RESTAURANT', text: '맛집', icon: <MdOutlineFoodBank /> },
  { id: 'STAY', text: '숙소', icon: <AiOutlineHome /> },
];

function Selected() {
  const [placeType, setPlaceType] = useState<string>('ALL'); //"ALL", "STAY", "RESTAURANT", "HOT_PLACE"
  const [isTitleOpen, setIsTitleOpen] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPlace, setSelectedPlace] = useState({ lat: null, lng: null });

  const { location } = useParams();
  const placeLocation = decodeURIComponent(String(location));

  const { places, placeLoading, placeError, center, placeRefetch } = usePlaces(
    placeType,
    placeLocation,
    currentPage - 1
  );

  const handleLocationButtonClick = (newPlaceType: string) => {
    setPlaceType(newPlaceType);
    setCurrentPage(1);
  };

  useEffect(() => {
    placeRefetch();
  }, [placeType, currentPage]);

  return (
    <>
      <section className="bg-white dark:bg-slate-950 min-h-screen">
        <div className="container px-6 py-10 mx-auto lg:flex-row">
          <h1 className="text-3xl font-bold lg:text-4xl dark:text-white">
            {placeLocation} 여행
          </h1>
          <div className="py-3 flex justify-between border-b border-lightgray mb-4 dark:border-slate-500">
            <div className="flex">
              {buttonData.map((button) => (
                <button
                  key={button.id}
                  className="flex text-sm border-2 px-2 py-1 border-lightgray dark:border-skyblue dark:text-white rounded-md mr-2 hover:bg-lightgray dark:hover:bg-skyblue hover:font-semibold transition-colors duration-300 items-center focus:bg-lightgray focus:font-semibold dark:focus:bg-skyblue"
                  id={button.id}
                  onClick={() => handleLocationButtonClick(button.id)}
                >
                  {button.icon}
                  {button.text}
                </button>
              ))}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-1 flex-col lg:flex-row w-full dark:bg-slate-800">
            <PlaceLists
              places={places}
              placeLocation={placeLocation}
              placeLoading={placeLoading}
              setIsTitleOpen={setIsTitleOpen}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
            <div className="grid flex-grow lg:w-full lg:h-full h-[590px] z-0">
              {placeLoading ? (
                <Loader size={'30px'} />
              ) : (
                <>
                  <Map
                    center={center}
                    style={{ width: 'full', height: 'full' }}
                    level={10}
                  >
                    {places ? (
                      places.content.map((content: DataProps) => (
                        <CustomOverlayMap
                          position={{
                            lat: content.latitude,
                            lng: content.longitude,
                          }}
                          key={content.id}
                        >
                          <div
                            className={`flex items-center justify-center text-white -translate-x-1/2 rounded-full bg-amber-500 ring-2 ring-white ${
                              isTitleOpen === content.id &&
                              'py-1 px-3 gap-1 z-10'
                            } ${
                              content.placeType === 'STAY' && 'bg-pink-500'
                            } ${
                              content.placeType === 'RESTAURANT' && 'bg-blue'
                            }`}
                          >
                            {content.placeType === 'HOT_PLACE' && (
                              <MdOutlineAttractions />
                            )}
                            {content.placeType === 'RESTAURANT' && (
                              <MdOutlineFoodBank />
                            )}
                            {content.placeType === 'STAY' && <AiOutlineHome />}
                            {isTitleOpen === content.id && (
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                  <a
                                    href={`/detail/${content.id}`}
                                    className="hover:underline"
                                  >
                                    {content.placeName}
                                  </a>
                                  ({content.reviewNum})
                                </span>
                                <span className="text-xs font-semibold">
                                  ★{content.star} ♥︎{content.placeHeart}
                                </span>
                              </div>
                            )}
                          </div>
                        </CustomOverlayMap>
                      ))
                    ) : (
                      <span className="flex justify-center items-center text-gray font-semibold">
                        데이터가 존재하지 않습니다.
                      </span>
                    )}
                  </Map>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Selected;
