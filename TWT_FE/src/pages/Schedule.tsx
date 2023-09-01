import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TimeModal from '../components/TimeModal';
import Feeds from '../components/Feeds';

import { FaShareSquare } from 'react-icons/fa';

function Schedule() {
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  return (
    <>
      <Header />
      <section className="bg-lightgray dark:bg-gray-900 h-full flex justify-center flex-col lg:px-40 mobile:px-10 py-6">
        <div className="bg-white rounded-lg shadow-xl pb-8">
          <div className="relative w-full h-[300px] bg-darkgray rounded-tl-lg rounded-tr-lg">
            <img
              src="https://www.kgnews.co.kr/data/photos/20200729/art_15947805688786_248bf0.jpg"
              className="w-full h-full rounded-tl-lg rounded-tr-lg opacity-50 blur-sm"
            />
          </div>
          <div className="absolute gap-2 flex flex-col -mt-60 justify-center ml-10">
            <span className="font-bold text-2xl text-white">강원도 여행</span>
            <div className="flex gap-2">
              <span className="text-white underline">2023.07.16 - 07.19</span>
              {/* 토큰 확인 */}
              <button className="text-gray text-sm">편집</button>
            </div>
            <span className="font-bold text-2xl text-white">D - 00</span>
          </div>
          <div className="absoulte flex flex-col items-center">
            <button className="flex self-end mr-3 text-white -mt-6 z-20 text-xl">
              <FaShareSquare />
            </button>
            <button className="flex self-end mr-4 mt-2 text-gray text-sm z-20">
              일정 삭제
            </button>
            <img
              src="https://www.kgnews.co.kr/data/photos/20200729/art_15947805688786_248bf0.jpg"
              className="w-[350px] h-[350px] border-4 border-white rounded-full -mt-40 z-20"
            />
          </div>

          <div className="px-6 m-auto mt-10">
            <div className="grid grid-cols-4 gap-3 tablet:grid-cols-8 lg:grid-cols-12">
              <div className="flex flex-col items-center justify-center col-span-1 lg:col-span-1">
                <p className="text-xl font-semibold">Day1</p>
                <p className="text-xs text-gray">7.16(일)</p>
              </div>
              <div className="col-span-7 lg:col-span-11 shadow-md shadow-gray rounded-md px-5 py-5">
                <Feeds setIsShowModal={setIsShowModal} />
                <div className="flex justify-center mb-1">
                  <button
                    className="text-sm"
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                  >
                    {isMoreOpen ? '닫기' : '더보기'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isShowModal && <TimeModal setIsShowModal={setIsShowModal} />}
      <Footer />
    </>
  );
}

export default Schedule;
