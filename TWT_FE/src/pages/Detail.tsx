import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import ReviewCarousel from '../components/ReviewCarousel';
import Stars from '../components/Stars';
import ScheduleModal from '../components/ScheduleModal';
import ReviewModal from '../components/ReviewModal';

function Detail() {
  const [showModal, setShowModal] = useState<string | ''>('');
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = async () => {
    setIsLiked(!isLiked);
  };
  return (
    <section className="bg-lightgray dark:bg-gray-900 h-full flex justify-center flex-col lg:px-48 tablet:px-10 py-6">
      <img
        className="w-full h-full rounded-lg mb-2"
        src="https://www.lottehotel.com/content/dam/lotte-hotel/signiel/seoul/overview/local-guide/180708-7-2000-ove-seoul-signiel.jpg.thumb.768.768.jpg"
      />
      <div className="leading-10 bg-white rounded-lg shadow-xl p-8 mb-2 ">
        <h2 className="text-xl font-bold">장소명</h2>
        <div className="flex gap-2">
          <Stars />
          <span className="font-semibold text-gray">4.1 / 5</span>
        </div>
        <div className="flex gap-5">
          <button onClick={() => setShowModal('schedule')}>일정 추가</button>
          <button
            className="flex items-center transition duration-300"
            onClick={handleLike}
          >
            좋아요
            {isLiked ? (
              <AiFillHeart className="text-red ml-1" />
            ) : (
              <AiOutlineHeart className="text-red ml-1" />
            )}
          </button>
          <button onClick={() => setShowModal('review')}>리뷰 작성</button>
        </div>
        <h2 className="text-xl font-bold">기본 정보</h2>
        <h2 className="text-xl font-bold">상세 정보</h2>
      </div>
      <div className="bg-white rounded-lg shadow-xl p-8 mb-2">
        <div className="flex gap-2">
          <h2 className="text-xl font-bold">리뷰 </h2>
          <h2 className="text-xl font-bold text-skyblue">100+</h2>
        </div>
        <ReviewCarousel />
      </div>
      <div className="bg-white rounded-lg shadow-xl p-8 mb-2">
        <div className="flex gap-2">
          <h2 className="text-xl font-bold">추천 플레이스</h2>
        </div>
      </div>
      {showModal === 'schedule' && (
        <ScheduleModal setShowModal={setShowModal} />
      )}
      {showModal === 'review' && <ReviewModal setShowModal={setShowModal} />}
    </section>
  );
}

export default Detail;
