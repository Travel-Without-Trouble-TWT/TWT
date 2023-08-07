import { useEffect, useState } from 'react';

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      theme: '평화역사 이야기여행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/eac96851-a969-41bc-998f-c3593302cfce.jpeg',
    },
    {
      theme: '드라마틱 강원여행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/8f0dddd2-3119-42e1-8e1a-4eedd7f38253.jpeg',
    },
    {
      theme: '선비이야기 여행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/16e33b5f-89d8-45aa-8871-027fb39f14f6.jpeg',
    },
    {
      theme: '남쪽빛 감성여행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/d387c8d7-83cd-492b-b162-5b3f44481779.jpeg',
    },
    {
      theme: '해돋이 역사기행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/81dd12ad-e861-46ae-a043-6c28bece28e0.jpeg',
    },
    {
      theme: '남도바닷길 여행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/c105952f-7251-4113-acac-a133ee2a79bc.jpeg',
    },
    {
      theme: '시간여행 101',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/8d3c1ef4-f755-40cc-b094-227c5907a4b2.jpeg',
    },
    {
      theme: '남도맛기행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/c02c6be1-83b7-4e88-96f5-4598e21e31dd.jpeg',
    },
    {
      theme: '위대한 금강역사여행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/6c33b482-2298-45e0-8ac3-87bb08204635.jpeg',
    },
    {
      theme: '중부내륙 힐링여행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/b498501b-3107-4712-b9cf-d85af29dc878.jpeg',
    },
  ];

  useEffect(() => {
    //resetTimeout();
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      id="default-carousel"
      className="relative w-full items-center mt-2"
      data-carousel="slide"
    >
      <img
        className="w-full h-[350px] rounded-xl"
        src={images[currentIndex]['img']}
        alt="Carousel"
      />
    </div>
  );
}

export default Carousel;
