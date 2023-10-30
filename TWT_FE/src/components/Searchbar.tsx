import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const locationData = [
  {
    sur: '경기',
    sub: '가평, 양평, 이천',
    imgSrc: 'https://hairiver.com/img/package_1/2.jpg',
  },
  {
    sur: '강원',
    sub: '강릉, 속초, 양양, 춘천, 홍천',
    imgSrc:
      'https://youimg1.tripcdn.com/target/100f1f000001gq90a8E91_C_640_320_R5_Q70.jpg_.webp?proc=source%2Ftrip',
  },
  {
    sur: '인천',
    sub: '인천',
    imgSrc:
      ' https://a.cdn-hotels.com/gdcs/production82/d1228/f0ccf391-8021-4edd-a459-9b2fe2a5daa4.jpg?impolicy=fcrop&w=800&h=533&q=medium',
  },
  {
    sur: '전북',
    sub: '전주, 군산, 익산',
    imgSrc:
      'https://a.cdn-hotels.com/gdcs/production39/d1730/af444a07-b68c-4321-b036-d2cdc630f443.jpg',
  },
  {
    sur: '전남',
    sub: '여수, 순천, 광양',
    imgSrc:
      'https://a.cdn-hotels.com/gdcs/production97/d1097/5fbc5470-0ff4-4420-aeec-2440f4091332.jpg',
  },
  {
    sur: '충남',
    sub: '서산, 태안',
    imgSrc:
      'https://www.goodmorningcc.com/news/photo/201909/218698_222806_936.jpg',
  },
  {
    sur: '경북',
    sub: '경주, 포항, 안동, 울릉도',
    imgSrc:
      'https://a.cdn-hotels.com/gdcs/production102/d1023/e3c18663-14e2-49e3-b9f0-bd7a029a661f.jpg',
  },
  {
    sur: '경남',
    sub: '통영, 거제',
    imgSrc:
      'https://a.cdn-hotels.com/gdcs/production134/d700/9a15d74b-a791-4d55-9033-0e97ff092129.jpg',
  },
  {
    sur: '대구',
    sub: '대구',
    imgSrc:
      'https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/wlQ/image/ByyTDRkOZP-xad433uAQsGFfIwQ.jpg',
  },
  {
    sur: '부산',
    sub: '부산',
    imgSrc:
      'https://res.klook.com/image/upload/Mobile/City/g9ynzkjz1nsrvhrjml4j.jpg',
  },
  {
    sur: '제주',
    sub: '제주, 서귀포',
    imgSrc:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTNfNDAg/MDAxNTg5MzUxNDk1OTA0.oLjj36bGkbxgzGLy0-sjbL4V6Ele7RjhocH4pF3Z49Eg.3VmBv39ouQprdPUtBQcBu_S3rsLD91tbecaBgtjghtUg.JPEG.happyjejudo/%EB%8F%8C%ED%95%98%EB%A5%B4%EB%B0%A9_%EC%A0%9C%EC%A3%BC%EC%8B%9C.jpg?type=w800',
  },
];

function Searchbar() {
  const [isClick, setIsClick] = useState(false);

  return (
    <div className="max-w-md mx-auto relative ">
      <div className="flex items-center w-full h-12 rounded-2xl shadow-lg focus:shadow-none bg-lightgray overflow-hidden dark:bg-slate-800">
        <div className="grid place-items-center h-full w-12 text-gray-300 dark:bg-slate-800 dark:text-white">
          <AiOutlineSearch />
        </div>
        <input
          className="peer h-full w-full outline-none bg-lightgray text-sm text-gray-700 pr-2 dark:bg-slate-800"
          type="text"
          id="search"
          placeholder="어디로 가시나요?"
          onClick={() => setIsClick(!isClick)}
          readOnly
        />
      </div>
      {isClick && (
        <div
          className="bg-white w-full rounded-xl shadow-xl overflow-hidden p-1 absolute top-12 z-10 dark:bg-slate-800"
          onBlur={() => setIsClick(false)}
        >
          {locationData.map((item, index) => (
            <div
              key={index}
              className="w-full flex p-3 pl-4 items-center hover:bg-lightgray rounded-lg cursor-pointer dark:hover:bg-slate-700 dark:text-white"
            >
              <div className="mr-4">
                <div className="h-10 w-10 flex items-center justify-center text-3xl">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={item.imgSrc}
                    alt=""
                  />
                </div>
              </div>
              <div>
                <div className="font-semibold text-lg">
                  <a href={`/search/${item.sur}`}>{item.sur}</a>
                </div>

                <div className="text-xs text-gray">
                  <span className="mr-2">{item.sub}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
