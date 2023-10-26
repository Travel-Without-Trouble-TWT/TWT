import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
//컴포넌트
import Loader from '../components/Loader';
import ReviewList from '../components/ReviewList';
import Stars from '../components/Stars';
import ScheduleModal from '../components/ScheduleModal';
import ReviewModal from '../components/ReviewModal';
import NearPlaces from '../components/NearPlaces';
import Alerts from '../components/Alerts';
import Error from '../components/Error';

import { useAddLike, usePlaceInfo } from '../hooks/useProducts';
import { useUserContext } from '../context';
import { useAlert } from '../hooks/useAlert';

function Detail() {
  const { isLogin } = useUserContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<string | ''>('');
  const { id } = useParams();
  const placeId = Number(id);

  const { placeInfos, placeInfoLoading, placeInfoError } =
    usePlaceInfo(placeId);

  const { addLike } = useAddLike(placeId);
  const { showAlert, alert } = useAlert();

  const openAlert = (modal: string) => {
    if (isLogin) {
      setShowModal(modal);
    } else {
      showAlert({
        type: 'success',
        title: '로그인을 먼저 진행해주세요.',
        message: '해당 페이지로 이동하시겠습니까?',
        onConfirm: () => navigate('/login'),
      });
    }
  };
  const handleLike = async () => {
    if (isLogin) {
      addLike();
    } else {
      showAlert({
        type: 'success',
        title: '로그인을 먼저 진행해주세요.',
        message: '해당 페이지로 이동하시겠습니까?',
        onConfirm: () => navigate('/login'),
      });
    }
  };

  if (placeInfoError) {
    return <Error />;
  }

  return (
    <section className="bg-lightgray dark:bg-slate-950 min-w-full min-h-screen lg:px-48 xl:px-48 px-10 py-3">
      {!placeInfoLoading && placeInfos ? (
        <>
          <div className="w-full h-[500px] fixed top-24 right-0 justify-center items-center lg:px-48 xl:px-48 px-10">
            <img
              className="w-full h-[500px] rounded-lg"
              src={placeInfos.placeImageUrl}
              alt={placeInfos.placeName}
            />
          </div>
          <div className="flex flex-col gap-5 mt-[500px] z-10">
            <div className="leading-10 bg-white rounded-lg shadow-xl p-8 dark:bg-slate-800 z-10">
              <h2 className="text-2xl font-bold dark:text-white">
                {placeInfos.placeName}
              </h2>
              <div className="flex gap-2 items-center">
                <Stars size={'h-6 w-6'} rating={placeInfos.star} />
                <span className="text-gray">{placeInfos.star} / 5</span>
              </div>
              <div className="flex gap-5 text-slate-700 font-semibold dark:text-slate-400">
                <button onClick={() => openAlert('schedule')}>일정 추가</button>
                <button
                  className="flex items-center transition duration-300"
                  onClick={handleLike}
                >
                  좋아요
                  {placeInfos.likeIt ? (
                    <AiFillHeart className="text-red ml-1" />
                  ) : (
                    <AiOutlineHeart className="text-red ml-1" />
                  )}
                </button>
                <button onClick={() => openAlert('review')}>리뷰 작성</button>
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
                    <strong className="dark:text-gray">📌 주소</strong>{' '}
                    {placeInfos.placeAddress}
                  </span>
                  <span className="px-2 dark:text-slate-400">
                    <strong className="dark:text-gray">📞 전화번호</strong>{' '}
                    {placeInfos.placeCallNumber}
                  </span>
                </div>
                <div className="flex flex-col gap-2 text-slate-700">
                  <h2 className="text-xl font-bold dark:text-white">
                    상세 정보
                  </h2>
                  <span className="flex leading-6 px-2 dark:text-slate-400">
                    {placeInfos.placeDescription}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col justify-center dark:bg-slate-800 z-10">
              <div className="flex gap-2 items-center">
                <h2 className="text-2xl font-bold dark:text-white">리뷰</h2>
                <h2 className="text-2xl font-bold text-skyblue">
                  {placeInfos.reviewNum}
                </h2>
              </div>
              <div className="flex flex-col justify-center items-center gap-3">
                <ReviewList placeId={placeId} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-xl p-8 mb-2 dark:bg-slate-800 absoulte z-10">
              <h2 className="text-2xl font-bold dark:text-white mb-4">
                주변 플레이스
              </h2>
              <NearPlaces placeId={placeId} />
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-full flex justify-center items-center">
          <Loader size={'30px'} />
        </div>
      )}
      {showModal === 'schedule' && (
        <ScheduleModal
          setShowModal={setShowModal}
          selectedPlace={placeId}
          placeLocation={placeInfos.placeLocation}
        />
      )}
      {showModal === 'review' && (
        <ReviewModal setShowModal={setShowModal} placeId={placeId} />
      )}
      {alert && <Alerts {...alert} />}
    </section>
  );
}

export default Detail;
