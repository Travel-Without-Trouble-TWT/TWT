import InfiniteScroll from 'react-infinite-scroller';
import Carousel from '../components/Carousel';
import Searchbar from '../components/Searchbar';
import ReviewCard from '../components/ReviewCard';
import Spinner from '../components/Spinner';
import ListItem from '../components/ListItem';
import { useSchedules, useTop10 } from '../hooks/useProducts';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Main() {
  const {
    schedules,
    fetchNextPage,
    hasNextPage,
    schedulesLoading,
    schedulesError,
  } = useSchedules();
  const { top10, top10Loading, top10Error } = useTop10();

  return (
    <>
      <Header />
      <div className="min-w-full min-h-screen flex justify-center items-center lg:px-48 tablet:px-10 py-6 dark:bg-slate-950">
        <div className="tablet:w-2/3 w-full flex flex-col space-y-20 py-1 bg-lightgray dark:bg-slate-800">
          <div>
            <div className="relative">
              <Carousel />
              <div className="absolute w-full p-10 bottom-[-60px]">
                <Searchbar />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center bg-white p-10 rounded dark:bg-slate-900">
            <div className="flex self-start items-center gap-2">
              <p className="font-bold text-xl self-start dark:text-white">
                여기가 그렇게 HOT 하다며? 😎
              </p>
              <p className="dark:text-slate-200">
                최근 많이 저장된 관광지・맛집・숙소
              </p>
            </div>
            <section className="dark:bg-gray-900">
              <div className="container px-6 mx-auto">
                <div className="grid grid-cols-1 gap-8 mt-8 tablet:mt-16 tablet:grid-cols-2">
                  {top10Loading ? (
                    <Spinner />
                  ) : (
                    top10 &&
                    top10.map((place: any) => (
                      <ListItem
                        key={place.id}
                        id={place.id}
                        placeName={place.placeName}
                        placeType={place.placeType}
                        placeLocation={place.placeLocation}
                        star={place.star}
                        placeHeart={place.placeHeart}
                        placeImageUrl={place.placeImageUrl}
                      />
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col items-center bg-white p-10 rounded dark:bg-slate-900">
            <div className="flex self-start items-center gap-2">
              <p className="font-bold text-xl dark:text-white">
                너.. P야?🤦 그래서 준비했어!
              </p>
              <p className="dark:text-slate-200"> 여행 일정과 팁 알아가기</p>
            </div>

            <InfiniteScroll
              loadMore={fetchNextPage}
              hasMore={hasNextPage}
              loader={<Spinner size={'40'} />}
            >
              {schedules?.pages.map((page: any) =>
                page.map((review: any) => (
                  <ReviewCard key={review.id} data={review} />
                ))
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Main;
