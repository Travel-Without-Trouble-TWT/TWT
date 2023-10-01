import { useEffect } from 'react';

import Glide from '@glidejs/glide';

function Carousel() {
  const images = [
    {
      id: 70,
      theme: '평화역사 이야기여행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/eac96851-a969-41bc-998f-c3593302cfce.jpeg',
    },
    {
      id: 71,
      theme: '드라마틱 강원여행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/8f0dddd2-3119-42e1-8e1a-4eedd7f38253.jpeg',
    },
    {
      id: 73,
      theme: '선비이야기 여행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/16e33b5f-89d8-45aa-8871-027fb39f14f6.jpeg',
    },
    {
      id: 74,
      theme: '남쪽빛 감성여행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/d387c8d7-83cd-492b-b162-5b3f44481779.jpeg',
    },
    {
      id: 75,
      theme: '해돋이 역사기행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/81dd12ad-e861-46ae-a043-6c28bece28e0.jpeg',
    },
    {
      id: 76,
      theme: '남도바닷길 여행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/c105952f-7251-4113-acac-a133ee2a79bc.jpeg',
    },
    {
      id: 77,
      theme: '시간여행 101',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/8d3c1ef4-f755-40cc-b094-227c5907a4b2.jpeg',
    },
    {
      id: 78,
      theme: '남도맛기행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/c02c6be1-83b7-4e88-96f5-4598e21e31dd.jpeg',
    },
    {
      id: 79,
      theme: '위대한 금강역사여행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/6c33b482-2298-45e0-8ac3-87bb08204635.jpeg',
    },
    {
      id: 80,
      theme: '중부내륙 힐링여행',
      img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/b498501b-3107-4712-b9cf-d85af29dc878.jpeg',
    },
  ];

  useEffect(() => {
    const slider = new Glide('.glide-02', {
      type: 'carousel',
      focusAt: 'center',
      perView: 1,
      autoplay: 3000,
      animationDuration: 1000,
      gap: 24,
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  return (
    <>
      <div className="glide-02 relative w-full">
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] touch-pan-y will-change-transform relative flex w-full overflow-hidden p-0">
            {images.map((img, idx) => (
              <li key={idx} className="relative h-[430px] w-full lg:h-[600px]">
                <img
                  src={img.img}
                  alt={img.theme}
                  className="m-auto h-full w-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-center rounded-xl opacity-0 hover:opacity-100 hover:cursor-pointer transition-opacity">
                  <a href={`/schedule/${img.id}`}>
                    <p className="text-2xl font-bold">{img.theme}</p>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Carousel;
