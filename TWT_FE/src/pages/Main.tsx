import Carousel from '../components/Carousel';
import Searchbar from '../components/Searchbar';
import List from '../components/List';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InfiniteCarousel from '../components/InfiniteCarousel';

function Main() {
  return (
    <>
      <Header />
      <div className="pl-20 pr-20">
        <Carousel />
        <div className="w-full p-10">
          <Searchbar />
        </div>

        <div className="flex items-center mt-20">
          <p className="font-bold text-xl">방문지 TOP 10 🔥</p>
          <p className="ml-3">최근 많이 저장된 관광지・맛집</p>
        </div>
        <List />

        <div className="flex items-center mt-20">
          <p className="font-bold text-xl">최근 여행 리뷰</p>
          <p className="ml-3">여행 일정과 팁 알아가기</p>
        </div>
        <InfiniteCarousel />
      </div>
      <Footer />
    </>
  );
}

export default Main;
