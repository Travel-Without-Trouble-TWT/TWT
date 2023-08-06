import { TfiWrite } from 'react-icons/tfi';
import { AiTwotoneCalendar } from 'react-icons/ai';

import SouthKoreaMap from '../components/SouthKoreaMap';

function Mypage() {
  return (
    <>
      <section className="bg-lightgray dark:bg-gray-900 h-full flex justify-center flex-col lg:px-20 px-10 py-6">
        <div className="bg-white rounded-lg shadow-xl pb-8 mb-2">
          <div className="w-full h-[150px] bg-lightgray"></div>
          <div className="flex flex-col items-center -mt-20">
            <img
              src="https://png.pngtree.com/png-vector/20191115/ourmid/pngtree-beautiful-profile-line-vector-icon-png-image_1990469.jpg"
              className="w-[120px] h-[120px] border-4 border-white rounded-full"
            />
            <p className="text-2xl mt-2">닉네임</p>
            <p className="mt-2 text-gray mb-5">
              <a href="/profile">프로필 수정</a>
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-end px-8 mt-2">
            <div className="flex items-center space-x-4 mt-2">
              <button className="flex items-center bg-blue hover:opacity-90 text-white hover:text-black px-4 py-2 rounded-xl text-sm space-x-2 transition duration-100">
                <span className="flex items-center gap-2">
                  <AiTwotoneCalendar />
                  일정
                </span>
              </button>
              <button className="flex items-center bg-blue hover:opacity-90 text-white hover:text-black px-4 py-2 rounded-xl text-sm space-x-2 transition duration-100">
                <span className="flex items-center gap-2">
                  <TfiWrite /> 리뷰
                </span>
              </button>
              <button className="flex items-center bg-blue hover:opacity-90 text-white hover:text-black px-4 py-2 rounded-xl text-sm space-x-2 transition duration-100">
                <span>♡ 좋아요</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-xl pb-8">
          <div className="flex justify-center p-10">
            <SouthKoreaMap />
          </div>
        </div>
      </section>
    </>
  );
}

export default Mypage;
