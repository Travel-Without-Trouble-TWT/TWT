import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { AiOutlineCalendar } from 'react-icons/ai';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../components/Loader';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';

import { MdOutlineFoodBank, MdOutlineAttractions } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { useQuery } from 'react-query';

function Selected() {
  // 초기 리스트
  const [items, setItems] = useState();
  const [moreItems, setMoreItems] = useState(true);
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  // const fetchAttractions = () => {
  //   axios.get('/search/location?placeLocation=')
  // }
  // const {isLoading, isError, data, error} = useQuery('attractions', fetchAttractions, {
  //   refetchOnWindowFocus : false,
  //   retry : 0,
  //   onSuccess : data => {
  //     console.log(data);
  //   },
  //   onError: event =>{
  //     console.log(event.message)
  //   }
  // });
  // if(isLoading) {
  //   return <Loader />
  // }
  // if(isError){
  //   return <h1>Error : {error.message}</h1>
  // }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold lg:text-4xl dark:text-white">
            00여행
          </h1>
          <div className="py-3 flex justify-between border-b border-lightgray mb-4">
            <div className="flex">
              <button className="flex text-sm border-2 px-2 py-1 border-lightgray rounded-md mr-2 hover:bg-lightgray transition-colors duration-300 items-center">
                <MdOutlineAttractions />
                명소
              </button>
              <button className="flex text-sm border-2 px-2 py-1 border-lightgray rounded-md mr-2 hover:bg-lightgray transition-colors duration-300 items-center">
                <MdOutlineFoodBank />
                맛집
              </button>
              <button className="flex text-sm border-2 px-2 py-1 border-lightgray rounded-md hover:bg-lightgray transition-colors duration-300 items-center">
                <AiOutlineHome />
                숙소
              </button>
            </div>

            <div>
              <DatePicker
                className="border-2 border-lightgray rounded-md px-2 py-1 text-sm cursor-pointer"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
                locale={ko}
                minDate={new Date()}
                monthsShown={2}
                placeholderText="🗓️ 날짜 입력"
                dateFormat="yy.MM.dd"
              ></DatePicker>
            </div>
          </div>

          <div className="flex flex-col w-full lg:flex-row">
            <div>
              <div className="h-32 flex justify-between border-b-2 border-lightgray">
                <div className="flex p-3">
                  <img
                    className="w-[130px] h-full mr-4"
                    src="https://www.gtdc.or.kr/dzSmart/upfiles/Tours/2018August/34/0cbd16f8edf5e3e1ec23f1da43b791de_1534734408.jpg"
                  />
                  <div className="flex flex-col justify-evenly">
                    <p className="text-lg font-bold leading-5">Title</p>
                    <p className="leading-5 text-sm">description</p>
                    <p className="text-gray leading-5 text-sm">
                      category | location
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
            <div className="grid flex-grow lg:h-[890px] h-[590px] z-0">
              <Map
                center={{ lat: 37.558090961074825, lng: 126.99847210567884 }}
                style={{ width: 'full', height: 'full' }}
                level={3}
              ></Map>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Selected;
