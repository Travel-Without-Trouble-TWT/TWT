import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
//component
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner';
//icons
import { MdOutlineFoodBank, MdOutlineAttractions } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { usePlaces } from '../hooks/useProducts';

function Selected() {
  const [placeType, setPlaceType] = useState<string>('ALL'); //"ALL", "STAY", "RESTAURANT", "HOT_PLACE"
  const [isTitleOpen, setIsTitleOpen] = useState<number | null>(null);

  const { location, type } = useParams();
  const placeLocation = decodeURIComponent(String(location));
  const navigate = useNavigate();

  useEffect(() => {
    //현재 url에서 placeType 파라미터 추출
    if (type) {
      setPlaceType(type);
    }
  }, [location, type]);

  const {
    places,
    fetchNextPage,
    hasNextPage,
    placeLoading,
    placeError,
    center,
  } = usePlaces(placeType, placeLocation);

  const handleLocationButtonClick = (newPlaceType: string) => {
    // 버튼 클릭 시 URL 업데이트
    setPlaceType(newPlaceType);
    fetchNextPage({ pageParam: 0 });
    navigate(`/search/${placeLocation}/${newPlaceType}`);
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto lg:flex-row">
          <h1 className="text-3xl font-bold lg:text-4xl dark:text-white">
            {placeLocation} 여행
          </h1>
          <div className="py-3 flex justify-between border-b border-lightgray mb-4">
            <div className="flex">
              <button
                className="flex text-sm border-2 px-2 py-1 border-lightgray rounded-md mr-2 hover:bg-lightgray transition-colors duration-300 items-center"
                id="ALL"
                onClick={() => handleLocationButtonClick('ALL')}
              >
                전체
              </button>
              <button
                className="flex text-sm border-2 px-2 py-1 border-lightgray rounded-md mr-2 hover:bg-lightgray transition-colors duration-300 items-center"
                id="HOT_PLACE"
                onClick={() => handleLocationButtonClick('HOT_PLACE')}
              >
                <MdOutlineAttractions />
                명소
              </button>
              <button
                className="flex text-sm border-2 px-2 py-1 border-lightgray rounded-md mr-2 hover:bg-lightgray transition-colors duration-300 items-center"
                id="RESTAURANT"
                onClick={() => handleLocationButtonClick('RESTAURANT')}
              >
                <MdOutlineFoodBank />
                맛집
              </button>
              <button
                className="flex text-sm border-2 px-2 py-1 border-lightgray rounded-md mr-2 hover:bg-lightgray transition-colors duration-300 items-center"
                id="STAY"
                onClick={() => handleLocationButtonClick('STAY')}
              >
                <AiOutlineHome />
                숙소
              </button>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-1 flex-col lg:flex-row w-full">
            <div>
              {placeLoading ? (
                <Spinner />
              ) : (
                <>
                  {places ? (
                    places?.pages.map((content) => (
                      <div key={content.id}>
                        <div className="h-32 flex justify-between border-b-2 border-lightgray">
                          <div className="flex p-3">
                            <img
                              className="w-[130px] h-full mr-4"
                              src={content.placeImageUrl}
                            />
                            <div className="flex flex-col justify-evenly">
                              <p
                                className="text-lg font-bold leading-5 hover:underline hover:cursor-pointer"
                                role="button"
                                onClick={() => setIsTitleOpen(content.id)}
                              >
                                {content.placeName}
                              </p>
                              <p className="leading-5 text-sm">
                                {content.placeAddress}
                              </p>
                              <p className="text-gray leading-5 text-sm">
                                {content.placeType} |{content.placeLocation}
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
                </>
              )}
            </div>

            <div className="grid flex-grow lg:w-full lg:h-full h-[590px] z-0">
              {placeLoading ? (
                <Spinner />
              ) : (
                <>
                  <Map
                    center={center}
                    style={{ width: 'full', height: 'full' }}
                    level={10}
                  >
                    {places ? (
                      places?.pages.map((content) => (
                        <CustomOverlayMap
                          position={{
                            lat: content.latitude,
                            lng: content.longitude,
                          }}
                          key={content.id}
                        >
                          <div
                            className={`z-10 flex items-center justify-center text-white -translate-x-1/2 rounded-full bg-amber-500 ring-2 ring-white ${
                              isTitleOpen && 'py-1 px-3 gap-1'
                            }`}
                          >
                            <MdOutlineAttractions />
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
                      <span>데이터가 존재하지 않습니다.</span>
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
