import Carousel from '../components/Carousel';
import Searchbar from '../components/Searchbar';
import ReviewCard from '../components/ReviewCard';
import Loader from '../components/Loader';
import ListItem from '../components/ListItem';
import Error from '../components/Error';

import { useSchedules, useTop10 } from '../hooks/useProducts';
import { useState } from 'react';

function Main() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { schedules, schedulesLoading, schedulesError } =
    useSchedules(currentPage);
  const { top10, top10Loading, top10Error } = useTop10();

  if (schedulesError || top10Error) {
    return <Error />;
  }

  return (
    <div className="min-w-full min-h-screen flex justify-center items-center py-20 dark:bg-slate-950">
      <div className="w-2/3 flex flex-col space-y-20 py-1 bg-lightgray dark:bg-slate-800 sm:w-full xs:w-full">
        <div>
          <div className="relative">
            <Carousel />
            <div className="absolute w-full p-10 bottom-[-60px]">
              <Searchbar />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white p-7 rounded dark:bg-slate-900">
          <div className="flex self-start items-center gap-2 xs:flex-col">
            <p className="font-bold text-xl self-start dark:text-white">
              여기가 그렇게 HOT 하다며? 😎
            </p>
            <p className="dark:text-slate-200 xs:self-start">
              최근 많이 저장된 관광지・맛집・숙소
            </p>
          </div>
          <section className="dark:bg-gray-900">
            <div className="container px-6 mx-auto xs:px-3">
              <div className="grid grid-cols-2 gap-10 md:gap-5 mt-8 sm:grid-cols-1 xs:grid-cols-1">
                {top10Loading ? (
                  <Loader size={'20px'} />
                ) : (
                  top10 && <ListItem data={top10} />
                )}
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col items-center bg-white p-6 rounded dark:bg-slate-900">
          <div className="flex absolute gap-2 items-center self-start xs:flex-col">
            <p className="font-bold text-xl dark:text-white">
              너.. P야?🤦 그래서 준비했어!
            </p>
            <p className="dark:text-slate-200 xs:self-start">
              여행 일정과 팁 알아가기
            </p>
          </div>
          <button className="flex relative text-sm text-gray self-end mt-1">
            더보기
          </button>

          {schedulesLoading ? (
            <Loader size={'20px'} />
          ) : (
            <ReviewCard data={schedules} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
