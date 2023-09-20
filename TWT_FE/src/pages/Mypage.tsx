import { useEffect, useState } from 'react';
import { TfiWrite } from 'react-icons/tfi';
import { AiTwotoneCalendar } from 'react-icons/ai';

import SouthKoreaMap from '../components/SouthKoreaMap';

import { useUserDatas } from '../hooks/useProducts';
import { useUserContext } from '../context';
import ReviewList from '../components/ReviewList';
import ScheduleList from '../components/ScheduleList';
import ListItem from '../components/ListItem';

function Mypage() {
  const { isLogin, user } = useUserContext();
  const [isListOpen, setIsListOpen] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('schedule');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { userDatas, userDataLoading, userDataError, userDataRefetch } =
    useUserDatas(category, currentPage - 1, isListOpen);

  useEffect(() => {
    if (isListOpen !== null) {
      userDataRefetch();
    }
  }, [isListOpen]);

  useEffect(() => {
    userDataRefetch();
  }, [category, currentPage]);
  return (
    <>
      <section className="bg-lightgray dark:bg-gray-900 min-w-full min-h-screen flex justify-center flex-col lg:px-48 tablet:px-10 py-6">
        <div className="bg-white rounded-lg shadow-xl pb-8 mb-2">
          <div className="w-full h-[150px] bg-lightgray"></div>
          <div className="flex flex-col items-center -mt-20">
            <img
              src="https://mblogthumb-phinf.pstatic.net/20150427_73/ninevincent_1430122793329pvryW_JPEG/kakao_7.jpg?type=w420"
              className="w-[120px] h-[120px] border-4 border-white rounded-full"
            />
            <p className="text-2xl mt-2">{user?.nickName}</p>
            <p className="mt-2 text-gray mb-5">
              <a href="/profile">프로필 수정</a>
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-end px-8 mt-2">
            <div className="flex items-center space-x-4 mt-2">
              <button
                onClick={() => setCategory('schedule')}
                className={`flex items-center bg-skyblue/80 hover:bg-skyblue text-white hover:text-black px-4 py-2 rounded-xl text-sm space-x-2 transition duration-100 ${
                  category === 'schedule' && 'bg-skyblue text-black'
                }`}
              >
                <span className="flex items-center gap-2">
                  <AiTwotoneCalendar />
                  일정
                </span>
              </button>
              <button
                onClick={() => setCategory('review')}
                className={`flex items-center bg-skyblue/80 hover:bg-skyblue text-white hover:text-black px-4 py-2 rounded-xl text-sm space-x-2 transition duration-100 ${
                  category === 'review' && 'bg-skyblue text-black'
                }`}
              >
                <span className="flex items-center gap-2">
                  <TfiWrite /> 리뷰
                </span>
              </button>
              <button
                onClick={() => setCategory('heart')}
                className={`flex items-center bg-skyblue/80 hover:bg-skyblue text-white hover:text-black px-4 py-2 rounded-xl text-sm space-x-2 transition duration-100 ${
                  category === 'heart' && 'bg-skyblue text-black'
                }`}
              >
                <span>♡ 좋아요</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-xl pb-8">
          <div className="flex justify-center lg:p-10 tablet:p-4">
            {category === 'schedule' && (
              <>
                <SouthKoreaMap
                  isListOpen={isListOpen}
                  setIsListOpen={setIsListOpen}
                />
                {isListOpen && !userDataLoading && (
                  <div>
                    <ScheduleList
                      userDatas={userDatas}
                      isListOpen={isListOpen}
                    />
                  </div>
                )}
              </>
            )}
            {category === 'review' && <ReviewList data={userDatas.content} />}
            {category === 'heart' && (
              <div className="grid grid-cols-1 gap-8 mt-8 tablet:mt-16 tablet:grid-cols-2">
                <ListItem data={userDatas.content} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Mypage;
