import InfiniteScroll from 'react-infinite-scroller';
import Carousel from '../components/Carousel';
import Searchbar from '../components/Searchbar';
import ReviewCard from '../components/ReviewCard';
import Spinner from '../components/Spinner';
import List from '../components/List';
import { useSchedules, useTop10 } from '../hooks/useProducts';

function Main() {
  const {
    schedules,
    fetchNextPage,
    hasNextPage,
    scheduleLoading,
    scheduleError,
  } = useSchedules();
  const { top10, top10Loading, isError } = useTop10();

  return (
    <div className="min-w-full min-h-screen flex justify-center items-center">
      <div className="tablet:w-2/3 w-full flex flex-col space-y-20 py-1 bg-lightgray">
        <div>
          <div className="relative">
            <Carousel />
            <div className="absolute w-full p-10 bottom-[-60px]">
              <Searchbar />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white p-10 rounded">
          <div className="flex self-start items-center gap-2">
            <p className="font-bold text-xl self-start">
              여기가 그렇게 HOT 하다며? 😎
            </p>
            <p>최근 많이 저장된 관광지・맛집・숙소</p>
          </div>
          {top10 &&
            top10.map((place: any) => (
              <List
                id={place.id}
                placeName={place.placeName}
                placeType={place.placeType}
                placeLocation={place.placeLocation}
                star={place.star}
                placeHeart={place.placeHeart}
                placeImageUrl={place.placeImageUrl}
              />
            ))}
        </div>

        <div className="flex flex-col items-center bg-white p-10 rounded">
          <div className="flex self-start items-center gap-2">
            <p className="font-bold text-xl">너.. P야?🤦 그래서 준비했어!</p>
            <p>여행 일정과 팁 알아가기</p>
          </div>

          <InfiniteScroll
            loadMore={fetchNextPage}
            hasMore={hasNextPage}
            loader={<Spinner />}
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
  );
}

export default Main;
