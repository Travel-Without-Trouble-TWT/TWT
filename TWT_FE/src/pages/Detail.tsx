import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Spinner from '../components/Spinner';
import ReviewList from '../components/ReviewList';
import Stars from '../components/Stars';
import ScheduleModal from '../components/ScheduleModal';
import ReviewModal from '../components/ReviewModal';
import Pagination from '../components/Pagination';
import { usePlaceInfo } from '../hooks/useProducts';

function Detail() {
  const [showModal, setShowModal] = useState<string | ''>('');
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const placeId = useParams();
  console.log(placeId);

  const { placeInfos, placeInfoLoading, placeInfoError } = usePlaceInfo(
    Number(placeId.id)
  );

  const handleLike = async () => {
    setIsLiked(!isLiked);
  };
  return (
    <section className="bg-lightgray dark:bg-slate-950 h-full flex justify-center flex-col lg:px-48 tablet:px-10 py-6">
      {!placeInfoLoading && placeInfos ? (
        <>
          <img
            className="w-full h-auto rounded-lg mb-2"
            src={placeInfos.placeImageUrl}
          />
          <div className="leading-10 bg-white rounded-lg shadow-xl p-8 mb-2 dark:bg-slate-800">
            <h2 className="text-2xl font-bold dark:text-white">
              {placeInfos.placeName}
            </h2>
            <div className="flex gap-2 items-center">
              <Stars size={'h-6 w-6'} rating={placeInfos.star} />
              <span className="text-gray">{placeInfos.star} / 5</span>
            </div>
            <div className="flex gap-5 text-slate-700 font-semibold dark:text-slate-400">
              <button onClick={() => setShowModal('schedule')}>
                일정 추가
              </button>
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
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex flex-col text-slate-700">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold dark:text-white">
                    기본 정보
                  </h2>
                  <span className="text-gray text-sm font-semibold">
                    {placeInfos.placeType === 'STAY' && '숙소'}
                    {placeInfos.placeType === 'HOT_PLACE' && '명소'}
                    {placeInfos.placeType === 'RESTAURANT' && '맛집'} |{' '}
                    {placeInfos.placeLocation}
                  </span>
                </div>

                <span className="px-2 dark:text-slate-400">
                  <strong>📌 주소</strong> {placeInfos.placeAddress}
                </span>
                <span className="px-2 dark:text-slate-400">
                  <strong>📞 전화번호</strong> {placeInfos.placeCallNumber}
                </span>
              </div>
              <div className="flex flex-col gap-2 text-slate-700">
                <h2 className="text-xl font-bold dark:text-white">상세 정보</h2>
                <span className="flex leading-6 px-2 dark:text-slate-400">
                  {placeInfos.placeDescription}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-8 mb-2 flex flex-col justify-center dark:bg-slate-800">
            <div className="flex gap-2">
              <h2 className="text-xl font-bold dark:text-white">리뷰 </h2>
              <h2 className="text-xl font-bold text-skyblue">
                {placeInfos.reviewNum}
              </h2>
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <ReviewList />
              <Pagination />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-8 mb-2">
            <div className="flex gap-2">
              <h2 className="text-xl font-bold">추천 플레이스</h2>
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-full flex justify-center items-center">
          <Spinner size={'40'} />
        </div>
      )}
      {showModal === 'schedule' && (
        <ScheduleModal setShowModal={setShowModal} />
      )}
      {showModal === 'review' && <ReviewModal setShowModal={setShowModal} />}
    </section>
  );
}

export default Detail;
