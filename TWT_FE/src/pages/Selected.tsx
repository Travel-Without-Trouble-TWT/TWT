import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { dateRangeState } from '../recoil/Atoms';

import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import InfiniteScroll from 'react-infinite-scroll-component';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';

import { MdOutlineFoodBank, MdOutlineAttractions } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { usePlaces } from '../hooks/useProducts';

import Spinner from '../components/Spinner';
import Button from '../components/Button';

function Selected() {
  const [dateRange, setDateRange] = useRecoilState(dateRangeState);
  const [startDate, endDate] = dateRange;
  const [placeLocation, setPlaceLoacation] = useState('');
  const [placeType, setPlaceType] = useState('ALL'); //"ALL", "STAY", "RESTAURANT", "HOT_PLACE"
  const [isTitleOpen, setIsTitleOpen] = useState<number | null>(null);

  useEffect(() => {
    //현재 url에서 placeLoacation 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const locationParam = urlParams.get('placeLocation');

    if (locationParam) {
      setPlaceLoacation(locationParam);
    }
  }, []);

  const { places, fetchNextPage, hasNextPage, placeLoading, placeError } =
    usePlaces(placeType, placeLocation);

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-bold lg:text-4xl dark:text-white">
            {placeLocation} 여행
          </h1>
          <div className="py-3 flex justify-between border-b border-lightgray mb-4">
            <div className="flex">
              <Button type="ALL" label="전체" />
              <Button
                type="HOT_PLACE"
                icon={<MdOutlineAttractions />}
                label="명소"
              />
              <Button
                type="RESTAURANT"
                icon={<MdOutlineFoodBank />}
                label="맛집"
              />
              <Button type="STAY" icon={<AiOutlineHome />} label="숙소" />
            </div>

            <div className="flex flex-col w-full lg:flex-row">
              {placeLoading ? (
                <Spinner />
              ) : (
                <>
                  {places && places?.length > 0 ? (
                    places.map((page) =>
                      page.data.map((place) => (
                        <div key={place.id}>
                          <div className="h-32 flex justify-between border-b-2 border-lightgray">
                            <div className="flex p-3">
                              <img
                                className="w-[130px] h-full mr-4"
                                src="https://www.gtdc.or.kr/dzSmart/upfiles/Tours/2018August/34/0cbd16f8edf5e3e1ec23f1da43b791de_1534734408.jpg"
                              />
                              <div className="flex flex-col justify-evenly">
                                <p
                                  className="text-lg font-bold leading-5 hover:underline hover:cursor-pointer"
                                  role="button"
                                  onClick={() => setIsTitleOpen(place.title)}
                                >
                                  {place.title}
                                </p>
                                <p className="leading-5 text-sm">상세주소</p>
                                <p className="text-gray leading-5 text-sm">
                                  {place.placeType} |
                                  {place.placeAddress.split(' ')[1].length === 4
                                    ? place.placeAddress
                                        .split(' ')[1]
                                        .substr(0, 3)
                                    : place.placeAddress
                                        .split(' ')[1]
                                        .substr(0, 2)}
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
                    )
                  ) : (
                    <span>데이터가 존재하지 않습니다.</span>
                  )}
                </>
              )}

              <div className="grid flex-grow lg:h-[890px] h-[590px] z-0">
                <Map
                  center={{ lat: 33.55635, lng: 126.795841 }}
                  style={{ width: 'full', height: 'full' }}
                  level={4}
                >
                  <InfiniteScroll
                    dataLength={places ? places.length : 0}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={<Spinner />}
                  >
                    {placeLoading ? (
                      <Spinner />
                    ) : (
                      <>
                        {places && places?.length > 0 ? (
                          places.map((page) =>
                            page.data.map((place) => (
                              <CustomOverlayMap
                                position={{
                                  lat: place.latitude,
                                  lng: place.longitude,
                                }}
                                key={place.id}
                              >
                                <div
                                  className={`z-10 flex items-center justify-center text-white -translate-x-1/2 rounded-full bg-amber-500 ring-2 ring-white ${
                                    isTitleOpen && 'py-1 px-3 gap-1'
                                  }`}
                                >
                                  <MdOutlineAttractions />
                                  {isTitleOpen && (
                                    <div className="flex flex-col">
                                      <span className="text-sm font-semibold">
                                        <a
                                          href={`/detail/${place.id}`}
                                          className="hover:underline"
                                        >
                                          {place.placeName}
                                        </a>
                                        ({place.reviewNum})
                                      </span>
                                      <span className="text-xs font-semibold">
                                        ★{place.star} ♥︎{place.placeHeart}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </CustomOverlayMap>
                            ))
                          )
                        ) : (
                          <span>데이터가 존재하지 않습니다.</span>
                        )}
                      </>
                    )}
                  </InfiniteScroll>
                </Map>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Selected;
